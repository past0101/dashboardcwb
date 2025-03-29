import React from "react";
import { useData } from "@/context/DataContext";
import { CalendarIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const UpcomingAppointments: React.FC = () => {
  const {
    appointments,
  }: {
    appointments: {
      id: string;
      status: string;
      date: string;
      time: string;
      service: string;
      customerName: string;
      type: string;
    }[];
  } = useData();

  // Get only upcoming appointments (status: SCHEDULED)
  const upcomingAppointments = appointments
    .filter((appointment) => appointment.status === "SCHEDULED")
    .sort((a, b) => {
      // Sort by date and time
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5); // Limit to 5 appointments

  // Function to format date to Greek format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}`;
  };

  // Function to get the service type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "AUTO":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            ΑΥΤΟΚΙΝΗΤΟ
          </span>
        );
      case "MOTO":
        return (
          <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
            ΜΗΧΑΝΗ
          </span>
        );
      case "YACHT":
        return (
          <span className="bg-teal-100 text-teal-800 text-xs px-2.5 py-0.5 rounded dark:bg-teal-900 dark:text-teal-300">
            ΣΚΑΦΟΣ
          </span>
        );
      case "AVIATION":
        return (
          <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded dark:bg-amber-900 dark:text-amber-300">
            ΑΕΡΟΣΚΑΦΟΣ
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Προσεχή Ραντεβού
        </h3>
      </div>

      <div className="space-y-3">
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                  <CalendarIcon className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {appointment.service}
                  </p>
                  <div className="flex items-center mt-1 space-x-2">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <UserIcon className="h-4 w-4 mr-1" />
                      {appointment.customerName}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {appointment.time}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(appointment.date)}
                </div>
                <div className="mt-1">{getTypeIcon(appointment.type)}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            Δεν υπάρχουν προσεχή ραντεβού
          </p>
        )}
      </div>

      {upcomingAppointments.length > 0 && (
        <div className="mt-4 text-center">
          <button className="btn btn-secondary text-sm">
            <Link href="/appointments">Προβολή όλων των ραντεβού</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
