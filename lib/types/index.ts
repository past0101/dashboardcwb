export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: 'AUTO' | 'MOTO' | 'YACHT' | 'AVIATION';
  vehicle?: string;
  dateAdded: string;
};

export type Staff = {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  startDate: string;
  stats: {
    appointments: number;
    completed: number;
    sales: number;
  };
};

export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'AUTO' | 'MOTO' | 'YACHT' | 'AVIATION';
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
};

export type Appointment = {
  id: number;
  customerId: number;
  customerName: string;
  staffId: number;
  staffName: string;
  service: string;
  date: string;
  time: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  type: 'AUTO' | 'MOTO' | 'YACHT' | 'AVIATION';
  notes?: string;
};

export type Sale = {
  id: number;
  customerId: number;
  customerName: string;
  items: {
    type: 'SERVICE' | 'PRODUCT';
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  date: string;
  paymentMethod: 'CASH' | 'CARD' | 'TRANSFER';
};

export type SalesData = {
  month: string;
  sales: number;
};

export type AppointmentsData = {
  day: string;
  appointments: number;
};

export type ThemeMode = 'light' | 'dark';