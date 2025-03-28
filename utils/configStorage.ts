// This file is a client-side abstraction for Twilio configuration
// It interfaces with API endpoints rather than directly accessing the file system
import { TwilioConfig } from './notification';

// Helper function to check if we're running in a browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Load Twilio configuration via API
 * @returns The Twilio configuration object or null if not found
 */
export const loadTwilioConfig = async (): Promise<TwilioConfig | null> => {
  if (!isBrowser) {
    return null;
  }
  
  try {
    const response = await fetch('/api/get-twilio-config');
    if (!response.ok) {
      console.error('Error loading Twilio config:', response.statusText);
      return null;
    }
    
    const data = await response.json();
    return data.config || null;
  } catch (error) {
    console.error('Error loading Twilio config:', error);
    return null;
  }
};

/**
 * Save Twilio configuration via API
 * @param config The Twilio configuration to save
 * @returns True if successful, false otherwise
 */
export const saveTwilioConfig = async (config: TwilioConfig): Promise<boolean> => {
  if (!isBrowser) {
    return false;
  }
  
  try {
    const response = await fetch('/api/save-twilio-config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ config }),
    });
    
    if (!response.ok) {
      console.error('Error saving Twilio config:', response.statusText);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error saving Twilio config:', error);
    return false;
  }
};

/**
 * Delete Twilio configuration via API
 * @returns True if successful, false otherwise
 */
export const deleteTwilioConfig = async (): Promise<boolean> => {
  if (!isBrowser) {
    return false;
  }
  
  try {
    const response = await fetch('/api/clear-twilio-config', {
      method: 'POST',
    });
    
    if (!response.ok) {
      console.error('Error deleting Twilio config:', response.statusText);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting Twilio config:', error);
    return false;
  }
};