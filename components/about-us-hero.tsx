"use client"

import { motion } from "framer-motion"
import { Shield, Users, Globe } from "lucide-react"

export default function AboutUsHero() {
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
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Token Eye
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Leading the future of blockchain security with cutting-edge AI technology and comprehensive compliance
            solutions.
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
            <h3 className="text-white text-xl font-semibold mb-2">Security First</h3>
            <p className="text-gray-400">
              Advanced AI-powered security solutions protecting billions in digital assets
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Expert Team</h3>
            <p className="text-gray-400">World-class experts in blockchain, AI, and regulatory compliance</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-gray-400">Serving clients worldwide with 24/7 support and compliance expertise</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
