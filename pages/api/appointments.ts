import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Appointment } from '@/lib/types';
import { initialData } from '@/utils/mockData';

type ResponseData = {
  success: boolean;
  message: string;
  data?: Appointment[];
};

// Define the data directory and file
const DATA_DIR = path.join(process.cwd(), 'data');
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');

// Load appointments data from file
const loadAppointmentsData = (): Appointment[] => {
  try {
    // If the file doesn't exist, return default data
    if (!fs.existsSync(APPOINTMENTS_FILE)) {
      // Ensure directory exists
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      // Create the file with default data
      fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(initialData.appointments, null, 2), 'utf8');
      return initialData.appointments;
    }
    
    // Read and parse the file
    const fileContent = fs.readFileSync(APPOINTMENTS_FILE, 'utf8');
    return JSON.parse(fileContent) as Appointment[];
  } catch (error) {
    console.error(`Error loading appointments data:`, error);
    return initialData.appointments;
  }
};

// Save appointments data to file
const saveAppointmentsData = (data: Appointment[]): boolean => {
  try {
    // Ensure directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(data, null, 2), 'utf8');
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
  // GET method - retrieve appointments
  if (req.method === 'GET') {
    try {
      const appointments = loadAppointmentsData();
      return res.status(200).json({
        success: true,
        message: 'Τα ραντεβού ανακτήθηκαν με επιτυχία',
        data: appointments
      });
    } catch (error: any) {
      console.error('Error loading appointments:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την ανάκτηση των ραντεβού: ${error.message || 'Άγνωστο σφάλμα'}`
      });
    }
  }
  
  // POST method - save appointments
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
          message: 'Σφάλμα κατά την αποθήκευση των ραντεβού'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Τα ραντεβού αποθηκεύτηκαν με επιτυχία'
      });
    } catch (error: any) {
      console.error('Error saving appointments:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την αποθήκευση των ραντεβού: ${error.message || 'Άγνωστο σφάλμα'}`
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