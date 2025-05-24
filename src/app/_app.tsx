import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@/context/ThemeContext'
// import "../../global.css";
import { Inter } from 'next/font/google';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}