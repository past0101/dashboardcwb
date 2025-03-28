import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/context/ThemeContext';
import { DataProvider } from '@/context/DataContext';
import { NotificationProvider } from '@/context/NotificationContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <DataProvider>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </DataProvider>
    </ThemeProvider>
  );
}