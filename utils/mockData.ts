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

// Chart data
const MONTHLY_SALES_DATA: SalesData[] = [
  { month: 'Ιαν', sales: 4800 },
  { month: 'Φεβ', sales: 5400 },
  { month: 'Μαρ', sales: 6200 },
  { month: 'Απρ', sales: 5800 },
  { month: 'Μάι', sales: 6800 },
  { month: 'Ιουν', sales: 7600 },
  { month: 'Ιουλ', sales: 8200 },
  { month: 'Αυγ', sales: 8800 },
  { month: 'Σεπ', sales: 7400 },
  { month: 'Οκτ', sales: 6900 },
  { month: 'Νοε', sales: 6300 },
  { month: 'Δεκ', sales: 7500 },
];

const WEEKLY_APPOINTMENTS_DATA: AppointmentsData[] = [
  { day: 'Δευ', appointments: 3 },
  { day: 'Τρι', appointments: 5 },
  { day: 'Τετ', appointments: 4 },
  { day: 'Πεμ', appointments: 6 },
  { day: 'Παρ', appointments: 5 },
  { day: 'Σαβ', appointments: 4 },
  { day: 'Κυρ', appointments: 2 },
];

// Customer data
const CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: 'Γιάννης Παπαδόπουλος',
    email: 'giannis@example.com',
    phone: '6912345678',
    type: 'AUTO',
    vehicle: 'BMW X5 2019',
    dateAdded: '2023-10-15',
  },
  {
    id: 2,
    name: 'Μαρία Κωνσταντίνου',
    email: 'maria@example.com',
    phone: '6987654321',
    type: 'MOTO',
    vehicle: 'Ducati Panigale V4',
    dateAdded: '2023-11-05',
  },
  {
    id: 3,
    name: 'Δημήτρης Αναγνώστου',
    email: 'dimitris@example.com',
    phone: '6955552222',
    type: 'YACHT',
    vehicle: 'Princess F55',
    dateAdded: '2023-09-20',
  },
  {
    id: 4,
    name: 'Ελένη Παπαδάκη',
    email: 'eleni@example.com',
    phone: '6944443333',
    type: 'AUTO',
    vehicle: 'Audi A6 2022',
    dateAdded: '2023-12-10',
  },
  {
    id: 5,
    name: 'Κώστας Μακρίδης',
    email: 'kostas@example.com',
    phone: '6933334444',
    type: 'AVIATION',
    vehicle: 'Cessna Citation',
    dateAdded: '2024-01-05',
  },
];

// Staff data
const STAFF: Staff[] = [
  {
    id: 1,
    name: 'Αλέξανδρος Ιωάννου',
    position: 'Τεχνικός',
    email: 'alexandros@example.com',
    phone: '6921212121',
    startDate: '2022-05-10',
    stats: {
      appointments: 120,
      completed: 115,
      sales: 20,
    },
  },
  {
    id: 2,
    name: 'Χριστίνα Αλεξίου',
    position: 'Τεχνικός',
    email: 'christina@example.com',
    phone: '6932323232',
    startDate: '2022-08-15',
    stats: {
      appointments: 95,
      completed: 90,
      sales: 15,
    },
  },
  {
    id: 3,
    name: 'Γεώργιος Παπαγεωργίου',
    position: 'Υπεύθυνος Πωλήσεων',
    email: 'georgios@example.com',
    phone: '6945454545',
    startDate: '2021-11-05',
    stats: {
      appointments: 50,
      completed: 45,
      sales: 120,
    },
  },
];

// Services data
const SERVICES: Service[] = [
  {
    id: 1,
    name: 'Ceramic Pro 9H',
    description: 'Προστατευτική επίστρωση 9H για αυτοκίνητα',
    price: 350,
    duration: 180,
    category: 'AUTO',
  },
  {
    id: 2,
    name: 'Ceramic Pro Light',
    description: 'Ελαφριά προστατευτική επίστρωση για αυτοκίνητα',
    price: 250,
    duration: 120,
    category: 'AUTO',
  },
  {
    id: 3,
    name: 'Ceramic Pro Top Coat',
    description: 'Τελική επίστρωση για επιπλέον προστασία και λάμψη',
    price: 150,
    duration: 60,
    category: 'AUTO',
  },
  {
    id: 4,
    name: 'Ceramic Pro Wheel & Caliper',
    description: 'Προστασία για ζάντες και δαγκάνες φρένων',
    price: 200,
    duration: 90,
    category: 'AUTO',
  },
  {
    id: 5,
    name: 'Moto Protection',
    description: 'Πλήρης προστασία για μοτοσυκλέτες',
    price: 280,
    duration: 150,
    category: 'MOTO',
  },
  {
    id: 6,
    name: 'Yacht Ceramic Coating',
    description: 'Προστατευτική επίστρωση για σκάφη',
    price: 1200,
    duration: 480,
    category: 'YACHT',
  },
  {
    id: 7,
    name: 'Aviation Ceramic Shield',
    description: 'Ειδική επίστρωση για αεροσκάφη',
    price: 2500,
    duration: 720,
    category: 'AVIATION',
  },
];

// Products data
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Ceramic Pro Maintenance Shampoo',
    description: 'Ειδικό σαμπουάν για συντήρηση της επίστρωσης',
    price: 25,
    stock: 45,
    category: 'Περιποίηση',
  },
  {
    id: 2,
    name: 'Ceramic Pro Rain',
    description: 'Αδιαβροχοποιητικό για τζάμια',
    price: 40,
    stock: 30,
    category: 'Προστασία',
  },
  {
    id: 3,
    name: 'Ceramic Pro Strong',
    description: 'Καθαριστικό για επίμονους λεκέδες',
    price: 35,
    stock: 25,
    category: 'Καθαριστικά',
  },
];

// Appointments data
const APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    customerId: 1,
    customerName: 'Γιάννης Παπαδόπουλος',
    staffId: 1,
    staffName: 'Αλέξανδρος Ιωάννου',
    service: 'Ceramic Pro 9H',
    date: '2024-03-30',
    time: '10:00',
    status: 'SCHEDULED',
    type: 'AUTO',
    notes: 'Πρώτη επίσκεψη',
  },
  {
    id: 2,
    customerId: 2,
    customerName: 'Μαρία Κωνσταντίνου',
    staffId: 2,
    staffName: 'Χριστίνα Αλεξίου',
    service: 'Moto Protection',
    date: '2024-03-29',
    time: '14:00',
    status: 'SCHEDULED',
    type: 'MOTO',
  },
  {
    id: 3,
    customerId: 3,
    customerName: 'Δημήτρης Αναγνώστου',
    staffId: 1,
    staffName: 'Αλέξανδρος Ιωάννου',
    service: 'Yacht Ceramic Coating',
    date: '2024-04-05',
    time: '09:00',
    status: 'SCHEDULED',
    type: 'YACHT',
    notes: 'Να γίνει επιθεώρηση πριν την εφαρμογή',
  },
  {
    id: 4,
    customerId: 4,
    customerName: 'Ελένη Παπαδάκη',
    staffId: 2,
    staffName: 'Χριστίνα Αλεξίου',
    service: 'Ceramic Pro Light',
    date: '2024-03-28',
    time: '11:00',
    status: 'COMPLETED',
    type: 'AUTO',
  },
  {
    id: 5,
    customerId: 5,
    customerName: 'Κώστας Μακρίδης',
    staffId: 1,
    staffName: 'Αλέξανδρος Ιωάννου',
    service: 'Aviation Ceramic Shield',
    date: '2024-04-10',
    time: '08:00',
    status: 'SCHEDULED',
    type: 'AVIATION',
    notes: 'Θα χρειαστούν δύο ημέρες για την ολοκλήρωση',
  },
];

// Sales data
const SALES: Sale[] = [
  {
    id: 1,
    customerId: 1,
    customerName: 'Γιάννης Παπαδόπουλος',
    items: [
      {
        type: 'SERVICE',
        name: 'Ceramic Pro 9H',
        price: 350,
        quantity: 1,
      },
      {
        type: 'PRODUCT',
        name: 'Ceramic Pro Maintenance Shampoo',
        price: 25,
        quantity: 1,
      },
    ],
    total: 375,
    date: '2024-02-15',
    paymentMethod: 'CARD',
  },
  {
    id: 2,
    customerId: 2,
    customerName: 'Μαρία Κωνσταντίνου',
    items: [
      {
        type: 'SERVICE',
        name: 'Moto Protection',
        price: 280,
        quantity: 1,
      },
    ],
    total: 280,
    date: '2024-02-20',
    paymentMethod: 'CASH',
  },
  {
    id: 3,
    customerId: 4,
    customerName: 'Ελένη Παπαδάκη',
    items: [
      {
        type: 'SERVICE',
        name: 'Ceramic Pro Light',
        price: 250,
        quantity: 1,
      },
      {
        type: 'PRODUCT',
        name: 'Ceramic Pro Rain',
        price: 40,
        quantity: 1,
      },
      {
        type: 'PRODUCT',
        name: 'Ceramic Pro Maintenance Shampoo',
        price: 25,
        quantity: 1,
      },
    ],
    total: 315,
    date: '2024-03-28',
    paymentMethod: 'CARD',
  },
];

// Initial data object
export const initialData = {
  customers: CUSTOMERS,
  staff: STAFF,
  services: SERVICES,
  products: PRODUCTS,
  appointments: APPOINTMENTS,
  sales: SALES,
  salesData: MONTHLY_SALES_DATA,
  appointmentsData: WEEKLY_APPOINTMENTS_DATA,
};

// Helper functions for accessing the data
export const getMonthlySalesData = () => MONTHLY_SALES_DATA;
export const getWeeklyAppointmentsData = () => WEEKLY_APPOINTMENTS_DATA;