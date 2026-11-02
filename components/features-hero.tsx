"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Eye } from "lucide-react"

export default function FeaturesHero() {
  return (
    <section className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Powerful{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Features</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Discover the comprehensive suite of AI-powered blockchain security features that protect your digital assets
            and ensure regulatory compliance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Advanced Security</h3>
            <p className="text-gray-400">
              Multi-layered AI-powered security protocols protecting against sophisticated threats
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Real-time Monitoring</h3>
            <p className="text-gray-400">Instant threat detection and automated response systems</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Compliance Tracking</h3>
            <p className="text-gray-400">Automated regulatory compliance monitoring and reporting</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
