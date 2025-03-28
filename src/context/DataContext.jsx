import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialData } from '../utils/mockData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(initialData.appointments);
  const [customers, setCustomers] = useState(initialData.customers);
  const [staff, setStaff] = useState(initialData.staff);
  const [services, setServices] = useState(initialData.services);
  const [products, setProducts] = useState(initialData.products);
  const [sales, setSales] = useState(initialData.sales);
  const [invoices, setInvoices] = useState(initialData.invoices);
  const [reviews, setReviews] = useState(initialData.reviews);
  const [settings, setSettings] = useState(initialData.settings);

  // CRUD operations for appointments
  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setAppointments([...appointments, newAppointment]);
  };

  const updateAppointment = (id, updatedAppointment) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, ...updatedAppointment } : app
    ));
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(app => app.id !== id));
  };

  // CRUD operations for customers
  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setCustomers([...customers, newCustomer]);
  };

  const updateCustomer = (id, updatedCustomer) => {
    setCustomers(customers.map(customer => 
      customer.id === id ? { ...customer, ...updatedCustomer } : customer
    ));
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  // CRUD operations for staff
  const addStaffMember = (staffMember) => {
    const newStaffMember = {
      ...staffMember,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setStaff([...staff, newStaffMember]);
  };

  const updateStaffMember = (id, updatedStaffMember) => {
    setStaff(staff.map(member => 
      member.id === id ? { ...member, ...updatedStaffMember } : member
    ));
  };

  const deleteStaffMember = (id) => {
    setStaff(staff.filter(member => member.id !== id));
  };

  // CRUD operations for services
  const addService = (service) => {
    const newService = {
      ...service,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setServices([...services, newService]);
  };

  const updateService = (id, updatedService) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, ...updatedService } : service
    ));
  };

  const deleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  // CRUD operations for products
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // CRUD operations for sales
  const addSale = (sale) => {
    const newSale = {
      ...sale,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setSales([...sales, newSale]);
  };

  // CRUD operations for invoices
  const addInvoice = (invoice) => {
    const newInvoice = {
      ...invoice,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setInvoices([...invoices, newInvoice]);
  };

  const updateInvoice = (id, updatedInvoice) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === id ? { ...invoice, ...updatedInvoice } : invoice
    ));
  };

  // Get statistics
  const getStatistics = () => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();
    
    const todayAppointments = appointments.filter(
      app => app.date >= startOfDay && app.date <= endOfDay
    );
    
    const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
    
    const serviceUsage = appointments.reduce((acc, app) => {
      if (!acc[app.serviceId]) {
        acc[app.serviceId] = 0;
      }
      acc[app.serviceId]++;
      return acc;
    }, {});
    
    const topServices = Object.entries(serviceUsage)
      .map(([serviceId, count]) => ({
        service: services.find(s => s.id === serviceId) || { name: 'Unknown' },
        count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    return {
      todayAppointments,
      totalSales,
      topServices
    };
  };

  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };

  return (
    <DataContext.Provider value={{
      appointments,
      customers,
      staff,
      services,
      products,
      sales,
      invoices,
      reviews,
      settings,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      addStaffMember,
      updateStaffMember,
      deleteStaffMember,
      addService,
      updateService,
      deleteService,
      addProduct,
      updateProduct,
      deleteProduct,
      addSale,
      addInvoice,
      updateInvoice,
      getStatistics,
      updateSettings
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
