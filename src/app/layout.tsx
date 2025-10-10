// src/app/layout.tsx

import type { Metadata } from "next"
// Kita asumsikan Anda menggunakan font Inter atau bisa diganti sesuai selera
import { Inter } from "next/font/google" 
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider" // Import ThemeProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portofolio Rommel",
  description: "Portofolio Developer Next.js & shadcn",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class" // Mode gelap/terang ditandai dengan class 'dark'
          defaultTheme="system" // Default ke mode system/perangkat
          enableSystem // Aktifkan fitur system theme
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}