import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { TwilioConfig } from '@/utils/notification';

type ResponseData = {
  success: boolean;
  message: string;
};

// Define the config directory and file
const DATA_DIR = path.join(process.cwd(), 'data');
const TWILIO_CONFIG_FILE = path.join(DATA_DIR, 'twilio-config.json');

// Server-side function to save the config to a file
const saveConfigToFile = (config: TwilioConfig): boolean => {
  try {
    // Ensure directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    fs.writeFileSync(TWILIO_CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving Twilio config:', error);
    return false;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Μόνο POST αιτήματα επιτρέπονται' });
  }

  try {
    const { config } = req.body;

    // Validate the config
    if (!config || !config.accountSid || !config.authToken || !config.phoneNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'Οι ρυθμίσεις Twilio είναι ελλιπείς' 
      });
    }

    // Save the config
    const saveResult = saveConfigToFile(config as TwilioConfig);
    
    if (!saveResult) {
      return res.status(500).json({ 
        success: false, 
        message: 'Σφάλμα κατά την αποθήκευση των ρυθμίσεων Twilio' 
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Οι ρυθμίσεις Twilio αποθηκεύτηκαν με επιτυχία'
    });
  } catch (error: any) {
    console.error('Error saving Twilio config:', error);
    return res.status(500).json({
      success: false,
      message: `Σφάλμα κατά την αποθήκευση των ρυθμίσεων Twilio: ${error.message || 'Άγνωστο σφάλμα'}`
    });
  }
}