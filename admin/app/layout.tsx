import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/themeprovider'
import clsx from 'clsx'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Acquaso',
  description: 'An acquaso ecommerce admin portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className,"dark:bg-background overflow-hidden")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system" 
        >
          {children}
          <Toaster />
        </ThemeProvider>

      </body>
      {/* <body>{children}</body> */}
    </html>
  )
}
