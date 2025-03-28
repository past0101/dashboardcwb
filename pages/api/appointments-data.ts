import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { AppointmentsData } from '@/lib/types';
import { initialData } from '@/utils/mockData';

type ResponseData = {
  success: boolean;
  message: string;
  data?: AppointmentsData[];
};

// Define the data directory and file
const DATA_DIR = path.join(process.cwd(), 'data');
const APPOINTMENTS_DATA_FILE = path.join(DATA_DIR, 'appointmentsData.json');

// Load appointments data from file
const loadAppointmentsData = (): AppointmentsData[] => {
  try {
    // If the file doesn't exist, return default data
    if (!fs.existsSync(APPOINTMENTS_DATA_FILE)) {
      // Ensure directory exists
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      // Create the file with default data
      fs.writeFileSync(APPOINTMENTS_DATA_FILE, JSON.stringify(initialData.appointmentsData, null, 2), 'utf8');
      return initialData.appointmentsData;
    }
    
    // Read and parse the file
    const fileContent = fs.readFileSync(APPOINTMENTS_DATA_FILE, 'utf8');
    return JSON.parse(fileContent) as AppointmentsData[];
  } catch (error) {
    console.error(`Error loading appointments data:`, error);
    return initialData.appointmentsData;
  }
};

// Save appointments data to file
const saveAppointmentsData = (data: AppointmentsData[]): boolean => {
  try {
    // Ensure directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    fs.writeFileSync(APPOINTMENTS_DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error saving appointments data:`, error);
    return false;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // GET method - retrieve appointments data
  if (req.method === 'GET') {
    try {
      const appointmentsData = loadAppointmentsData();
      return res.status(200).json({
        success: true,
        message: 'Τα δεδομένα ραντεβού ανακτήθηκαν με επιτυχία',
        data: appointmentsData
      });
    } catch (error: any) {
      console.error('Error loading appointments data:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την ανάκτηση των δεδομένων ραντεβού: ${error.message || 'Άγνωστο σφάλμα'}`
      });
    }
  }
  
  // POST method - save appointments data
  else if (req.method === 'POST') {
    try {
      const { data } = req.body;
      
      if (!data || !Array.isArray(data)) {
        return res.status(400).json({
          success: false,
          message: 'Μη έγκυρα δεδομένα ραντεβού'
        });
      }
      
      const saveResult = saveAppointmentsData(data);
      
      if (!saveResult) {
        return res.status(500).json({
          success: false,
          message: 'Σφάλμα κατά την αποθήκευση των δεδομένων ραντεβού'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Τα δεδομένα ραντεβού αποθηκεύτηκαν με επιτυχία'
      });
    } catch (error: any) {
      console.error('Error saving appointments data:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την αποθήκευση των δεδομένων ραντεβού: ${error.message || 'Άγνωστο σφάλμα'}`
      });
    }
  }
  
  // Unsupported method
  else {
    return res.status(405).json({
      success: false,
      message: 'Η μέθοδος δεν υποστηρίζεται'
    });
  }
}