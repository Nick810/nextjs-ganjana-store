import '@/styles/globals.css'
import { AppContextProvider } from '../context';
import Layout from '../components/layout';
import "@fontsource/jost/700.css";
import "@fontsource/jost/500.css";

export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Layout data-theme="black">
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  )
}
