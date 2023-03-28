import '../styles/css-reset.css';
import '@/styles/globals.css'
import { AppContextProvider } from '../Context';
import Layout from '../components/layout';

export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  )
}
