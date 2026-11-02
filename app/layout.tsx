import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import PWAInstallPrompt from "@/components/pwa-install-prompt"

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
        url: "/favicon.jpg",
        width: 1200,
        height: 630,
        alt: "Token Eye - Blockchain Security Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Token Eye - Blockchain Security Solutions",
    description:
      "Leading provider of AI-powered blockchain security solutions. Protect your digital assets with advanced threat detection and compliance monitoring.",
    images: ["/favicon.jpg"],
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
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
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
