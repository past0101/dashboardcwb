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
  // Initialize state with mock data
  const [customers, setCustomers] = useState<Customer[]>(initialData.customers);
  const [staff, setStaff] = useState<Staff[]>(initialData.staff);
  const [services, setServices] = useState<Service[]>(initialData.services);
  const [products, setProducts] = useState<Product[]>(initialData.products);
  const [appointments, setAppointments] = useState<Appointment[]>(initialData.appointments);
  const [sales, setSales] = useState<Sale[]>(initialData.sales);
  const [salesData, setSalesData] = useState<SalesData[]>(initialData.salesData);
  const [appointmentsData, setAppointmentsData] = useState<AppointmentsData[]>(initialData.appointmentsData);
  
  // Helper functions for generating IDs
  const getNewId = (items: { id: number }[]): number => {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  };
  
  // CRUD operations for Customers
  const addCustomer = (customer: Omit<Customer, 'id'>) => {
    const newCustomer = { ...customer, id: getNewId(customers) };
    setCustomers([...customers, newCustomer as Customer]);
  };
  
  const updateCustomer = (id: number, updatedFields: Partial<Customer>) => {
    setCustomers(
      customers.map(customer => 
        customer.id === id ? { ...customer, ...updatedFields } : customer
      )
    );
  };
  
  const deleteCustomer = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };
  
  // CRUD operations for Staff
  const addStaff = (staffMember: Omit<Staff, 'id'>) => {
    // Generate a new ID based on existing staff
    const newId = staff.length > 0 ? Math.max(...staff.map(s => s.id)) + 1 : 1;
    const newStaff = { ...staffMember, id: newId };
    setStaff(prevStaff => [...prevStaff, newStaff as Staff]);
  };
  
  const updateStaff = (id: number, updatedFields: Partial<Staff>) => {
    setStaff(
      staff.map(staffMember => 
        staffMember.id === id ? { ...staffMember, ...updatedFields } : staffMember
      )
    );
  };
  
  const deleteStaff = (id: number) => {
    setStaff(staff.filter(staffMember => staffMember.id !== id));
  };
  
  // CRUD operations for Services
  const addService = (service: Omit<Service, 'id'>) => {
    const newService = { ...service, id: getNewId(services) };
    setServices([...services, newService as Service]);
  };
  
  const updateService = (id: number, updatedFields: Partial<Service>) => {
    setServices(
      services.map(service => 
        service.id === id ? { ...service, ...updatedFields } : service
      )
    );
  };
  
  const deleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };
  
  // CRUD operations for Products
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: getNewId(products) };
    setProducts([...products, newProduct as Product]);
  };
  
  const updateProduct = (id: number, updatedFields: Partial<Product>) => {
    setProducts(
      products.map(product => 
        product.id === id ? { ...product, ...updatedFields } : product
      )
    );
  };
  
  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };
  
  // CRUD operations for Appointments
  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = { ...appointment, id: getNewId(appointments) };
    setAppointments([...appointments, newAppointment as Appointment]);
    refreshChartData(); // Update chart data when appointments change
  };
  
  const updateAppointment = (id: number, updatedFields: Partial<Appointment>) => {
    setAppointments(
      appointments.map(appointment => 
        appointment.id === id ? { ...appointment, ...updatedFields } : appointment
      )
    );
    refreshChartData(); // Update chart data when appointments change
  };
  
  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
    refreshChartData(); // Update chart data when appointments change
  };
  
  // CRUD operations for Sales
  const addSale = (sale: Omit<Sale, 'id'>) => {
    const newSale = { ...sale, id: getNewId(sales) };
    setSales([...sales, newSale as Sale]);
    refreshChartData(); // Update chart data when sales change
  };
  
  const updateSale = (id: number, updatedFields: Partial<Sale>) => {
    setSales(
      sales.map(sale => 
        sale.id === id ? { ...sale, ...updatedFields } : sale
      )
    );
    refreshChartData(); // Update chart data when sales change
  };
  
  const deleteSale = (id: number) => {
    setSales(sales.filter(sale => sale.id !== id));
    refreshChartData(); // Update chart data when sales change
  };
  
  // Refresh chart data
  const refreshChartData = () => {
    setSalesData(getMonthlySalesData());
    setAppointmentsData(getWeeklyAppointmentsData());
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