import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './provider'
import NavBar from '@/app/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextJS_GitHub',
  description: 'Using NextJS to consume GitHub API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*Wrapper del Provider para la autenticacion de la aplicacion completa y poder pasar la sesion a las vistas */}
        <NextAuthProvider>
          <NavBar/>
          <div>{children}</div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
