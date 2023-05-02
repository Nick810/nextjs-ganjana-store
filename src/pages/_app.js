import '@/styles/globals.css'
import { AppContextProvider } from '../context';
import Layout from '../components/layout';
import TagManager from 'react-gtm-module';
import "@fontsource/jost/700.css";
import "@fontsource/jost/500.css";
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-KZG96FS' })
  }, [])
  return (
    <AppContextProvider>
      <Layout data-theme="black">
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  )
}
