import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Staff } from '@/lib/types';
import { initialData } from '@/utils/mockData';

type ResponseData = {
  success: boolean;
  message: string;
  data?: Staff[];
};

// Define the data directory and file
const DATA_DIR = path.join(process.cwd(), 'data');
const STAFF_FILE = path.join(DATA_DIR, 'staff.json');

// Load staff data from file
const loadStaffData = (): Staff[] => {
  try {
    // If the file doesn't exist, return default data
    if (!fs.existsSync(STAFF_FILE)) {
      // Ensure directory exists
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      // Create the file with default data
      fs.writeFileSync(STAFF_FILE, JSON.stringify(initialData.staff, null, 2), 'utf8');
      return initialData.staff;
    }
    
    // Read and parse the file
    const fileContent = fs.readFileSync(STAFF_FILE, 'utf8');
    return JSON.parse(fileContent) as Staff[];
  } catch (error) {
    console.error(`Error loading staff data:`, error);
    return initialData.staff;
  }
};

// Save staff data to file
const saveStaffData = (data: Staff[]): boolean => {
  try {
    // Ensure directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    fs.writeFileSync(STAFF_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error saving staff data:`, error);
    return false;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // GET method - retrieve staff
  if (req.method === 'GET') {
    try {
      const staff = loadStaffData();
      return res.status(200).json({
        success: true,
        message: 'Το προσωπικό ανακτήθηκε με επιτυχία',
        data: staff
      });
    } catch (error: any) {
      console.error('Error loading staff:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την ανάκτηση του προσωπικού: ${error.message || 'Άγνωστο σφάλμα'}`
      });
    }
  }
  
  // POST method - save staff
  else if (req.method === 'POST') {
    try {
      const { data } = req.body;
      
      if (!data || !Array.isArray(data)) {
        return res.status(400).json({
          success: false,
          message: 'Μη έγκυρα δεδομένα προσωπικού'
        });
      }
      
      const saveResult = saveStaffData(data);
      
      if (!saveResult) {
        return res.status(500).json({
          success: false,
          message: 'Σφάλμα κατά την αποθήκευση του προσωπικού'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Το προσωπικό αποθηκεύτηκε με επιτυχία'
      });
    } catch (error: any) {
      console.error('Error saving staff:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την αποθήκευση του προσωπικού: ${error.message || 'Άγνωστο σφάλμα'}`
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