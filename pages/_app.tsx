import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { lightTheme } from '../themes';

import '../styles/globals.css'
import { CssBaseline } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline>
        <Component {...pageProps} />
      </CssBaseline>
    </ThemeProvider>
  )
}

export default MyApp
