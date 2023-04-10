import './globals.css'
import { Fira_Code } from 'next/font/google'

import Titlebar from './components/marginals/titlebar'
import Footer from './components/marginals/footer'

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
