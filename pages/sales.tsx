import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useData } from "@/context/DataContext";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  ReceiptRefundIcon,
  CurrencyEuroIcon,
  CalendarIcon,
  CreditCardIcon,
  BanknotesIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
} from "@heroicons/react/24/outline";
import { Sale } from "@/lib/types";

export default function Sales() {
  const {
    sales,
    customers,
  }: {
    sales: Sale[];
    customers: { id: string; name: string; phone: string }[];
  } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState<
    "all" | "today" | "week" | "month"
  >("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<
    "all" | "CASH" | "CARD" | "TRANSFER"
  >("all");
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Calculate date ranges for filtering
  const today = new Date().toISOString().split("T")[0];
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const weekStartStr = weekStart.toISOString().split("T")[0];

  const monthStart = new Date();
  monthStart.setMonth(monthStart.getMonth() - 1);
  const monthStartStr = monthStart.toISOString().split("T")[0];

  // Filter sales based on search term, date range, and payment method
  const filteredSales = sales.filter((sale: Sale) => {
    const matchesSearch =
      sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    let matchesDateRange = true;
    if (dateRangeFilter === "today") {
      matchesDateRange = sale.date === today;
    } else if (dateRangeFilter === "week") {
      matchesDateRange = sale.date >= weekStartStr;
    } else if (dateRangeFilter === "month") {
      matchesDateRange = sale.date >= monthStartStr;
    }

    const matchesPaymentMethod =
      paymentMethodFilter === "all" ||
      sale.paymentMethod === paymentMethodFilter;

    return matchesSearch && matchesDateRange && matchesPaymentMethod;
  });

  // Calculate total sales for the filtered list
  const totalSales = filteredSales.reduce(
    (total, sale) => total + sale.total,
    0
  );

  // Calculate sales by payment method
  const salesByPaymentMethod = {
    CASH: filteredSales
      .filter((sale) => sale.paymentMethod === "CASH")
      .reduce((total, sale) => total + sale.total, 0),
    CARD: filteredSales
      .filter((sale) => sale.paymentMethod === "CARD")
      .reduce((total, sale) => total + sale.total, 0),
    TRANSFER: filteredSales
      .filter((sale) => sale.paymentMethod === "TRANSFER")
      .reduce((total, sale) => total + sale.total, 0),
  };

  // Get payment method text and icon
  const getPaymentMethodInfo = (method: string) => {
    switch (method) {
      case "CASH":
        return {
          text: "Μετρητά",
          icon: <BanknotesIcon className="h-5 w-5 text-gray-400" />,
        };
      case "CARD":
        return {
          text: "Κάρτα",
          icon: <CreditCardIcon className="h-5 w-5 text-gray-400" />,
        };
      case "TRANSFER":
        return {
          text: "Τραπεζική Μεταφορά",
          icon: <ArrowPathIcon className="h-5 w-5 text-gray-400" />,
        };
      default:
        return {
          text: method,
          icon: <CurrencyEuroIcon className="h-5 w-5 text-gray-400" />,
        };
    }
  };

  // Toggle sale details
  const toggleSaleDetails = (saleId: number) => {
    if (showDetails === saleId) {
      setShowDetails(null);
    } else {
      setShowDetails(saleId);
    }
  };

  return (
    <Layout>
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Διαχείριση Πωλήσεων
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Προβολή και διαχείριση πωλήσεων, ανάλυση εσόδων και τάσεις
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Συνολικές Πωλήσεις
              </p>
              <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">
                {totalSales.toFixed(2)} €
              </p>
            </div>
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-md">
              <CurrencyEuroIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <ArrowSmallUpIcon className="h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">+14.5%</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">
              από τον προηγούμενο μήνα
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Μετρητά
              </p>
              <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">
                {salesByPaymentMethod.CASH.toFixed(2)} €
              </p>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-md">
              <BanknotesIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <ArrowSmallUpIcon className="h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">+7.2%</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">
              από τον προηγούμενο μήνα
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Κάρτα</p>
              <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">
                {salesByPaymentMethod.CARD.toFixed(2)} €
              </p>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md">
              <CreditCardIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <ArrowSmallUpIcon className="h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">+22.8%</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">
              από τον προηγούμενο μήνα
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Τραπεζική Μεταφορά
              </p>
              <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">
                {salesByPaymentMethod.TRANSFER.toFixed(2)} €
              </p>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-md">
              <ArrowPathIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <ArrowSmallDownIcon className="h-4 w-4 text-red-500" />
            <span className="text-red-500 font-medium">-2.3%</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">
              από τον προηγούμενο μήνα
            </span>
          </div>
        </div>
      </div>

      {/* Search and filter section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-2/4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:text-white sm:text-sm"
              placeholder="Αναζήτηση πωλήσεων..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <select
            id="date-filter"
            name="date-filter"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={(e) =>
              setDateRangeFilter(
                e.target.value as "all" | "today" | "week" | "month"
              )
            }
            value={dateRangeFilter}
          >
            <option value="all">Όλες οι ημερομηνίες</option>
            <option value="today">Σήμερα</option>
            <option value="week">Τελευταία εβδομάδα</option>
            <option value="month">Τελευταίος μήνας</option>
          </select>
        </div>
        <div className="w-full md:w-1/4">
          <select
            id="payment-filter"
            name="payment-filter"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={(e) =>
              setPaymentMethodFilter(
                e.target.value as "all" | "CASH" | "CARD" | "TRANSFER"
              )
            }
            value={paymentMethodFilter}
          >
            <option value="all">Όλοι οι τρόποι πληρωμής</option>
            <option value="CASH">Μετρητά</option>
            <option value="CARD">Κάρτα</option>
            <option value="TRANSFER">Τραπεζική Μεταφορά</option>
          </select>
        </div>
      </div>

      {/* Add sale button */}
      <div className="mb-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600"
          onClick={() => setShowAddModal(true)}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Νέα Πώληση
        </button>
      </div>

      {/* Sales list */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Αριθμός
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Πελάτης
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Ημερομηνία
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Τρόπος Πληρωμής
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Σύνολο
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Ενέργειες
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSales.length > 0 ? (
                filteredSales.map((sale) => (
                  <React.Fragment key={sale.id}>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        #{sale.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {sale.customerName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          ID: {sale.customerId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <CalendarIcon className="h-5 w-5 mr-1 text-gray-400" />
                          {sale.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900 dark:text-white">
                          {getPaymentMethodInfo(sale.paymentMethod).icon}
                          <span className="ml-1">
                            {getPaymentMethodInfo(sale.paymentMethod).text}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {sale.total.toFixed(2)} €
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {sale.items.length} προϊόντα
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            className="inline-flex items-center text-gray-400 hover:text-primary-500 dark:hover:text-primary-300"
                            onClick={() => toggleSaleDetails(sale.id)}
                          >
                            <EyeIcon className="h-5 w-5 mr-1" />
                            <span className="sr-only md:not-sr-only md:inline-block">
                              {showDetails === sale.id ? "Απόκρυψη" : "Προβολή"}
                            </span>
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center text-gray-400 hover:text-primary-500 dark:hover:text-primary-300"
                          >
                            <ReceiptRefundIcon className="h-5 w-5 mr-1" />
                            <span className="sr-only md:not-sr-only md:inline-block">
                              Τιμολόγιο
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {showDetails === sale.id && (
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Στοιχεία Πώλησης
                          </div>
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                                >
                                  Προϊόν/Υπηρεσία
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                                >
                                  Τύπος
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                                >
                                  Τιμή
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                                >
                                  Ποσότητα
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                                >
                                  Σύνολο
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                              {sale.items.map((item, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {item.name}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    <span
                                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        item.type === "SERVICE"
                                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      }`}
                                    >
                                      {item.type === "SERVICE"
                                        ? "Υπηρεσία"
                                        : "Προϊόν"}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {item.price.toFixed(2)} €
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {item.quantity}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                    {(item.price * item.quantity).toFixed(2)} €
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td
                                  colSpan={4}
                                  className="px-4 py-2 text-sm font-medium text-right text-gray-900 dark:text-white"
                                >
                                  Συνολικό Ποσό:
                                </td>
                                <td className="px-4 py-2 text-sm font-bold text-gray-900 dark:text-white">
                                  {sale.total.toFixed(2)} €
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    Δεν βρέθηκαν πωλήσεις με τα επιλεγμένα κριτήρια.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add sale modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Προσθήκη Νέας Πώλησης
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                onClick={() => setShowAddModal(false)}
              >
                <span className="sr-only">Κλείσιμο</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="customer"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Πελάτης *
                </label>
                <select
                  id="customer"
                  name="customer"
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Επιλέξτε πελάτη</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} - {customer.phone}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Ημερομηνία *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  defaultValue={today}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="payment-method"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Τρόπος Πληρωμής *
                </label>
                <select
                  id="payment-method"
                  name="payment-method"
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="CASH">Μετρητά</option>
                  <option value="CARD">Κάρτα</option>
                  <option value="TRANSFER">Τραπεζική Μεταφορά</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Προϊόντα/Υπηρεσίες *
                  </label>
                  <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 focus:outline-none"
                  >
                    <PlusIcon className="-ml-0.5 mr-1 h-4 w-4" />
                    Προσθήκη
                  </button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md space-y-3">
                  {/* Item 1 */}
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-5">
                      <select className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white">
                        <option value="">Επιλέξτε προϊόν/υπηρεσία</option>
                        <option value="1">Ceramic Pro 9H</option>
                        <option value="2">Light/Bronze Package</option>
                        <option value="3">Gold Package</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <div className="relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">€</span>
                        </div>
                        <input
                          type="number"
                          defaultValue="0.00"
                          step="0.01"
                          min="0"
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-3 sm:text-sm border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        defaultValue="1"
                        min="1"
                        className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        placeholder="Ποσότητα"
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center h-full">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          0.00 €
                        </span>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Συνολικό Ποσό:
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  0.00 €
                </div>
              </div>

              <div className="mt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                  onClick={() => setShowAddModal(false)}
                >
                  Ακύρωση
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  Αποθήκευση
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
