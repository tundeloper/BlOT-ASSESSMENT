import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  console.log("App component rendered");
  return (
      <Component {...pageProps} />
  );
}