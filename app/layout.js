import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard | MRC',
  description: 'Flood and Drought Monitoring Dashboard',
  icons: {
    icon: 'assets/images/logos/MRC-logo-white.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
