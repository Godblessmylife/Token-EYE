"use client"

import { motion } from "framer-motion"
import { Play, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HowItWorksHero() {
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
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Token Eye
            </span>{" "}
            Works
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
            Discover our simple yet powerful process that transforms blockchain security through advanced AI technology
            and comprehensive monitoring.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-purple-500 hover:bg-purple-500/20 bg-transparent"
            >
              <Shield className="mr-2 h-5 w-5" />
              Get Security Audit
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-white font-semibold mb-2">Connect & Analyze</h3>
                <p className="text-gray-400 text-sm">AI analyzes your blockchain infrastructure</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-white font-semibold mb-2">Monitor & Protect</h3>
                <p className="text-gray-400 text-sm">24/7 real-time monitoring and threat detection</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-white font-semibold mb-2">Report & Comply</h3>
                <p className="text-gray-400 text-sm">Automated compliance reporting and alerts</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
