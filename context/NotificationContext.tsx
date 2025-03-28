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

  // Try to load saved configs from localStorage on initial render
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('twilioConfig');
      if (savedConfig) {
        setTwilioConfig(JSON.parse(savedConfig));
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  }, []);

  const setSmsConfig = (config: TwilioConfig) => {
    setTwilioConfig(config);
    
    // Save to localStorage for persistence
    try {
      localStorage.setItem('twilioConfig', JSON.stringify(config));
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  const clearSmsConfig = () => {
    setTwilioConfig(null);
    localStorage.removeItem('twilioConfig');
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