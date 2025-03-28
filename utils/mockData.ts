// Types
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

// Mock data
export const initialData = {
  customers: [
    {
      id: 1,
      name: 'Γιώργος Παπαδόπουλος',
      email: 'gpapad@example.com',
      phone: '6944123456',
      type: 'AUTO',
      vehicle: 'BMW X5 2020',
      dateAdded: '2023-01-15'
    },
    {
      id: 2,
      name: 'Μαρία Κωνσταντίνου',
      email: 'mariakonst@example.com',
      phone: '6977654321',
      type: 'MOTO',
      vehicle: 'Honda CBR 650R',
      dateAdded: '2023-02-20'
    },
    {
      id: 3,
      name: 'Δημήτρης Αντωνίου',
      email: 'dimant@example.com',
      phone: '6933222111',
      type: 'YACHT',
      vehicle: 'Oceanic 45ft',
      dateAdded: '2023-03-10'
    },
    {
      id: 4,
      name: 'Ελένη Γεωργίου',
      email: 'elenigeo@example.com',
      phone: '6955443322',
      type: 'AUTO',
      vehicle: 'Mercedes C200 2022',
      dateAdded: '2023-04-05'
    },
    {
      id: 5,
      name: 'Νίκος Καραμανλής',
      email: 'nikoskar@example.com',
      phone: '6988776655',
      type: 'AVIATION',
      vehicle: 'Cessna 172',
      dateAdded: '2023-05-18'
    }
  ] as Customer[],
  
  staff: [
    {
      id: 1,
      name: 'Αλέξανδρος Νικολάου',
      position: 'Επικεφαλής Τεχνικός',
      email: 'alexnik@example.com',
      phone: '6944567890',
      startDate: '2022-05-10',
      stats: {
        appointments: 145,
        completed: 138,
        sales: 162000
      }
    },
    {
      id: 2,
      name: 'Χριστίνα Δημητρίου',
      position: 'Τεχνικός AUTO',
      email: 'christinad@example.com',
      phone: '6977123456',
      startDate: '2022-08-15',
      stats: {
        appointments: 120,
        completed: 115,
        sales: 128000
      }
    },
    {
      id: 3,
      name: 'Κώστας Αναγνώστου',
      position: 'Τεχνικός YACHT',
      email: 'kostasan@example.com',
      phone: '6933987654',
      startDate: '2023-01-20',
      stats: {
        appointments: 75,
        completed: 70,
        sales: 230000
      }
    },
    {
      id: 4,
      name: 'Σοφία Παππά',
      position: 'Υπεύθυνη Πωλήσεων',
      email: 'sofiap@example.com',
      phone: '6955111222',
      startDate: '2022-06-01',
      stats: {
        appointments: 0,
        completed: 0,
        sales: 350000
      }
    }
  ] as Staff[],
  
  services: [
    {
      id: 1,
      name: 'Ceramic Coating AUTO Standard',
      description: 'Βασική επίστρωση κεραμικού για αυτοκίνητα',
      price: 350,
      duration: 240,
      category: 'AUTO'
    },
    {
      id: 2,
      name: 'Ceramic Coating AUTO Premium',
      description: 'Premium επίστρωση κεραμικού για αυτοκίνητα με εγγύηση 5 ετών',
      price: 650,
      duration: 480,
      category: 'AUTO'
    },
    {
      id: 3,
      name: 'Ceramic Coating MOTO',
      description: 'Επίστρωση κεραμικού για μοτοσυκλέτες',
      price: 250,
      duration: 180,
      category: 'MOTO'
    },
    {
      id: 4,
      name: 'Ceramic Coating YACHT Basic',
      description: 'Βασική επίστρωση κεραμικού για σκάφη έως 25ft',
      price: 1500,
      duration: 720,
      category: 'YACHT'
    },
    {
      id: 5,
      name: 'Ceramic Coating YACHT Premium',
      description: 'Premium επίστρωση κεραμικού για σκάφη με εγγύηση 3 ετών',
      price: 4500,
      duration: 1440,
      category: 'YACHT'
    },
    {
      id: 6,
      name: 'Ceramic Coating AVIATION',
      description: 'Επίστρωση κεραμικού για αεροσκάφη γενικής αεροπορίας',
      price: 5000,
      duration: 1200,
      category: 'AVIATION'
    }
  ] as Service[],
  
  products: [
    {
      id: 1,
      name: 'Ceramic Spray Maintenance',
      description: 'Σπρέι συντήρησης κεραμικής επίστρωσης',
      price: 25,
      stock: 45,
      category: 'MAINTENANCE'
    },
    {
      id: 2,
      name: 'Premium Microfiber Towel',
      description: 'Πανί μικροϊνών υψηλής ποιότητας',
      price: 12,
      stock: 120,
      category: 'ACCESSORIES'
    },
    {
      id: 3,
      name: 'Ceramic Wax',
      description: 'Κερί με κεραμικά συστατικά',
      price: 35,
      stock: 30,
      category: 'MAINTENANCE'
    },
    {
      id: 4,
      name: 'Paint Correction Kit',
      description: 'Κιτ διόρθωσης χρώματος για ερασιτέχνες',
      price: 120,
      stock: 15,
      category: 'DIY'
    },
    {
      id: 5,
      name: 'Wheel Ceramic Coating',
      description: 'Κεραμική επίστρωση για ζάντες',
      price: 40,
      stock: 25,
      category: 'SPECIALTY'
    }
  ] as Product[],
  
  appointments: [
    {
      id: 1,
      customerId: 1,
      customerName: 'Γιώργος Παπαδόπουλος',
      staffId: 1,
      staffName: 'Αλέξανδρος Νικολάου',
      service: 'Ceramic Coating AUTO Premium',
      date: '2023-06-15',
      time: '10:00',
      status: 'COMPLETED',
      type: 'AUTO',
      notes: 'Πελάτης ζήτησε επιπλέον προστασία για τη μάσκα'
    },
    {
      id: 2,
      customerId: 2,
      customerName: 'Μαρία Κωνσταντίνου',
      staffId: 2,
      staffName: 'Χριστίνα Δημητρίου',
      service: 'Ceramic Coating MOTO',
      date: '2023-06-18',
      time: '14:00',
      status: 'COMPLETED',
      type: 'MOTO'
    },
    {
      id: 3,
      customerId: 3,
      customerName: 'Δημήτρης Αντωνίου',
      staffId: 3,
      staffName: 'Κώστας Αναγνώστου',
      service: 'Ceramic Coating YACHT Premium',
      date: '2023-06-25',
      time: '09:00',
      status: 'SCHEDULED',
      type: 'YACHT',
      notes: 'Θα χρειαστεί μεταφορά στο σκάφος'
    },
    {
      id: 4,
      customerId: 4,
      customerName: 'Ελένη Γεωργίου',
      staffId: 2,
      staffName: 'Χριστίνα Δημητρίου',
      service: 'Ceramic Coating AUTO Standard',
      date: '2023-06-20',
      time: '11:30',
      status: 'COMPLETED',
      type: 'AUTO'
    },
    {
      id: 5,
      customerId: 5,
      customerName: 'Νίκος Καραμανλής',
      staffId: 1,
      staffName: 'Αλέξανδρος Νικολάου',
      service: 'Ceramic Coating AVIATION',
      date: '2023-07-05',
      time: '08:00',
      status: 'SCHEDULED',
      type: 'AVIATION',
      notes: 'Θα γίνει στο υπόστεγο του πελάτη'
    },
    {
      id: 6,
      customerId: 1,
      customerName: 'Γιώργος Παπαδόπουλος',
      staffId: 1,
      staffName: 'Αλέξανδρος Νικολάου',
      service: 'Ceramic Coating AUTO Standard',
      date: '2023-07-12',
      time: '13:00',
      status: 'SCHEDULED',
      type: 'AUTO'
    }
  ] as Appointment[],
  
  sales: [
    {
      id: 1,
      customerId: 1,
      customerName: 'Γιώργος Παπαδόπουλος',
      items: [
        {
          type: 'SERVICE',
          name: 'Ceramic Coating AUTO Premium',
          price: 650,
          quantity: 1
        },
        {
          type: 'PRODUCT',
          name: 'Ceramic Spray Maintenance',
          price: 25,
          quantity: 1
        }
      ],
      total: 675,
      date: '2023-06-15',
      paymentMethod: 'CARD'
    },
    {
      id: 2,
      customerId: 2,
      customerName: 'Μαρία Κωνσταντίνου',
      items: [
        {
          type: 'SERVICE',
          name: 'Ceramic Coating MOTO',
          price: 250,
          quantity: 1
        }
      ],
      total: 250,
      date: '2023-06-18',
      paymentMethod: 'CASH'
    },
    {
      id: 3,
      customerId: 4,
      customerName: 'Ελένη Γεωργίου',
      items: [
        {
          type: 'SERVICE',
          name: 'Ceramic Coating AUTO Standard',
          price: 350,
          quantity: 1
        },
        {
          type: 'PRODUCT',
          name: 'Premium Microfiber Towel',
          price: 12,
          quantity: 2
        },
        {
          type: 'PRODUCT',
          name: 'Ceramic Spray Maintenance',
          price: 25,
          quantity: 1
        }
      ],
      total: 399,
      date: '2023-06-20',
      paymentMethod: 'CARD'
    },
    {
      id: 4,
      customerId: 0,
      customerName: 'Πελάτης Λιανικής',
      items: [
        {
          type: 'PRODUCT',
          name: 'Paint Correction Kit',
          price: 120,
          quantity: 1
        },
        {
          type: 'PRODUCT',
          name: 'Ceramic Wax',
          price: 35,
          quantity: 1
        }
      ],
      total: 155,
      date: '2023-06-22',
      paymentMethod: 'CASH'
    }
  ] as Sale[]
};

// Generate monthly sales data for chart
export const getMonthlySalesData = (): SalesData[] => {
  const months = ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 
                 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'];
  
  return months.map((month, index) => {
    // Simulate increasing trend with some randomness
    const base = 15000 + (index * 2000);
    const randomFactor = Math.random() * 5000 - 2500;
    return {
      month: month,
      sales: Math.round(base + randomFactor)
    };
  });
};

// Generate weekly appointments data for chart
export const getWeeklyAppointmentsData = (): AppointmentsData[] => {
  const days = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'];
  
  return days.map(day => {
    // Most appointments on weekdays, fewer on weekends
    let base = 5;
    if (day === 'Σάββατο') base = 3;
    if (day === 'Κυριακή') base = 0;
    
    const randomFactor = Math.floor(Math.random() * 3);
    return {
      day: day,
      appointments: base + randomFactor
    };
  });
};