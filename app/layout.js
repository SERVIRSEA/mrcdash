import { Inter } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard | MRC',
  description: 'Flood and Drought Monitoring Dashboard',
  icons: {
    icon: '/dash/assets/images/logos/MRC-logo-white.svg',
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
