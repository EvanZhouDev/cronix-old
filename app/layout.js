import './globals.css'
import { Fira_Code } from 'next/font/google'

import Titlebar from './components/titlebar'
import Footer from './components/footer'

const firacode = Fira_Code({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Cronix Timer',
  description: 'A next-generation cubing timer.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={firacode.className}>
      <body>
        <Titlebar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
