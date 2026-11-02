"use client"

import { Sparkles } from "@/components/sparkles"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <Sparkles />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-4 sm:py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 sm:mb-6">
            <Link href="/">
              <Button
                variant="outline"
                className="bg-slate-800/50 border-slate-600/50 text-white hover:bg-slate-700/50 hover:border-slate-500/50 backdrop-blur-sm"
              >
                ← Back to Home
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
              About Our Platform
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-2 sm:px-4">
              Revolutionary ecosystem for secure cryptocurrency operations
            </p>
          </div>

          {/* Main Content */}
          <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {/* Crypto Token Section */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 sm:mb-4 md:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
                  <span className="text-white font-bold text-lg sm:text-xl">₿</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Our Own Cryptocurrency</h2>
              </div>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                We are developing our own token that will become the foundation of our ecosystem. Our cryptocurrency
                will provide fast and secure transactions, offer exclusive opportunities to holders, and serve as a
                governance mechanism for the decentralized platform.
              </p>
            </div>

            {/* Secure Wallet Section */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 sm:mb-4 md:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
                  <span className="text-white font-bold text-lg sm:text-xl">🔒</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Maximum Security Wallet</h2>
              </div>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                Our wallet uses advanced encryption technologies and multi-layered security systems. Multi-signature,
                cold storage, biometric authentication, and advanced protection algorithms ensure maximum security for
                your assets.
              </p>
            </div>

            {/* DEX Section */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 sm:mb-4 md:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
                  <span className="text-white font-bold text-lg sm:text-xl">⚡</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Decentralized Exchange</h2>
              </div>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                Fully decentralized exchange with automated market makers (AMM), providing instant swaps without
                intermediaries. Low fees, high liquidity, and complete control over your funds - the future of
                cryptocurrency trading is here.
              </p>
            </div>

            {/* Vision Section */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 md:mb-6">Our Mission</h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                Create a secure, transparent, and accessible ecosystem for all cryptocurrency market participants. We
                strive to combine innovative blockchain technologies with maximum security and ease of use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
