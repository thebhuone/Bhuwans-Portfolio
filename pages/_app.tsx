import type { AppProps } from 'next/app';
import '@xterm/xterm/css/xterm.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
