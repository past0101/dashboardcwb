import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Product } from '@/lib/types';
import { initialData } from '@/utils/mockData';

type ResponseData = {
  success: boolean;
  message: string;
  data?: Product[];
};

// Define the data directory and file
const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

// Load products data from file
const loadProductsData = (): Product[] => {
  try {
    // If the file doesn't exist, return default data
    if (!fs.existsSync(PRODUCTS_FILE)) {
      // Ensure directory exists
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      // Create the file with default data
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(initialData.products, null, 2), 'utf8');
      return initialData.products;
    }
    
    // Read and parse the file
    const fileContent = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(fileContent) as Product[];
  } catch (error) {
    console.error(`Error loading products data:`, error);
    return initialData.products;
  }
};

// Save products data to file
const saveProductsData = (data: Product[]): boolean => {
  try {
    // Ensure directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error saving products data:`, error);
    return false;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // GET method - retrieve products
  if (req.method === 'GET') {
    try {
      const products = loadProductsData();
      return res.status(200).json({
        success: true,
        message: 'Τα προϊόντα ανακτήθηκαν με επιτυχία',
        data: products
      });
    } catch (error: any) {
      console.error('Error loading products:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την ανάκτηση των προϊόντων: ${error.message || 'Άγνωστο σφάλμα'}`
      });
    }
  }
  
  // POST method - save products
  else if (req.method === 'POST') {
    try {
      const { data } = req.body;
      
      if (!data || !Array.isArray(data)) {
        return res.status(400).json({
          success: false,
          message: 'Μη έγκυρα δεδομένα προϊόντων'
        });
      }
      
      const saveResult = saveProductsData(data);
      
      if (!saveResult) {
        return res.status(500).json({
          success: false,
          message: 'Σφάλμα κατά την αποθήκευση των προϊόντων'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Τα προϊόντα αποθηκεύτηκαν με επιτυχία'
      });
    } catch (error: any) {
      console.error('Error saving products:', error);
      return res.status(500).json({
        success: false,
        message: `Σφάλμα κατά την αποθήκευση των προϊόντων: ${error.message || 'Άγνωστο σφάλμα'}`
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