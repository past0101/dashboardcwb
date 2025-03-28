import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { initialData } from '@/utils/mockData';

type ResponseData = {
  success: boolean;
  message: string;
};

// Define the data directory
const DATA_DIR = path.join(process.cwd(), 'data');

// Define file paths for each data type
const DATA_FILES = {
  customers: path.join(DATA_DIR, 'customers.json'),
  staff: path.join(DATA_DIR, 'staff.json'),
  services: path.join(DATA_DIR, 'services.json'),
  products: path.join(DATA_DIR, 'products.json'),
  appointments: path.join(DATA_DIR, 'appointments.json'),
  sales: path.join(DATA_DIR, 'sales.json'),
  salesData: path.join(DATA_DIR, 'salesData.json'),
  appointmentsData: path.join(DATA_DIR, 'appointmentsData.json'),
};

// Generic function to save data to a file
const saveDataToFile = <T>(fileName: string, data: T[]): boolean => {
  try {
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error saving data to ${fileName}:`, error);
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
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Initialize all data files with default data if they don't exist
    if (!fs.existsSync(DATA_FILES.customers)) {
      saveDataToFile(DATA_FILES.customers, initialData.customers);
    }
    
    if (!fs.existsSync(DATA_FILES.staff)) {
      saveDataToFile(DATA_FILES.staff, initialData.staff);
    }
    
    if (!fs.existsSync(DATA_FILES.services)) {
      saveDataToFile(DATA_FILES.services, initialData.services);
    }
    
    if (!fs.existsSync(DATA_FILES.products)) {
      saveDataToFile(DATA_FILES.products, initialData.products);
    }
    
    if (!fs.existsSync(DATA_FILES.appointments)) {
      saveDataToFile(DATA_FILES.appointments, initialData.appointments);
    }
    
    if (!fs.existsSync(DATA_FILES.sales)) {
      saveDataToFile(DATA_FILES.sales, initialData.sales);
    }
    
    if (!fs.existsSync(DATA_FILES.salesData)) {
      saveDataToFile(DATA_FILES.salesData, initialData.salesData);
    }
    
    if (!fs.existsSync(DATA_FILES.appointmentsData)) {
      saveDataToFile(DATA_FILES.appointmentsData, initialData.appointmentsData);
    }

    return res.status(200).json({
      success: true,
      message: 'Όλα τα δεδομένα αρχικοποιήθηκαν με επιτυχία'
    });
  } catch (error: any) {
    console.error('Error initializing data:', error);
    return res.status(500).json({
      success: false,
      message: `Σφάλμα κατά την αρχικοποίηση των δεδομένων: ${error.message || 'Άγνωστο σφάλμα'}`
    });
  }
}