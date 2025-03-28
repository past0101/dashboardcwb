import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { 
  initialData, 
  Customer, 
  Staff, 
  Service, 
  Product, 
  Appointment, 
  Sale,
  getMonthlySalesData,
  getWeeklyAppointmentsData,
  SalesData,
  AppointmentsData
} from '../utils/mockData';

interface DataContextType {
  customers: Customer[];
  staff: Staff[];
  services: Service[];
  products: Product[];
  appointments: Appointment[];
  sales: Sale[];
  salesData: SalesData[];
  appointmentsData: AppointmentsData[];
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
};

export const DataContext = createContext<DataContextType>(defaultContextValue);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<Omit<DataContextType, 'salesData' | 'appointmentsData' | 
    'addCustomer' | 'updateCustomer' | 'deleteCustomer' | 
    'addStaff' | 'updateStaff' | 'deleteStaff' | 
    'addService' | 'updateService' | 'deleteService' | 
    'addProduct' | 'updateProduct' | 'deleteProduct' | 
    'addAppointment' | 'updateAppointment' | 'deleteAppointment' | 
    'addSale' | 'updateSale' | 'deleteSale'>>(initialData);
  
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [appointmentsData, setAppointmentsData] = useState<AppointmentsData[]>([]);

  useEffect(() => {
    // Generate chart data on initial load
    setSalesData(getMonthlySalesData());
    setAppointmentsData(getWeeklyAppointmentsData());
  }, []);

  // CRUD operations for customers
  const addCustomer = (customer: Omit<Customer, 'id'>) => {
    const newCustomer = {
      ...customer,
      id: Math.max(...data.customers.map(c => c.id), 0) + 1
    };
    setData(prev => ({
      ...prev,
      customers: [...prev.customers, newCustomer]
    }));
  };

  const updateCustomer = (id: number, customer: Partial<Customer>) => {
    setData(prev => ({
      ...prev,
      customers: prev.customers.map(c => c.id === id ? { ...c, ...customer } : c)
    }));
  };

  const deleteCustomer = (id: number) => {
    setData(prev => ({
      ...prev,
      customers: prev.customers.filter(c => c.id !== id)
    }));
  };

  // CRUD operations for staff
  const addStaff = (staff: Omit<Staff, 'id'>) => {
    const newStaff = {
      ...staff,
      id: Math.max(...data.staff.map(s => s.id), 0) + 1
    };
    setData(prev => ({
      ...prev,
      staff: [...prev.staff, newStaff]
    }));
  };

  const updateStaff = (id: number, staff: Partial<Staff>) => {
    setData(prev => ({
      ...prev,
      staff: prev.staff.map(s => s.id === id ? { ...s, ...staff } : s)
    }));
  };

  const deleteStaff = (id: number) => {
    setData(prev => ({
      ...prev,
      staff: prev.staff.filter(s => s.id !== id)
    }));
  };

  // CRUD operations for services
  const addService = (service: Omit<Service, 'id'>) => {
    const newService = {
      ...service,
      id: Math.max(...data.services.map(s => s.id), 0) + 1
    };
    setData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const updateService = (id: number, service: Partial<Service>) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...service } : s)
    }));
  };

  const deleteService = (id: number) => {
    setData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  // CRUD operations for products
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.max(...data.products.map(p => p.id), 0) + 1
    };
    setData(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const updateProduct = (id: number, product: Partial<Product>) => {
    setData(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? { ...p, ...product } : p)
    }));
  };

  const deleteProduct = (id: number) => {
    setData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  // CRUD operations for appointments
  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = {
      ...appointment,
      id: Math.max(...data.appointments.map(a => a.id), 0) + 1
    };
    setData(prev => ({
      ...prev,
      appointments: [...prev.appointments, newAppointment]
    }));
  };

  const updateAppointment = (id: number, appointment: Partial<Appointment>) => {
    setData(prev => ({
      ...prev,
      appointments: prev.appointments.map(a => a.id === id ? { ...a, ...appointment } : a)
    }));
  };

  const deleteAppointment = (id: number) => {
    setData(prev => ({
      ...prev,
      appointments: prev.appointments.filter(a => a.id !== id)
    }));
  };

  // CRUD operations for sales
  const addSale = (sale: Omit<Sale, 'id'>) => {
    const newSale = {
      ...sale,
      id: Math.max(...data.sales.map(s => s.id), 0) + 1
    };
    setData(prev => ({
      ...prev,
      sales: [...prev.sales, newSale]
    }));
  };

  const updateSale = (id: number, sale: Partial<Sale>) => {
    setData(prev => ({
      ...prev,
      sales: prev.sales.map(s => s.id === id ? { ...s, ...sale } : s)
    }));
  };

  const deleteSale = (id: number) => {
    setData(prev => ({
      ...prev,
      sales: prev.sales.filter(s => s.id !== id)
    }));
  };

  return (
    <DataContext.Provider value={{
      ...data,
      salesData,
      appointmentsData,
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
      deleteSale
    }}>
      {children}
    </DataContext.Provider>
  );
};