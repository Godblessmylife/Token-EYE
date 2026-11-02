import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Orbitron } from "next/font/google"
import "./globals.css"
import PWAInstallPrompt from "@/components/pwa-install-prompt"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Token Eye - Blockchain Security Solutions",
  description:
    "Leading provider of AI-powered blockchain security solutions. Protect your digital assets with advanced threat detection and compliance monitoring.",
  keywords: ["blockchain security", "cryptocurrency", "AI security", "token monitoring", "compliance"],
  authors: [{ name: "Token Eye Team" }],
  creator: "Token Eye",
  publisher: "Token Eye",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tokeneye.ai/",
    title: "Token Eye - Blockchain Security Solutions",
    description:
      "Leading provider of AI-powered blockchain security solutions. Protect your digital assets with advanced threat detection and compliance monitoring.",
    siteName: "Token Eye",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Token Eye - AI-Powered Blockchain Security Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Token Eye - Blockchain Security Solutions",
    description:
      "Leading provider of AI-powered blockchain security solutions. Protect your digital assets with advanced threat detection and compliance monitoring.",
    images: ["/og-image.jpg"],
    creator: "@tokeneye",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Token Eye",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        <style>{`
html {
  font-family: 'Inter', sans-serif;
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'Orbitron', monospace;
  --font-inter: ${inter.variable};
  --font-orbitron: ${orbitron.variable};
}
        `}</style>
        <meta name="theme-color" content="#7c3aed" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Token Eye" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.jpg" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.jpg" />
      </head>
      <body>
        {children}
        <PWAInstallPrompt />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                    })
                    .catch(function(registrationError) {
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
