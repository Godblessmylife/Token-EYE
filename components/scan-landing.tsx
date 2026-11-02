"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Eye, AlertTriangle, CheckCircle, Clock, Users, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface ScanLandingProps {
  onStartScan: () => void
}

export default function ScanLanding({ onStartScan }: ScanLandingProps) {
  const valueBlocks = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Get comprehensive risk assessment in under 4 seconds",
      stats: "< 4s response time",
      image: "/assets/real-time-monitoring.png",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Multi-Chain Support",
      description: "Scan across 7 major blockchains including ETH, BNB, Polygon",
      stats: "7 networks supported",
      image: "/assets/multi-chain.png",
    },
    {
      icon: <Eye className="w-8 h-8 text-purple-500" />,
      title: "Deep Analysis",
      description: "AI-powered risk scoring with explainable factors and sources",
      stats: "100+ risk indicators",
      image: "/assets/risk-analysis.png",
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Trusted by Professionals",
      description: "Used by exchanges, DeFi protocols, and compliance teams",
      stats: "10,000+ daily scans",
      image: "/assets/trust-verification.png",
    },
  ]

  const features = [
    {
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      title: "Risk Assessment",
      description: "Identify high-risk wallets, tokens, and transactions",
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Trust Scoring",
      description: "Verify legitimacy with comprehensive trust metrics",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
      title: "Real-time Data",
      description: "Live blockchain analysis with up-to-date risk intelligence",
    },
  ]

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-500/30">AML Compliance Tool</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Blockchain Security
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> Scanner</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Instant AML screening for wallets, tokens, and transactions. Get risk scores, trust levels, and detailed
            analysis across multiple blockchain networks in seconds.
          </p>
          <div className="relative w-full max-w-4xl mx-auto mb-8 rounded-2xl overflow-hidden">
            <Image
              src="/assets/blockchain-security.png"
              alt="Blockchain Security Dashboard"
              width={800}
              height={400}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onStartScan}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 text-lg"
            >
              <Shield className="w-5 h-5 mr-2" />
              Start Free Scan
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg bg-transparent"
            >
              View Demo
            </Button>
          </div>
        </motion.div>

        {/* Value Blocks */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {valueBlocks.map((block, index) => (
            <Card
              key={index}
              className="bg-black/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors overflow-hidden group"
            >
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={block.image || "/placeholder.svg"}
                  alt={block.title}
                  width={300}
                  height={128}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-4 left-4">{block.icon}</div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-white font-semibold mb-2">{block.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{block.description}</p>
                <Badge variant="secondary" className="bg-white/10 text-white">
                  {block.stats}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Comprehensive Risk Analysis</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  {feature.icon}
                  <div>
                    <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg overflow-hidden">
              <Image
                src="/assets/aml-compliance.png"
                alt="AML Compliance Interface"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          <Card className="bg-black/50 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Enter identifier</p>
                  <p className="text-gray-400 text-xs">Wallet address, token contract, or transaction hash</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <p className="text-white text-sm font-medium">AI Analysis</p>
                  <p className="text-gray-400 text-xs">Cross-reference with multiple data sources</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Get Results</p>
                  <p className="text-gray-400 text-xs">Risk score, trust level, and detailed factors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Secure Your Transactions?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of professionals using Token Eye for blockchain security analysis. Start scanning now and
            protect your assets from high-risk interactions.
          </p>
          <Button
            onClick={onStartScan}
            size="lg"
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 text-lg"
          >
            <Shield className="w-5 h-5 mr-2" />
            Start Your First Scan
          </Button>
        </motion.div>

        {/* Disclaimers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="max-w-4xl mx-auto space-y-4 text-xs text-gray-500">
            <p>
              <strong>Disclaimer:</strong> This tool provides risk assessment for informational purposes only. Results
              should not be considered as financial or legal advice. Always conduct your own research and consult with
              qualified professionals before making financial decisions.
            </p>
            <p>
              Data sources include blockchain explorers, compliance databases, and risk intelligence providers. Accuracy
              is not guaranteed. Token Eye is not responsible for any losses resulting from the use of this tool.
            </p>
            <p>
              By using this service, you agree to our Terms of Service and Privacy Policy. Rate limits apply: 10 scans
              per hour for free users.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
