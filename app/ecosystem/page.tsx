"use client"

import { Sparkles } from "@/components/sparkles"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Brain } from "lucide-react"

export default function EcosystemPage() {
  const products = [
    {
      name: "TOKEN EYE Scanner",
      description: "Advanced AML scanner for analyzing tokens, wallets, and transactions",
      status: "Active",
      color: "from-blue-500 to-purple-500",
      icon: "🔍",
    },
    {
      name: "AI Assistant",
      description: "Intelligent AI-powered assistant for crypto analysis and trading insights",
      status: "Active",
      color: "from-emerald-500 to-teal-500",
      icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />, // Changed icon from emoji to Brain icon
    },
    {
      name: "Secure Wallet",
      description: "Maximum security wallet with multi-signature and cold storage",
      status: "In Development",
      color: "from-green-500 to-blue-500",
      icon: "🔒",
    },
    {
      name: "DEX Platform",
      description: "Decentralized exchange with automated market makers",
      status: "In Development",
      color: "from-purple-500 to-pink-500",
      icon: "⚡",
    },
    {
      name: "Native Token",
      description: "Ecosystem's own cryptocurrency with unique capabilities",
      status: "Planned",
      color: "from-yellow-500 to-orange-500",
      icon: "₿",
    },
    {
      name: "Analytics Dashboard",
      description: "Comprehensive real-time market and portfolio analytics",
      status: "Planned",
      color: "from-cyan-500 to-blue-500",
      icon: "📊",
    },
    {
      name: "Mobile App",
      description: "Mobile application for accessing all ecosystem products",
      status: "Planned",
      color: "from-indigo-500 to-purple-500",
      icon: "📱",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "In Development":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Planned":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <Sparkles />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-4 sm:py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6">
              Product Ecosystem
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-2">
              Complete ecosystem of innovative products for secure and efficient cryptocurrency operations
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm border rounded-2xl p-4 sm:p-6 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${product.color} rounded-full flex items-center justify-center mr-3 sm:mr-4`}
                  >
                    {typeof product.icon === "string" ? (
                      <span className="text-white font-bold text-lg sm:text-xl">{product.icon}</span>
                    ) : (
                      <span className="text-white">{product.icon}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{product.name}</h3>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}
                    >
                      {product.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{product.description}</p>
              </div>
            ))}
          </div>

          {/* Roadmap Section */}
          <div className="bg-gradient-to-r from-slate-800/30 to-slate-900/30 border-slate-700/50 backdrop-blur-sm border rounded-2xl p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8 text-center">
              Development Roadmap
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full mr-3 sm:mr-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="text-base sm:text-lg font-semibold text-white">Q1 2024 - TOKEN EYE Scanner</h4>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Launch of advanced AML scanner with multi-network support
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full mr-3 sm:mr-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="text-base sm:text-lg font-semibold text-white">Q1 2024 - AI Assistant</h4>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Launch of intelligent AI-powered assistant for crypto analysis and trading insights
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full mr-3 sm:mr-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="text-base sm:text-lg font-semibold text-white">Q2 2024 - Secure Wallet</h4>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Release of maximum security wallet with multi-signature
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full mr-3 sm:mr-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="text-base sm:text-lg font-semibold text-white">Q3 2024 - DEX Platform</h4>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Launch of decentralized exchange with AMM protocol
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full mr-3 sm:mr-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="text-base sm:text-lg font-semibold text-white">Q4 2024 - Native Token</h4>
                  <p className="text-gray-300 text-sm sm:text-base">Release of ecosystem's native token</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-8 sm:mt-12 md:mt-16">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Join the Future of DeFi</h3>
            <p className="text-gray-300 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-2">
              Become part of an innovative ecosystem that will change the approach to working with cryptocurrencies
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
