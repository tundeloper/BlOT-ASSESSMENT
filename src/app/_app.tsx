import type { AppProps } from 'next/app'
import { ThemeProvider } from '@/context/ThemeContext'

export default function App({ Component, pageProps }: AppProps) {
  console.log("App component rendered");
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}