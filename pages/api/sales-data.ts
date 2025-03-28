import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { SalesData } from '@/lib/types';
import { initialData } from '@/utils/mockData';

type ResponseData = {
  success: boolean;
  message: string;
  data?: SalesData[];
};

// Define the data directory and file
const DATA_DIR = path.join(process.cwd(), 'data');
const SALES_DATA_FILE = path.join(DATA_DIR, 'salesData.json');

// Load sales data from file
const loadSalesData = (): SalesData[] => {
  try {
    // If the file doesn't exist, return default data
    if (!fs.existsSync(SALES_DATA_FILE)) {
      // Ensure directory exists
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      // Create the file with default data
      fs.writeFileSync(SALES_DATA_FILE, JSON.stringify(initialData.salesData, null, 2), 'utf8');
      return initialData.salesData;
    }
    
    // Read and parse the file
    const fileContent = fs.readFileSync(SALES_DATA_FILE, 'utf8');
    return JSON.parse(fileContent) as SalesData[];
  } catch (error) {
    console.error(`Error loading sales data:`, error);
    return initialData.salesData;
  }
};

// Save sales data to file
const saveSalesData = (data: SalesData[]): boolean => {
  try {
    // Ensure directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    fs.writeFileSync(SALES_DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
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
  // GET method - retrieve sales data
  if (req.method === 'GET') {
    try {
      const salesData = loadSalesData();
      return res.status(200).json({
        success: true,
        message: 'Τα δεδομένα πωλήσεων ανακτήθηκαν με επιτυχία',
        data: salesData
      });
    } catch (error: any) {
      console.error('Error loading sales data:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την ανάκτηση των δεδομένων πωλήσεων: ${error.message || 'Άγνωστο σφάλμα'}`
      });
    }
  }
  
  // POST method - save sales data
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
          message: 'Σφάλμα κατά την αποθήκευση των δεδομένων πωλήσεων'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Τα δεδομένα πωλήσεων αποθηκεύτηκαν με επιτυχία'
      });
    } catch (error: any) {
      console.error('Error saving sales data:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την αποθήκευση των δεδομένων πωλήσεων: ${error.message || 'Άγνωστο σφάλμα'}`
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