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
      name: 'Γιάννης Αντωνίου',
      email: 'gantonioiu@example.com',
      phone: '6945678901',
      position: 'Εξειδικευμένος Τεχνικός AUTO',
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
      name: 'Κώστας Δημητρίου',
      email: 'kdimitriou@example.com',
      phone: '6956789012',
      position: 'Τεχνικός MOTO/YACHT',
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
      name: 'Μαρία Παπαδοπούλου',
      email: 'mpapadopoulou@example.com',
      phone: '6967890123',
      position: 'Ειδικός Εφαρμογών AVIATION',
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
    },
    {
      id: '4',
      name: 'Νίκος Ιωάννου',
      email: 'nioannou@example.com',
      phone: '6978901234',
      position: 'Βοηθός Τεχνικός',
      schedule: {
        monday: { start: '09:00', end: '17:00' },
        tuesday: { start: '09:00', end: '17:00' },
        wednesday: { start: '09:00', end: '17:00' },
        thursday: { start: '09:00', end: '17:00' },
        friday: { start: '09:00', end: '17:00' },
        saturday: { start: '10:00', end: '15:00' },
        sunday: { start: '', end: '' }
      },
      createdAt: '2023-02-15T09:30:00.000Z'
    }
  ],
  
  // Sample services
  services: [
    {
      id: '1',
      name: 'AUTO Ceramic Coating - Basic',
      description: 'Βασική κεραμική επικάλυψη για αυτοκίνητα, προστασία 6 μηνών',
      duration: 180, // in minutes
      price: 150.00,
      categoryId: '1',
      createdAt: '2022-11-01T10:00:00.000Z'
    },
    {
      id: '2',
      name: 'AUTO Ceramic Coating - Premium',
      description: 'Πλήρης κεραμική επικάλυψη για αυτοκίνητα, προστασία 12 μηνών',
      duration: 300, // in minutes
      price: 250.00,
      categoryId: '1',
      createdAt: '2022-11-01T10:15:00.000Z'
    },
    {
      id: '3',
      name: 'MOTO Ceramic Coating',
      description: 'Κεραμική επικάλυψη για μοτοσυκλέτες',
      duration: 120, // in minutes
      price: 120.00,
      categoryId: '2',
      createdAt: '2022-11-01T10:30:00.000Z'
    },
    {
      id: '4',
      name: 'YACHT Ceramic Coating',
      description: 'Κεραμική επικάλυψη για σκάφη, ανθεκτική στο αλμυρό νερό',
      duration: 480, // in minutes
      price: 800.00,
      categoryId: '3',
      createdAt: '2022-11-01T10:45:00.000Z'
    },
    {
      id: '5',
      name: 'AVIATION Ceramic Coating',
      description: 'Εξειδικευμένη κεραμική επικάλυψη για αεροσκάφη',
      duration: 720, // in minutes
      price: 1500.00,
      categoryId: '4',
      createdAt: '2022-11-01T11:00:00.000Z'
    }
  ],
  
  // Service categories
  serviceCategories: [
    {
      id: '1',
      name: 'AUTO',
      createdAt: '2022-10-15T09:30:00.000Z'
    },
    {
      id: '2',
      name: 'MOTO',
      createdAt: '2022-10-15T09:45:00.000Z'
    },
    {
      id: '3',
      name: 'YACHT',
      createdAt: '2022-10-15T10:00:00.000Z'
    },
    {
      id: '4',
      name: 'AVIATION',
      createdAt: '2022-10-15T10:15:00.000Z'
    }
  ],
  
  // Sample products
  products: [
    {
      id: '1',
      name: 'Ceramic Pro 9H',
      description: 'Επαγγελματικό κεραμικό προϊόν 9H ανώτατης προστασίας',
      price: 89.50,
      stock: 15,
      categoryId: '1',
      createdAt: '2022-11-15T11:00:00.000Z'
    },
    {
      id: '2',
      name: 'Ceramic Pro Light',
      description: 'Ελαφρύ κεραμικό προϊόν για γρήγορη εφαρμογή',
      price: 45.00,
      stock: 22,
      categoryId: '1',
      createdAt: '2022-11-15T11:15:00.000Z'
    },
    {
      id: '3',
      name: 'Ceramic Pro Top Coat',
      description: 'Προϊόν τελικής επίστρωσης για μέγιστη γυαλάδα',
      price: 38.50,
      stock: 28,
      categoryId: '1',
      createdAt: '2022-11-15T11:30:00.000Z'
    },
    {
      id: '4',
      name: 'Nano Polish',
      description: 'Ειδικό γυαλιστικό νανοτεχνολογίας',
      price: 29.99,
      stock: 32,
      categoryId: '2',
      createdAt: '2022-11-15T11:45:00.000Z'
    },
    {
      id: '5',
      name: 'Ceramic Pro Marine',
      description: 'Ειδική σύνθεση για χρήση σε σκάφη',
      price: 120.00,
      stock: 8,
      categoryId: '3',
      createdAt: '2022-11-15T12:00:00.000Z'
    }
  ],
  
  // Product categories
  productCategories: [
    {
      id: '1',
      name: 'Κεραμικά Προϊόντα',
      createdAt: '2022-10-20T10:00:00.000Z'
    },
    {
      id: '2',
      name: 'Προϊόντα Γυαλίσματος',
      createdAt: '2022-10-20T10:15:00.000Z'
    },
    {
      id: '3',
      name: 'Ειδικές Εφαρμογές',
      createdAt: '2022-10-20T10:30:00.000Z'
    },
    {
      id: '4',
      name: 'Εργαλεία Εφαρμογής',
      createdAt: '2022-10-20T10:45:00.000Z'
    }
  ],
  
  // Sample sales
  sales: [
    {
      id: '1',
      customerId: '1',
      staffId: '1',
      items: [
        { type: 'service', id: '1', quantity: 1, price: 150.00 },
        { type: 'product', id: '1', quantity: 1, price: 89.50 }
      ],
      total: 239.50,
      paymentMethod: 'card',
      date: '2023-07-01T11:30:00.000Z'
    },
    {
      id: '2',
      customerId: '2',
      staffId: '2',
      items: [
        { type: 'service', id: '3', quantity: 1, price: 120.00 },
        { type: 'product', id: '4', quantity: 1, price: 29.99 }
      ],
      total: 149.99,
      paymentMethod: 'card',
      date: '2023-07-02T15:45:00.000Z'
    },
    {
      id: '3',
      customerId: '3',
      staffId: '1',
      items: [
        { type: 'service', id: '2', quantity: 1, price: 250.00 },
        { type: 'product', id: '2', quantity: 1, price: 45.00 }
      ],
      total: 295.00,
      paymentMethod: 'card',
      date: '2023-07-03T14:20:00.000Z'
    },
    {
      id: '4',
      customerId: '1',
      staffId: '3',
      items: [
        { type: 'service', id: '5', quantity: 1, price: 1500.00 },
        { type: 'product', id: '5', quantity: 2, price: 120.00 }
      ],
      total: 1740.00,
      paymentMethod: 'transfer',
      date: '2023-07-05T10:15:00.000Z'
    },
    {
      id: '5',
      customerId: '2',
      staffId: '4',
      items: [
        { type: 'service', id: '4', quantity: 1, price: 800.00 },
        { type: 'product', id: '5', quantity: 1, price: 120.00 }
      ],
      total: 920.00,
      paymentMethod: 'card',
      date: '2023-07-07T13:45:00.000Z'
    }
  ],
  
  // Sample invoices
  invoices: [
    {
      id: '1',
      customerId: '1',
      items: [
        { type: 'service', id: '1', quantity: 1, price: 150.00 },
        { type: 'product', id: '1', quantity: 1, price: 89.50 }
      ],
      subtotal: 239.50,
      tax: 57.48,
      total: 296.98,
      date: '2023-07-01T11:35:00.000Z',
      dueDate: '2023-07-15T00:00:00.000Z',
      status: 'paid',
      notes: 'AUTO Ceramic Coating Basic + Ceramic Pro 9H'
    },
    {
      id: '2',
      customerId: '2',
      items: [
        { type: 'service', id: '3', quantity: 1, price: 120.00 },
        { type: 'product', id: '4', quantity: 1, price: 29.99 }
      ],
      subtotal: 149.99,
      tax: 36.00,
      total: 185.99,
      date: '2023-07-02T15:50:00.000Z',
      dueDate: '2023-07-16T00:00:00.000Z',
      status: 'paid',
      notes: 'MOTO Ceramic Coating'
    },
    {
      id: '3',
      customerId: '3',
      items: [
        { type: 'service', id: '2', quantity: 1, price: 250.00 },
        { type: 'product', id: '2', quantity: 1, price: 45.00 }
      ],
      subtotal: 295.00,
      tax: 70.80,
      total: 365.80,
      date: '2023-07-03T14:25:00.000Z',
      dueDate: '2023-07-17T00:00:00.000Z',
      status: 'unpaid',
      notes: 'AUTO Ceramic Coating Premium'
    },
    {
      id: '4',
      customerId: '1',
      items: [
        { type: 'service', id: '5', quantity: 1, price: 1500.00 },
        { type: 'product', id: '5', quantity: 2, price: 120.00 }
      ],
      subtotal: 1740.00,
      tax: 417.60,
      total: 2157.60,
      date: '2023-07-05T10:20:00.000Z',
      dueDate: '2023-07-19T00:00:00.000Z',
      status: 'paid',
      notes: 'AVIATION Ceramic Coating για ιδιωτικό αεροσκάφος'
    },
    {
      id: '5',
      customerId: '2',
      items: [
        { type: 'service', id: '4', quantity: 1, price: 800.00 },
        { type: 'product', id: '5', quantity: 1, price: 120.00 }
      ],
      subtotal: 920.00,
      tax: 220.80,
      total: 1140.80,
      date: '2023-07-07T13:50:00.000Z',
      dueDate: '2023-07-21T00:00:00.000Z',
      status: 'unpaid',
      notes: 'YACHT Ceramic Coating για σκάφος 12 μέτρων'
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
      name: 'Ceramic Pro Studio',
      address: 'Λεωφόρος Μεσογείων 265, Αθήνα',
      phone: '2106547890',
      email: 'info@ceramicprostudio.gr',
      website: 'www.ceramicprostudio.gr',
      taxId: '123456789'
    },
    businessHours: {
      monday: { open: '09:00', close: '18:00' },
      tuesday: { open: '09:00', close: '18:00' },
      wednesday: { open: '09:00', close: '18:00' },
      thursday: { open: '09:00', close: '18:00' },
      friday: { open: '09:00', close: '18:00' },
      saturday: { open: '10:00', close: '16:00' },
      sunday: { open: '', close: '' }
    },
    notifications: {
      email: true,
      sms: true,
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
