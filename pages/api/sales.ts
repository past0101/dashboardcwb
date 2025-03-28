import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Sale } from '@/lib/types';
import { initialData } from '@/utils/mockData';

type ResponseData = {
  success: boolean;
  message: string;
  data?: Sale[];
};

// Define the data directory and file
const DATA_DIR = path.join(process.cwd(), 'data');
const SALES_FILE = path.join(DATA_DIR, 'sales.json');

// Load sales data from file
const loadSalesData = (): Sale[] => {
  try {
    // If the file doesn't exist, return default data
    if (!fs.existsSync(SALES_FILE)) {
      // Ensure directory exists
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      // Create the file with default data
      fs.writeFileSync(SALES_FILE, JSON.stringify(initialData.sales, null, 2), 'utf8');
      return initialData.sales;
    }
    
    // Read and parse the file
    const fileContent = fs.readFileSync(SALES_FILE, 'utf8');
    return JSON.parse(fileContent) as Sale[];
  } catch (error) {
    console.error(`Error loading sales data:`, error);
    return initialData.sales;
  }
};

// Save sales data to file
const saveSalesData = (data: Sale[]): boolean => {
  try {
    // Ensure directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    fs.writeFileSync(SALES_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error saving sales data:`, error);
    return false;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // GET method - retrieve sales
  if (req.method === 'GET') {
    try {
      const sales = loadSalesData();
      return res.status(200).json({
        success: true,
        message: 'Οι πωλήσεις ανακτήθηκαν με επιτυχία',
        data: sales
      });
    } catch (error: any) {
      console.error('Error loading sales:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την ανάκτηση των πωλήσεων: ${error.message || 'Άγνωστο σφάλμα'}`
      });
    }
  }
  
  // POST method - save sales
  else if (req.method === 'POST') {
    try {
      const { data } = req.body;
      
      if (!data || !Array.isArray(data)) {
        return res.status(400).json({
          success: false,
          message: 'Μη έγκυρα δεδομένα πωλήσεων'
        });
      }
      
      const saveResult = saveSalesData(data);
      
      if (!saveResult) {
        return res.status(500).json({
          success: false,
          message: 'Σφάλμα κατά την αποθήκευση των πωλήσεων'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Οι πωλήσεις αποθηκεύτηκαν με επιτυχία'
      });
    } catch (error: any) {
      console.error('Error saving sales:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την αποθήκευση των πωλήσεων: ${error.message || 'Άγνωστο σφάλμα'}`
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