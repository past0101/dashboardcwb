import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { TwilioConfig } from '@/utils/notification';

type ResponseData = {
  success: boolean;
  message: string;
  config?: TwilioConfig;
};

// Define the config directory and file
const DATA_DIR = path.join(process.cwd(), 'data');
const TWILIO_CONFIG_FILE = path.join(DATA_DIR, 'twilio-config.json');

// The loadTwilioConfig function from server-side
const loadConfigFromFile = (): TwilioConfig | null => {
  try {
    if (fs.existsSync(TWILIO_CONFIG_FILE)) {
      const configData = fs.readFileSync(TWILIO_CONFIG_FILE, 'utf8');
      return JSON.parse(configData) as TwilioConfig;
    }
    return null;
  } catch (error) {
    console.error('Error loading Twilio config:', error);
    return null;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Μόνο GET αιτήματα επιτρέπονται' });
  }

  try {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    // Load the Twilio configuration from the file
    const config = loadConfigFromFile();
    
    if (!config) {
      return res.status(404).json({ 
        success: false, 
        message: 'Δεν βρέθηκαν ρυθμίσεις Twilio' 
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Οι ρυθμίσεις Twilio ανακτήθηκαν με επιτυχία',
      config
    });
  } catch (error: any) {
    console.error('Error loading Twilio config:', error);
    return res.status(500).json({
      success: false,
      message: `Σφάλμα κατά την ανάκτηση των ρυθμίσεων Twilio: ${error.message || 'Άγνωστο σφάλμα'}`
    });
  }
}