"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactHero() {
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
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Token Eye
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Ready to secure your blockchain infrastructure? Get in touch with our security experts for a personalized
            consultation.
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
              <Mail className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-400 mb-2">Get in touch via email</p>
            <a href="mailto:Armandsm@gmail.com" className="text-purple-400 hover:text-purple-300 transition-colors">
              Armandsm@gmail.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-400 mb-2">24/7 Support Available</p>
            <a href="tel:+971569137999" className="text-purple-400 hover:text-purple-300 transition-colors">
              +971 56 913 7999
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-400 mb-2">Our headquarters</p>
            <p className="text-purple-400">
              123 Blockchain Ave
              <br />
              San Francisco, CA 94105
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
