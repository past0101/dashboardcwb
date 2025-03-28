// This file contains initial mock data for the application
// No personal or real data is included, only placeholders
// This would typically be replaced by actual API calls to the Laravel backend

export const initialData = {
  // Sample appointments
  appointments: [
    {
      id: '1',
      customerId: '1',
      serviceId: '1',
      staffId: '1',
      date: '2023-07-10T10:00:00.000Z',
      endTime: '2023-07-10T11:00:00.000Z',
      status: 'confirmed', // confirmed, pending, cancelled
      notes: 'Πρώτο ραντεβού πελάτη',
      createdAt: '2023-07-03T14:15:22.000Z'
    },
    {
      id: '2',
      customerId: '2',
      serviceId: '2',
      staffId: '1',
      date: '2023-07-10T13:00:00.000Z',
      endTime: '2023-07-10T14:30:00.000Z',
      status: 'pending',
      notes: '',
      createdAt: '2023-07-05T09:30:15.000Z'
    },
    {
      id: '3',
      customerId: '3',
      serviceId: '3',
      staffId: '2',
      date: '2023-07-11T16:00:00.000Z',
      endTime: '2023-07-11T17:00:00.000Z',
      status: 'confirmed',
      notes: 'Επαναλαμβανόμενος πελάτης',
      createdAt: '2023-07-04T11:20:00.000Z'
    },
    {
      id: '4',
      customerId: '1',
      serviceId: '4',
      staffId: '3',
      date: '2023-07-12T09:00:00.000Z',
      endTime: '2023-07-12T10:30:00.000Z',
      status: 'cancelled',
      notes: 'Ακύρωση λόγω προσωπικού προβλήματος',
      createdAt: '2023-07-05T16:45:30.000Z'
    }
  ],
  
  // Sample customers
  customers: [
    {
      id: '1',
      name: 'Γιώργος Παπαδόπουλος',
      email: 'gpapadopoulos@example.com',
      phone: '6912345678',
      address: 'Αθήνα, Κολωνάκι 15',
      notes: 'Τακτικός πελάτης',
      points: 150,
      createdAt: '2023-01-15T10:30:00.000Z'
    },
    {
      id: '2',
      name: 'Μαρία Κωνσταντίνου',
      email: 'mkonstantinou@example.com',
      phone: '6923456789',
      address: 'Θεσσαλονίκη, Καλαμαριά 28',
      notes: '',
      points: 75,
      createdAt: '2023-02-20T14:45:00.000Z'
    },
    {
      id: '3',
      name: 'Δημήτρης Αντωνίου',
      email: 'dantoniou@example.com',
      phone: '6934567890',
      address: 'Πάτρα, Κέντρο 5',
      notes: 'Προτιμά απογευματινά ραντεβού',
      points: 200,
      createdAt: '2023-03-10T11:15:00.000Z'
    }
  ],
  
  // Sample staff
  staff: [
    {
      id: '1',
      name: 'Ελένη Παππά',
      email: 'epappa@example.com',
      phone: '6945678901',
      position: 'Στυλίστρια',
      schedule: {
        monday: { start: '09:00', end: '17:00' },
        tuesday: { start: '09:00', end: '17:00' },
        wednesday: { start: '09:00', end: '17:00' },
        thursday: { start: '09:00', end: '17:00' },
        friday: { start: '09:00', end: '17:00' },
        saturday: { start: '10:00', end: '15:00' },
        sunday: { start: '', end: '' }
      },
      createdAt: '2022-12-01T09:00:00.000Z'
    },
    {
      id: '2',
      name: 'Νίκος Βασιλείου',
      email: 'nvasiliou@example.com',
      phone: '6956789012',
      position: 'Τεχνίτης',
      schedule: {
        monday: { start: '09:00', end: '17:00' },
        tuesday: { start: '09:00', end: '17:00' },
        wednesday: { start: '', end: '' },
        thursday: { start: '09:00', end: '17:00' },
        friday: { start: '09:00', end: '17:00' },
        saturday: { start: '10:00', end: '15:00' },
        sunday: { start: '', end: '' }
      },
      createdAt: '2022-12-15T10:30:00.000Z'
    },
    {
      id: '3',
      name: 'Σοφία Γεωργίου',
      email: 'sgeorgiou@example.com',
      phone: '6967890123',
      position: 'Βοηθός',
      schedule: {
        monday: { start: '12:00', end: '20:00' },
        tuesday: { start: '12:00', end: '20:00' },
        wednesday: { start: '12:00', end: '20:00' },
        thursday: { start: '12:00', end: '20:00' },
        friday: { start: '12:00', end: '20:00' },
        saturday: { start: '', end: '' },
        sunday: { start: '', end: '' }
      },
      createdAt: '2023-01-10T11:45:00.000Z'
    }
  ],
  
  // Sample services
  services: [
    {
      id: '1',
      name: 'Κούρεμα',
      description: 'Βασικό κούρεμα με ψαλίδι',
      duration: 30, // in minutes
      price: 15.00,
      categoryId: '1',
      createdAt: '2022-11-01T10:00:00.000Z'
    },
    {
      id: '2',
      name: 'Βαφή',
      description: 'Πλήρης βαφή μαλλιών',
      duration: 90, // in minutes
      price: 45.00,
      categoryId: '1',
      createdAt: '2022-11-01T10:15:00.000Z'
    },
    {
      id: '3',
      name: 'Μανικιούρ',
      description: 'Βασικό μανικιούρ',
      duration: 30, // in minutes
      price: 20.00,
      categoryId: '2',
      createdAt: '2022-11-01T10:30:00.000Z'
    },
    {
      id: '4',
      name: 'Πεντικιούρ',
      description: 'Πλήρες πεντικιούρ',
      duration: 45, // in minutes
      price: 25.00,
      categoryId: '2',
      createdAt: '2022-11-01T10:45:00.000Z'
    }
  ],
  
  // Service categories
  serviceCategories: [
    {
      id: '1',
      name: 'Μαλλιά',
      createdAt: '2022-10-15T09:30:00.000Z'
    },
    {
      id: '2',
      name: 'Νύχια',
      createdAt: '2022-10-15T09:45:00.000Z'
    },
    {
      id: '3',
      name: 'Πρόσωπο',
      createdAt: '2022-10-15T10:00:00.000Z'
    }
  ],
  
  // Sample products
  products: [
    {
      id: '1',
      name: 'Σαμπουάν',
      description: 'Επαγγελματικό σαμπουάν για όλους τους τύπους μαλλιών',
      price: 12.50,
      stock: 25,
      categoryId: '1',
      createdAt: '2022-11-15T11:00:00.000Z'
    },
    {
      id: '2',
      name: 'Κρέμα μαλλιών',
      description: 'Επαγγελματική κρέμα για ξηρά μαλλιά',
      price: 14.00,
      stock: 18,
      categoryId: '1',
      createdAt: '2022-11-15T11:15:00.000Z'
    },
    {
      id: '3',
      name: 'Βερνίκι νυχιών',
      description: 'Υψηλής ποιότητας βερνίκι μακράς διαρκείας',
      price: 8.50,
      stock: 32,
      categoryId: '2',
      createdAt: '2022-11-15T11:30:00.000Z'
    }
  ],
  
  // Product categories
  productCategories: [
    {
      id: '1',
      name: 'Προϊόντα Μαλλιών',
      createdAt: '2022-10-20T10:00:00.000Z'
    },
    {
      id: '2',
      name: 'Προϊόντα Νυχιών',
      createdAt: '2022-10-20T10:15:00.000Z'
    },
    {
      id: '3',
      name: 'Προϊόντα Προσώπου',
      createdAt: '2022-10-20T10:30:00.000Z'
    }
  ],
  
  // Sample sales
  sales: [
    {
      id: '1',
      customerId: '1',
      staffId: '1',
      items: [
        { type: 'service', id: '1', quantity: 1, price: 15.00 },
        { type: 'product', id: '1', quantity: 1, price: 12.50 }
      ],
      total: 27.50,
      paymentMethod: 'cash',
      date: '2023-07-01T11:30:00.000Z'
    },
    {
      id: '2',
      customerId: '2',
      staffId: '2',
      items: [
        { type: 'service', id: '3', quantity: 1, price: 20.00 },
        { type: 'service', id: '4', quantity: 1, price: 25.00 }
      ],
      total: 45.00,
      paymentMethod: 'card',
      date: '2023-07-02T15:45:00.000Z'
    },
    {
      id: '3',
      customerId: '3',
      staffId: '1',
      items: [
        { type: 'service', id: '2', quantity: 1, price: 45.00 },
        { type: 'product', id: '2', quantity: 1, price: 14.00 }
      ],
      total: 59.00,
      paymentMethod: 'card',
      date: '2023-07-03T14:20:00.000Z'
    }
  ],
  
  // Sample invoices
  invoices: [
    {
      id: '1',
      customerId: '1',
      items: [
        { type: 'service', id: '1', quantity: 1, price: 15.00 },
        { type: 'product', id: '1', quantity: 1, price: 12.50 }
      ],
      subtotal: 27.50,
      tax: 6.60,
      total: 34.10,
      date: '2023-07-01T11:35:00.000Z',
      dueDate: '2023-07-15T00:00:00.000Z',
      status: 'paid',
      notes: ''
    },
    {
      id: '2',
      customerId: '2',
      items: [
        { type: 'service', id: '3', quantity: 1, price: 20.00 },
        { type: 'service', id: '4', quantity: 1, price: 25.00 }
      ],
      subtotal: 45.00,
      tax: 10.80,
      total: 55.80,
      date: '2023-07-02T15:50:00.000Z',
      dueDate: '2023-07-16T00:00:00.000Z',
      status: 'paid',
      notes: ''
    },
    {
      id: '3',
      customerId: '3',
      items: [
        { type: 'service', id: '2', quantity: 1, price: 45.00 },
        { type: 'product', id: '2', quantity: 1, price: 14.00 }
      ],
      subtotal: 59.00,
      tax: 14.16,
      total: 73.16,
      date: '2023-07-03T14:25:00.000Z',
      dueDate: '2023-07-17T00:00:00.000Z',
      status: 'unpaid',
      notes: ''
    }
  ],
  
  // Sample reviews
  reviews: [
    {
      id: '1',
      customerId: '1',
      staffId: '1',
      serviceId: '1',
      rating: 5,
      comment: 'Εξαιρετική εξυπηρέτηση, άψογο αποτέλεσμα!',
      date: '2023-07-01T14:30:00.000Z'
    },
    {
      id: '2',
      customerId: '2',
      staffId: '2',
      serviceId: '3',
      rating: 4,
      comment: 'Πολύ καλή δουλειά, θα ξαναέρθω.',
      date: '2023-07-02T18:15:00.000Z'
    },
    {
      id: '3',
      customerId: '3',
      staffId: '1',
      serviceId: '2',
      rating: 5,
      comment: 'Φανταστικό αποτέλεσμα, ευχαριστώ πολύ!',
      date: '2023-07-03T17:45:00.000Z'
    }
  ],
  
  // Application settings
  settings: {
    businessInfo: {
      name: 'Beauty Salon',
      address: 'Λεωφόρος Αλεξάνδρας 45, Αθήνα',
      phone: '2101234567',
      email: 'info@beautysalon.gr',
      website: 'www.beautysalon.gr',
      taxId: '123456789'
    },
    businessHours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '10:00', close: '16:00' },
      sunday: { open: '', close: '' }
    },
    notifications: {
      email: true,
      sms: false,
      appointmentReminder: true,
      reminderTime: 24 // hours before appointment
    }
  }
};

// Generate monthly sales data for charts
export const getMonthlySalesData = () => {
  const currentYear = new Date().getFullYear();
  return [
    { month: 'Ιαν', sales: 4500 },
    { month: 'Φεβ', sales: 5200 },
    { month: 'Μαρ', sales: 5800 },
    { month: 'Απρ', sales: 6300 },
    { month: 'Μάι', sales: 6800 },
    { month: 'Ιουν', sales: 7500 },
    { month: 'Ιουλ', sales: 8200 },
    { month: 'Αυγ', sales: 0 },
    { month: 'Σεπ', sales: 0 },
    { month: 'Οκτ', sales: 0 },
    { month: 'Νοε', sales: 0 },
    { month: 'Δεκ', sales: 0 }
  ];
};

// Generate weekly appointments data for charts
export const getWeeklyAppointmentsData = () => {
  return [
    { day: 'Δευ', appointments: 8 },
    { day: 'Τρι', appointments: 12 },
    { day: 'Τετ', appointments: 10 },
    { day: 'Πεμ', appointments: 15 },
    { day: 'Παρ', appointments: 18 },
    { day: 'Σαβ', appointments: 9 },
    { day: 'Κυρ', appointments: 0 }
  ];
};
