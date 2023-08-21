import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextJS_GitHub',
  description: 'Using NextJS to consume GitHub API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div>{children}</div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
