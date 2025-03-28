// This file is a client-side abstraction for data operations
// It interfaces with API endpoints rather than directly accessing the file system
import { 
  Customer, 
  Staff, 
  Service, 
  Product, 
  Appointment, 
  Sale,
  SalesData,
  AppointmentsData
} from '@/lib/types';
import { initialData } from './mockData';

// Helper function to check if we're running in a browser
const isBrowser = typeof window !== 'undefined';

// Generic function to fetch data from an API endpoint
const fetchData = async <T>(endpoint: string, defaultData: T[]): Promise<T[]> => {
  if (!isBrowser) {
    // If we're on the server, return default data
    return defaultData;
  }
  
  try {
    const response = await fetch(`/api/${endpoint}`);
    if (!response.ok) {
      console.error(`Error fetching ${endpoint}:`, response.statusText);
      return defaultData;
    }
    
    const data = await response.json();
    return data.data || defaultData;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return defaultData;
  }
};

// Generic function to save data via an API endpoint
const saveDataViaApi = async <T>(endpoint: string, data: T[]): Promise<boolean> => {
  if (!isBrowser) {
    // If we're on the server, we can't make fetch requests
    return false;
  }
  
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
    
    if (!response.ok) {
      console.error(`Error saving ${endpoint}:`, response.statusText);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error saving ${endpoint}:`, error);
    return false;
  }
};

// Initialize the data - this is a no-op in client mode but will be used by the server
export const initializeDataFiles = async (): Promise<boolean> => {
  if (!isBrowser) {
    return false;
  }
  
  try {
    const response = await fetch('/api/initialize-data', {
      method: 'POST',
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error initializing data:', error);
    return false;
  }
};

// Client-side data operations - these will use the API endpoints
export const loadCustomers = async (): Promise<Customer[]> => {
  return await fetchData<Customer>('customers', initialData.customers);
};

export const saveCustomers = async (customers: Customer[]): Promise<boolean> => {
  return await saveDataViaApi<Customer>('customers', customers);
};

export const loadStaff = async (): Promise<Staff[]> => {
  return await fetchData<Staff>('staff', initialData.staff);
};

export const saveStaff = async (staff: Staff[]): Promise<boolean> => {
  return await saveDataViaApi<Staff>('staff', staff);
};

export const loadServices = async (): Promise<Service[]> => {
  return await fetchData<Service>('services', initialData.services);
};

export const saveServices = async (services: Service[]): Promise<boolean> => {
  return await saveDataViaApi<Service>('services', services);
};

export const loadProducts = async (): Promise<Product[]> => {
  return await fetchData<Product>('products', initialData.products);
};

export const saveProducts = async (products: Product[]): Promise<boolean> => {
  return await saveDataViaApi<Product>('products', products);
};

export const loadAppointments = async (): Promise<Appointment[]> => {
  return await fetchData<Appointment>('appointments', initialData.appointments);
};

export const saveAppointments = async (appointments: Appointment[]): Promise<boolean> => {
  return await saveDataViaApi<Appointment>('appointments', appointments);
};

export const loadSales = async (): Promise<Sale[]> => {
  return await fetchData<Sale>('sales', initialData.sales);
};

export const saveSales = async (sales: Sale[]): Promise<boolean> => {
  return await saveDataViaApi<Sale>('sales', sales);
};

export const loadSalesData = async (): Promise<SalesData[]> => {
  return await fetchData<SalesData>('sales-data', initialData.salesData);
};

export const saveSalesData = async (salesData: SalesData[]): Promise<boolean> => {
  return await saveDataViaApi<SalesData>('sales-data', salesData);
};

export const loadAppointmentsData = async (): Promise<AppointmentsData[]> => {
  return await fetchData<AppointmentsData>('appointments-data', initialData.appointmentsData);
};

export const saveAppointmentsData = async (appointmentsData: AppointmentsData[]): Promise<boolean> => {
  return await saveDataViaApi<AppointmentsData>('appointments-data', appointmentsData);
};