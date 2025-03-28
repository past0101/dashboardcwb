import { Appointment } from '@/lib/types';
import { sendAppointmentNotification } from '@/lib/api/twilio';

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}

/**
 * Sends an SMS notification to a customer about their appointment
 * 
 * @param appointment The appointment details
 * @param phoneNumber The customer's phone number
 * @param message The message to send
 * @param config The Twilio configuration
 * @returns A Promise that resolves when the message is sent
 */
export const sendAppointmentSMS = async (
  appointment: Appointment,
  phoneNumber: string,
  message: string,
  config: TwilioConfig
): Promise<{ success: boolean; message: string }> => {
  // Using the API wrapper to send the SMS
  return sendAppointmentNotification(appointment, phoneNumber, message, config);
};

/**
 * Generates a reminder message for an appointment
 * 
 * @param appointment The appointment details
 * @returns The reminder message
 */
export const generateReminderMessage = (appointment: Appointment): string => {
  return `Υπενθύμιση: Έχετε ραντεβού για ${appointment.service} στις ${appointment.date} στις ${appointment.time}. Τηλέφωνο επικοινωνίας: 210-1234567`;
};

/**
 * Generates a confirmation message for an appointment
 * 
 * @param appointment The appointment details
 * @returns The confirmation message
 */
export const generateConfirmationMessage = (appointment: Appointment): string => {
  return `Το ραντεβού σας για ${appointment.service} στις ${appointment.date} στις ${appointment.time} επιβεβαιώθηκε. Σας ευχαριστούμε!`;
};

/**
 * Generates a cancellation message for an appointment
 * 
 * @param appointment The appointment details
 * @returns The cancellation message
 */
export const generateCancellationMessage = (appointment: Appointment): string => {
  return `Το ραντεβού σας για ${appointment.service} στις ${appointment.date} στις ${appointment.time} ακυρώθηκε. Για επαναπρογραμματισμό καλέστε στο 210-1234567.`;
};