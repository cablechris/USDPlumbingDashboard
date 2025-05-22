import type { AppProps } from 'next/app';
import '@/styles/globals.css';

/**
 * Main App component that wraps all pages
 */
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp; 