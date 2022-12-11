import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'
import{ PayPalScriptProvider } from '@paypal/react-paypal-js'
import { SWRConfig } from  'swr';
import { lightTheme } from '../themes';
import { UIProvider, CartProvider, AuthProvider } from '../context';

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{
        fetcher: (...args:[key: string]) => fetch(...args).then(res => res.json())
      }}
    >
      <AuthProvider>
        <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''}}>
          <CartProvider>
            <UIProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline>
                  <Component {...pageProps} />
                </CssBaseline>
              </ThemeProvider>
            </UIProvider>
          </CartProvider>
        </PayPalScriptProvider>
      </AuthProvider>
    </SWRConfig>
  )
}

export default MyApp
