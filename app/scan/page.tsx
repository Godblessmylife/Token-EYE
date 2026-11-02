import type { Metadata } from "next"
import ScanContent from "@/components/scan-content"
import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/sparkles"

export const metadata: Metadata = {
  title: "AML Security Scanner - Token Eye | Blockchain Risk Assessment",
  description:
    "Instant AML screening for wallets, tokens, and transactions. Get risk scores, trust levels, and detailed analysis across ETH, BNB, Polygon, Avalanche, Cardano, Arbitrum, and Optimism networks in under 4 seconds.",
  keywords: [
    "AML scanner",
    "blockchain security",
    "cryptocurrency compliance",
    "wallet risk assessment",
    "token security scan",
    "transaction analysis",
    "crypto AML",
    "blockchain compliance",
    "risk scoring",
    "trust verification",
    "ethereum security",
    "polygon scanner",
    "BSC compliance",
    "avalanche security",
    "cardano analysis",
    "arbitrum scanner",
    "optimism security",
  ],
  openGraph: {
    title: "AML Security Scanner - Token Eye | Blockchain Risk Assessment",
    description:
      "Instant AML screening for wallets, tokens, and transactions. Get risk scores, trust levels, and detailed analysis across multiple blockchain networks in under 4 seconds.",
    url: "https://tokeneye.ai/scan",
    type: "website",
    images: [
      {
        url: "/assets/blockchain-security.png",
        width: 1200,
        height: 630,
        alt: "Token Eye AML Security Scanner Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AML Security Scanner - Token Eye",
    description:
      "Instant blockchain risk assessment across 7 networks. Get comprehensive security analysis in under 4 seconds.",
    images: ["/assets/blockchain-security.png"],
  },
  alternates: {
    canonical: "https://tokeneye.ai/scan",
  },
}

export default function ScanPage() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <ScanContent />
      </div>
    </main>
  )
}
