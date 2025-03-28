import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type ResponseData = {
  success: boolean;
  message: string;
};

// Define the config directory and file
const DATA_DIR = path.join(process.cwd(), 'data');
const TWILIO_CONFIG_FILE = path.join(DATA_DIR, 'twilio-config.json');

// Server-side function to delete the config file
const deleteConfigFile = (): boolean => {
  try {
    if (fs.existsSync(TWILIO_CONFIG_FILE)) {
      fs.unlinkSync(TWILIO_CONFIG_FILE);
    }
    return true;
  } catch (error) {
    console.error('Error deleting Twilio config:', error);
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
    // Delete the Twilio config
    const deleteResult = deleteConfigFile();
    
    if (!deleteResult) {
      return res.status(500).json({ 
        success: false, 
        message: 'Σφάλμα κατά τη διαγραφή των ρυθμίσεων Twilio' 
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Οι ρυθμίσεις Twilio διαγράφηκαν με επιτυχία'
    });
  } catch (error: any) {
    console.error('Error clearing Twilio config:', error);
    return res.status(500).json({
      success: false,
      message: `Σφάλμα κατά τη διαγραφή των ρυθμίσεων Twilio: ${error.message || 'Άγνωστο σφάλμα'}`
    });
  }
}