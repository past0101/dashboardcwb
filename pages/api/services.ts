import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Service } from '@/lib/types';
import { initialData } from '@/utils/mockData';

type ResponseData = {
  success: boolean;
  message: string;
  data?: Service[];
};

// Define the data directory and file
const DATA_DIR = path.join(process.cwd(), 'data');
const SERVICES_FILE = path.join(DATA_DIR, 'services.json');

// Load services data from file
const loadServicesData = (): Service[] => {
  try {
    // If the file doesn't exist, return default data
    if (!fs.existsSync(SERVICES_FILE)) {
      // Ensure directory exists
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      // Create the file with default data
      fs.writeFileSync(SERVICES_FILE, JSON.stringify(initialData.services, null, 2), 'utf8');
      return initialData.services;
    }
    
    // Read and parse the file
    const fileContent = fs.readFileSync(SERVICES_FILE, 'utf8');
    return JSON.parse(fileContent) as Service[];
  } catch (error) {
    console.error(`Error loading services data:`, error);
    return initialData.services;
  }
};

// Save services data to file
const saveServicesData = (data: Service[]): boolean => {
  try {
    // Ensure directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error saving services data:`, error);
    return false;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // GET method - retrieve services
  if (req.method === 'GET') {
    try {
      const services = loadServicesData();
      return res.status(200).json({
        success: true,
        message: 'Οι υπηρεσίες ανακτήθηκαν με επιτυχία',
        data: services
      });
    } catch (error: any) {
      console.error('Error loading services:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την ανάκτηση των υπηρεσιών: ${error.message || 'Άγνωστο σφάλμα'}`
      });
    }
  }
  
  // POST method - save services
  else if (req.method === 'POST') {
    try {
      const { data } = req.body;
      
      if (!data || !Array.isArray(data)) {
        return res.status(400).json({
          success: false,
          message: 'Μη έγκυρα δεδομένα υπηρεσιών'
        });
      }
      
      const saveResult = saveServicesData(data);
      
      if (!saveResult) {
        return res.status(500).json({
          success: false,
          message: 'Σφάλμα κατά την αποθήκευση των υπηρεσιών'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Οι υπηρεσίες αποθηκεύτηκαν με επιτυχία'
      });
    } catch (error: any) {
      console.error('Error saving services:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την αποθήκευση των υπηρεσιών: ${error.message || 'Άγνωστο σφάλμα'}`
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