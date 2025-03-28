import type { NextApiRequest, NextApiResponse } from 'next';
import { TwilioConfig } from '@/utils/notification';
import { exec } from 'child_process';
import path from 'path';

type ResponseData = {
  success: boolean;
  message: string;
  messageId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Μόνο POST αιτήματα επιτρέπονται' });
  }

  try {
    const { phoneNumber, message, config } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Απαιτούνται ο αριθμός τηλεφώνου και το μήνυμα' 
      });
    }

    // Validate Twilio config
    if (!config || !config.accountSid || !config.authToken || !config.phoneNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'Λείπει η ρύθμιση του Twilio. Παρακαλώ προσθέστε τα στοιχεία στις ρυθμίσεις.' 
      });
    }

    // Path to Python script
    const scriptPath = path.join(process.cwd(), 'utils', 'send_sms.py');

    // Prepare the command - we need to escape the message for the shell
    const escapedMessage = message.replace(/"/g, '\\"');
    const configJson = JSON.stringify(config);
    
    // Run the Python script as a child process
    return new Promise((resolve) => {
      exec(
        `python3 "${scriptPath}" "${phoneNumber}" "${escapedMessage}" '${configJson}'`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({
              success: false,
              message: `Σφάλμα κατά την εκτέλεση του Python script: ${error.message}`
            });
          }

          try {
            // Parse the output from the Python script
            const result = JSON.parse(stdout);
            
            if (result.success) {
              return res.status(200).json({
                success: true,
                message: 'Το μήνυμα SMS στάλθηκε με επιτυχία',
                messageId: result.sid
              });
            } else {
              return res.status(400).json({
                success: false,
                message: `Σφάλμα Twilio: ${result.error || 'Άγνωστο σφάλμα Twilio'}`
              });
            }
          } catch (parseError) {
            console.error('Error parsing Python output:', parseError);
            console.error('Raw output:', stdout);
            
            return res.status(500).json({
              success: false,
              message: `Σφάλμα κατά την ανάλυση της απόκρισης του Python script: ${parseError.message}`
            });
          }
        }
      );
    });
  } catch (error: any) {
    console.error('Error sending SMS:', error);
    return res.status(500).json({
      success: false,
      message: `Σφάλμα κατά την αποστολή SMS: ${error.message || 'Άγνωστο σφάλμα'}`
    });
  }
}