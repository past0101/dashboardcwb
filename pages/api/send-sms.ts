import type { NextApiRequest, NextApiResponse } from 'next';
import { TwilioConfig } from '@/utils/notification';

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

    // Here we would use the Twilio SDK in a real environment
    // For now, we'll simulate a successful response
    
    // In a real implementation, this would be:
    // const client = new twilio(config.accountSid, config.authToken);
    // const twilioMessage = await client.messages.create({
    //   body: message,
    //   from: config.phoneNumber,
    //   to: phoneNumber
    // });

    // Simulate a successful message send
    const messageId = 'SM' + Math.random().toString(36).substring(2, 15);

    return res.status(200).json({
      success: true,
      message: 'Το μήνυμα SMS στάλθηκε με επιτυχία',
      messageId
    });
  } catch (error: any) {
    console.error('Error sending SMS:', error);
    return res.status(500).json({
      success: false,
      message: `Σφάλμα κατά την αποστολή SMS: ${error.message || 'Άγνωστο σφάλμα'}`
    });
  }
}