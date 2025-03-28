import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { TwilioConfig } from '@/utils/notification';

interface NotificationContextType {
  twilioConfig: TwilioConfig | null;
  setSmsConfig: (config: TwilioConfig) => void;
  clearSmsConfig: () => void;
  isSmsConfigured: boolean;
}

const defaultContext: NotificationContextType = {
  twilioConfig: null,
  setSmsConfig: () => {},
  clearSmsConfig: () => {},
  isSmsConfigured: false,
};

export const NotificationContext = createContext<NotificationContextType>(defaultContext);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [twilioConfig, setTwilioConfig] = useState<TwilioConfig | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Check if we're on client-side to use localStorage
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load Twilio config on initial render
  useEffect(() => {
    if (isClient) {
      try {
        // Try to get from localStorage
        const savedConfig = localStorage.getItem('twilioConfig');
        if (savedConfig) {
          setTwilioConfig(JSON.parse(savedConfig));
        }
      } catch (error) {
        console.error('Error loading notification settings from localStorage:', error);
      }
    }
  }, [isClient]);

  const setSmsConfig = (config: TwilioConfig) => {
    setTwilioConfig(config);
    
    // Save to localStorage for persistence
    if (isClient) {
      try {
        localStorage.setItem('twilioConfig', JSON.stringify(config));
      } catch (error) {
        console.error('Error saving notification settings to localStorage:', error);
      }
    }
  };

  const clearSmsConfig = () => {
    setTwilioConfig(null);
    
    // Clear from localStorage
    if (isClient) {
      try {
        localStorage.removeItem('twilioConfig');
      } catch (error) {
        console.error('Error clearing notification settings from localStorage:', error);
      }
    }
  };

  const isSmsConfigured = !!twilioConfig && 
    !!twilioConfig.accountSid && 
    !!twilioConfig.authToken && 
    !!twilioConfig.phoneNumber;

  const value = {
    twilioConfig,
    setSmsConfig,
    clearSmsConfig,
    isSmsConfigured,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);