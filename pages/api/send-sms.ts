import type { NextApiRequest, NextApiResponse } from 'next';
import { TwilioConfig } from '@/utils/notification';
import twilio from 'twilio';

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

    // Για τώρα, επιστρέφουμε εικονική επιτυχία χωρίς να στέλνουμε πραγματικά SMS
    // Αυτό θα αντικατασταθεί με την πραγματική λειτουργία αργότερα
    console.log('[MOCK] Αποστολή SMS στο:', phoneNumber);
    console.log('[MOCK] Μήνυμα:', message);
    console.log('[MOCK] Χρησιμοποιώντας ρυθμίσεις Twilio:', config.accountSid, config.phoneNumber);
    
    // Δημιουργία εικονικού ID μηνύματος
    const mockSid = 'SM' + Math.random().toString(36).substring(2, 15);
    
    return res.status(200).json({
      success: true,
      message: 'Το μήνυμα SMS στάλθηκε με επιτυχία (προσομοίωση)',
      messageId: mockSid
    });
    
    /* ΠΡΑΓΜΑΤΙΚΟΣ ΚΩΔΙΚΑΣ ΠΟΥ ΘΑ ΧΡΗΣΙΜΟΠΟΙΗΘΕΙ ΑΡΓΟΤΕΡΑ
    try {
      // Initialize the Twilio client with the provided credentials
      const client = twilio(config.accountSid, config.authToken);
      
      // Send the SMS message
      const twilioMessage = await client.messages.create({
        body: message,
        from: config.phoneNumber,
        to: phoneNumber
      });

      return res.status(200).json({
        success: true,
        message: 'Το μήνυμα SMS στάλθηκε με επιτυχία',
        messageId: twilioMessage.sid
      });
    } catch (twilioError: any) {
      console.error('Twilio error:', twilioError);
      return res.status(400).json({
        success: false,
        message: `Σφάλμα Twilio: ${twilioError.message || 'Άγνωστο σφάλμα Twilio'}`
      });
    }
    */
  } catch (error: any) {
    console.error('Error sending SMS:', error);
    return res.status(500).json({
      success: false,
      message: `Σφάλμα κατά την αποστολή SMS: ${error.message || 'Άγνωστο σφάλμα'}`
    });
  }
}