import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "TruekLand Admin - Administrador de Posts",
    template: "%s | TruekLand Admin"
  },
  description: "Sistema de administración de publicaciones para TruekLand. Gestiona y administra contenido de manera eficiente.",
  keywords: ["administración", "posts", "TruekLand", "gestión de contenido"],
  authors: [{ name: "TruekLand Team" }],
  creator: "TruekLand",
  publisher: "TruekLand",
  robots: {
    index: false, // Admin panel should not be indexed
    follow: false,
    nocache: true,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-gray-900">Administrador de Posts</h1>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
