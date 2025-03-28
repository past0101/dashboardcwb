import { Appointment } from '../types';
import { TwilioConfig } from '@/utils/notification';

/**
 * Server-side helper to send SMS messages through the API
 * 
 * @param phoneNumber The recipient's phone number
 * @param message The message content to send
 * @param config The Twilio configuration details
 * @returns A Promise resolving to the API response
 */
export const sendSMS = async (
  phoneNumber: string,
  message: string,
  config: TwilioConfig
): Promise<{ success: boolean; message: string; messageId?: string }> => {
  try {
    const response = await fetch('/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
        message,
        config,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Σφάλμα αποστολής SMS');
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error sending SMS:', error);
    return {
      success: false,
      message: error.message || 'Σφάλμα αποστολής SMS',
    };
  }
};

/**
 * Sends an appointment notification to a customer
 * 
 * @param appointment The appointment details
 * @param phoneNumber The customer's phone number
 * @param message The message to send
 * @param config The Twilio configuration
 * @returns A Promise that resolves when the message is sent
 */
export const sendAppointmentNotification = async (
  appointment: Appointment,
  phoneNumber: string,
  message: string,
  config: TwilioConfig
): Promise<{ success: boolean; message: string }> => {
  try {
    const result = await sendSMS(phoneNumber, message, config);
    return result;
  } catch (error: any) {
    console.error('Error sending appointment notification:', error);
    return {
      success: false,
      message: `Σφάλμα αποστολής ειδοποίησης: ${error.message || 'Άγνωστο σφάλμα'}`,
    };
  }
};