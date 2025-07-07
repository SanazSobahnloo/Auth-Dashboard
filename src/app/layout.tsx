import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/context/AuthContext"
import "./globals.scss"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Authentication Flow - Modern Dashboard",
  description: "Secure authentication with modern responsive design and Iranian phone number validation",
  keywords: "authentication, dashboard, Iranian phone, responsive design",
  authors: [{ name: "Dashboard Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://randomuser.me" />
        <link rel="dns-prefetch" href="https://randomuser.me" />
      </head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
