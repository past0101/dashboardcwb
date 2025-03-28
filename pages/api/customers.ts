import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Customer } from '@/lib/types';
import { initialData } from '@/utils/mockData';

type ResponseData = {
  success: boolean;
  message: string;
  data?: Customer[];
};

// Define the data directory and file
const DATA_DIR = path.join(process.cwd(), 'data');
const CUSTOMERS_FILE = path.join(DATA_DIR, 'customers.json');

// Load customers data from file
const loadCustomersData = (): Customer[] => {
  try {
    // If the file doesn't exist, return default data
    if (!fs.existsSync(CUSTOMERS_FILE)) {
      // Ensure directory exists
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      // Create the file with default data
      fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(initialData.customers, null, 2), 'utf8');
      return initialData.customers;
    }
    
    // Read and parse the file
    const fileContent = fs.readFileSync(CUSTOMERS_FILE, 'utf8');
    return JSON.parse(fileContent) as Customer[];
  } catch (error) {
    console.error(`Error loading customers data:`, error);
    return initialData.customers;
  }
};

// Save customers data to file
const saveCustomersData = (data: Customer[]): boolean => {
  try {
    // Ensure directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error saving customers data:`, error);
    return false;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // GET method - retrieve customers
  if (req.method === 'GET') {
    try {
      const customers = loadCustomersData();
      return res.status(200).json({
        success: true,
        message: 'Οι πελάτες ανακτήθηκαν με επιτυχία',
        data: customers
      });
    } catch (error: any) {
      console.error('Error loading customers:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την ανάκτηση των πελατών: ${error.message || 'Άγνωστο σφάλμα'}`
      });
    }
  }
  
  // POST method - save customers
  else if (req.method === 'POST') {
    try {
      const { data } = req.body;
      
      if (!data || !Array.isArray(data)) {
        return res.status(400).json({
          success: false,
          message: 'Μη έγκυρα δεδομένα πελατών'
        });
      }
      
      const saveResult = saveCustomersData(data);
      
      if (!saveResult) {
        return res.status(500).json({
          success: false,
          message: 'Σφάλμα κατά την αποθήκευση των πελατών'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Οι πελάτες αποθηκεύτηκαν με επιτυχία'
      });
    } catch (error: any) {
      console.error('Error saving customers:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την αποθήκευση των πελατών: ${error.message || 'Άγνωστο σφάλμα'}`
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