import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
import { initialData, getMonthlySalesData, getWeeklyAppointmentsData } from '@/utils/mockData';

// The key difference is that we're not importing fileStorage directly
// to avoid client-side imports of server-only modules like fs
// Instead, we'll handle data persistence through API routes

// Utility function to fetch data from API
const fetchFromApi = async <T>(endpoint: string): Promise<T[]> => {
  try {
    const response = await fetch(`/api/${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.success ? (data.data as T[]) : [];
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return [];
  }
};

// Utility function to save data to API
const saveToApi = async <T>(endpoint: string, data: T[]): Promise<boolean> => {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error(`Error saving to ${endpoint}:`, error);
    return false;
  }
};

interface DataContextType {
  customers: Customer[];
  staff: Staff[];
  services: Service[];
  products: Product[];
  appointments: Appointment[];
  sales: Sale[];
  salesData: SalesData[];
  appointmentsData: AppointmentsData[];
  isLoading: boolean;
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: number, customer: Partial<Customer>) => void;
  deleteCustomer: (id: number) => void;
  addStaff: (staff: Omit<Staff, 'id'>) => void;
  updateStaff: (id: number, staff: Partial<Staff>) => void;
  deleteStaff: (id: number) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: number, service: Partial<Service>) => void;
  deleteService: (id: number) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: number, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: number) => void;
  addSale: (sale: Omit<Sale, 'id'>) => void;
  updateSale: (id: number, sale: Partial<Sale>) => void;
  deleteSale: (id: number) => void;
  refreshChartData: () => void;
}

const defaultContextValue: DataContextType = {
  customers: [],
  staff: [],
  services: [],
  products: [],
  appointments: [],
  sales: [],
  salesData: [],
  appointmentsData: [],
  isLoading: true,
  addCustomer: () => {},
  updateCustomer: () => {},
  deleteCustomer: () => {},
  addStaff: () => {},
  updateStaff: () => {},
  deleteStaff: () => {},
  addService: () => {},
  updateService: () => {},
  deleteService: () => {},
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  addAppointment: () => {},
  updateAppointment: () => {},
  deleteAppointment: () => {},
  addSale: () => {},
  updateSale: () => {},
  deleteSale: () => {},
  refreshChartData: () => {},
};

export const DataContext = createContext<DataContextType>(defaultContextValue);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Initialize state with mock data for now, will be replaced by API data
  const [customers, setCustomers] = useState<Customer[]>(initialData.customers);
  const [staff, setStaff] = useState<Staff[]>(initialData.staff);
  const [services, setServices] = useState<Service[]>(initialData.services);
  const [products, setProducts] = useState<Product[]>(initialData.products);
  const [appointments, setAppointments] = useState<Appointment[]>(initialData.appointments);
  const [sales, setSales] = useState<Sale[]>(initialData.sales);
  const [salesData, setSalesData] = useState<SalesData[]>(initialData.salesData);
  const [appointmentsData, setAppointmentsData] = useState<AppointmentsData[]>(initialData.appointmentsData);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // Check if we're on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Initialize data system - in production this would fetch from the API
  useEffect(() => {
    if (isClient) {
      const initializeData = async () => {
        try {
          setIsLoading(true);
          
          // In a real implementation, we would fetch data from the API endpoints
          // For now, we'll just use the mock data
          
          // Simulate API request delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Set initial data
          setCustomers(initialData.customers);
          setStaff(initialData.staff);
          setServices(initialData.services);
          setProducts(initialData.products);
          setAppointments(initialData.appointments);
          setSales(initialData.sales);
          setSalesData(initialData.salesData);
          setAppointmentsData(initialData.appointmentsData);
          
          setIsLoading(false);
        } catch (error) {
          console.error('Error initializing data:', error);
          setIsLoading(false);
        }
      };
      
      initializeData();
    }
  }, [isClient]);
  
  // Helper functions for generating IDs
  const getNewId = (items: { id: number }[]): number => {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  };
  
  // CRUD operations for Customers
  const addCustomer = async (customer: Omit<Customer, 'id'>) => {
    const newCustomer = { ...customer, id: getNewId(customers) };
    const updatedCustomers = [...customers, newCustomer as Customer];
    setCustomers(updatedCustomers);
    
    // Save to API
    try {
      await saveToApi('customers', updatedCustomers);
      console.log('Customer added successfully:', newCustomer);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };
  
  const updateCustomer = async (id: number, updatedFields: Partial<Customer>) => {
    const updatedCustomers = customers.map(customer => 
      customer.id === id ? { ...customer, ...updatedFields } : customer
    );
    setCustomers(updatedCustomers);
    
    // Save to API
    try {
      await saveToApi('customers', updatedCustomers);
      console.log('Customer updated successfully:', id, updatedFields);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };
  
  const deleteCustomer = async (id: number) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id);
    setCustomers(updatedCustomers);
    
    // Save to API
    try {
      await saveToApi('customers', updatedCustomers);
      console.log('Customer deleted successfully:', id);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  
  // CRUD operations for Staff
  const addStaff = (staffMember: Omit<Staff, 'id'>) => {
    const newStaff = { ...staffMember, id: getNewId(staff) };
    const updatedStaff = [...staff, newStaff as Staff];
    setStaff(updatedStaff);
    
    // In a real implementation, we would save to the API here
    console.log('Adding staff:', newStaff);
  };
  
  const updateStaff = (id: number, updatedFields: Partial<Staff>) => {
    const updatedStaff = staff.map(staffMember => 
      staffMember.id === id ? { ...staffMember, ...updatedFields } : staffMember
    );
    setStaff(updatedStaff);
    
    // In a real implementation, we would save to the API here
    console.log('Updating staff:', id, updatedFields);
  };
  
  const deleteStaff = (id: number) => {
    const updatedStaff = staff.filter(staffMember => staffMember.id !== id);
    setStaff(updatedStaff);
    
    // In a real implementation, we would delete from the API here
    console.log('Deleting staff:', id);
  };
  
  // CRUD operations for Services
  const addService = (service: Omit<Service, 'id'>) => {
    const newService = { ...service, id: getNewId(services) };
    const updatedServices = [...services, newService as Service];
    setServices(updatedServices);
    
    // In a real implementation, we would save to the API here
    console.log('Adding service:', newService);
  };
  
  const updateService = (id: number, updatedFields: Partial<Service>) => {
    const updatedServices = services.map(service => 
      service.id === id ? { ...service, ...updatedFields } : service
    );
    setServices(updatedServices);
    
    // In a real implementation, we would save to the API here
    console.log('Updating service:', id, updatedFields);
  };
  
  const deleteService = (id: number) => {
    const updatedServices = services.filter(service => service.id !== id);
    setServices(updatedServices);
    
    // In a real implementation, we would delete from the API here
    console.log('Deleting service:', id);
  };
  
  // CRUD operations for Products
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: getNewId(products) };
    const updatedProducts = [...products, newProduct as Product];
    setProducts(updatedProducts);
    
    // In a real implementation, we would save to the API here
    console.log('Adding product:', newProduct);
  };
  
  const updateProduct = (id: number, updatedFields: Partial<Product>) => {
    const updatedProducts = products.map(product => 
      product.id === id ? { ...product, ...updatedFields } : product
    );
    setProducts(updatedProducts);
    
    // In a real implementation, we would save to the API here
    console.log('Updating product:', id, updatedFields);
  };
  
  const deleteProduct = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    
    // In a real implementation, we would delete from the API here
    console.log('Deleting product:', id);
  };
  
  // CRUD operations for Appointments
  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = { ...appointment, id: getNewId(appointments) };
    const updatedAppointments = [...appointments, newAppointment as Appointment];
    setAppointments(updatedAppointments);
    
    // In a real implementation, we would save to the API here
    console.log('Adding appointment:', newAppointment);
    
    refreshChartData(); // Update chart data when appointments change
  };
  
  const updateAppointment = (id: number, updatedFields: Partial<Appointment>) => {
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === id ? { ...appointment, ...updatedFields } : appointment
    );
    setAppointments(updatedAppointments);
    
    // In a real implementation, we would save to the API here
    console.log('Updating appointment:', id, updatedFields);
    
    refreshChartData(); // Update chart data when appointments change
  };
  
  const deleteAppointment = (id: number) => {
    const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
    setAppointments(updatedAppointments);
    
    // In a real implementation, we would delete from the API here
    console.log('Deleting appointment:', id);
    
    refreshChartData(); // Update chart data when appointments change
  };
  
  // CRUD operations for Sales
  const addSale = (sale: Omit<Sale, 'id'>) => {
    const newSale = { ...sale, id: getNewId(sales) };
    const updatedSales = [...sales, newSale as Sale];
    setSales(updatedSales);
    
    // In a real implementation, we would save to the API here
    console.log('Adding sale:', newSale);
    
    refreshChartData(); // Update chart data when sales change
  };
  
  const updateSale = (id: number, updatedFields: Partial<Sale>) => {
    const updatedSales = sales.map(sale => 
      sale.id === id ? { ...sale, ...updatedFields } : sale
    );
    setSales(updatedSales);
    
    // In a real implementation, we would save to the API here
    console.log('Updating sale:', id, updatedFields);
    
    refreshChartData(); // Update chart data when sales change
  };
  
  const deleteSale = (id: number) => {
    const updatedSales = sales.filter(sale => sale.id !== id);
    setSales(updatedSales);
    
    // In a real implementation, we would delete from the API here
    console.log('Deleting sale:', id);
    
    refreshChartData(); // Update chart data when sales change
  };
  
  // Refresh chart data
  const refreshChartData = () => {
    // Get updated chart data
    const newSalesData = getMonthlySalesData();
    const newAppointmentsData = getWeeklyAppointmentsData();
    
    // Update state
    setSalesData(newSalesData);
    setAppointmentsData(newAppointmentsData);
    
    // In a real implementation, we would save to the API here
    console.log('Refreshing chart data');
  };
  
  // Context value with all the data and CRUD operations
  const contextValue: DataContextType = {
    customers,
    staff,
    services,
    products,
    appointments,
    sales,
    salesData,
    appointmentsData,
    isLoading,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addStaff,
    updateStaff,
    deleteStaff,
    addService,
    updateService,
    deleteService,
    addProduct,
    updateProduct,
    deleteProduct,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    addSale,
    updateSale,
    deleteSale,
    refreshChartData,
  };
  
  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for accessing data context
export const useData = () => useContext(DataContext);