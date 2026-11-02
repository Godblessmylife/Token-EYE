"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Target, Eye, Heart } from "lucide-react"

export default function AboutUsContent() {
  const stats = [
    { number: "500+", label: "Clients Protected" },
    { number: "$50B+", label: "Assets Secured" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Support Available" },
  ]

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Innovation",
      description: "Continuously advancing blockchain security through cutting-edge AI technology",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Transparency",
      description: "Open communication and clear reporting in all our security assessments",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Reliability",
      description: "Consistent, dependable security solutions you can trust",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Integrity",
      description: "Ethical practices and honest recommendations in every engagement",
    },
  ]

  return (
    <div className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Company Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-400 text-lg mb-6">
                Founded in 2020 by a team of blockchain security experts and AI researchers, Token Eye emerged from the
                critical need for comprehensive security solutions in the rapidly evolving digital asset ecosystem.
              </p>
              <p className="text-gray-400 text-lg mb-6">
                As blockchain technology gained mainstream adoption, we recognized that traditional security measures
                were insufficient to protect against sophisticated threats. Our mission became clear: develop AI-powered
                security solutions that could adapt and evolve with the threat landscape.
              </p>
              <p className="text-gray-400 text-lg">
                Today, we're proud to be the leading provider of blockchain security solutions, protecting billions in
                digital assets for clients worldwide.
              </p>
            </div>
            <div className="relative">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center"
                      >
                        <div className="text-3xl font-bold text-purple-400 mb-2">{stat.number}</div>
                        <div className="text-gray-400 text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Mission & Vision</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Driving the future of secure blockchain ecosystems through innovative AI technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-sm border-purple-500/20">
              <CardContent className="p-8">
                <Badge className="bg-purple-600/20 text-purple-300 mb-4">Mission</Badge>
                <h3 className="text-2xl font-bold text-white mb-4">Securing Digital Assets</h3>
                <p className="text-gray-400 text-lg">
                  To provide comprehensive, AI-powered blockchain security solutions that protect digital assets, ensure
                  regulatory compliance, and enable safe participation in the decentralized economy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-600/10 to-purple-600/10 backdrop-blur-sm border-pink-500/20">
              <CardContent className="p-8">
                <Badge className="bg-pink-600/20 text-pink-300 mb-4">Vision</Badge>
                <h3 className="text-2xl font-bold text-white mb-4">Future of Blockchain</h3>
                <p className="text-gray-400 text-lg">
                  To be the global standard for blockchain security, creating a world where digital assets are
                  completely secure, compliant, and accessible to everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full hover:bg-white/10 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-purple-400">{value.icon}</div>
                    </div>
                    <h3 className="text-white text-lg font-semibold mb-3">{value.title}</h3>
                    <p className="text-gray-400 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Leadership Team */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Leadership Team</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Meet the experts leading Token Eye's mission to secure the blockchain ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Armands",
                role: "CEO & Co-Founder",
                bio: "Former blockchain security researcher with 10+ years in cybersecurity",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2023-02-07_16-08-05.jpg-swyBOvjzVJCBA7CjUU4UoOXEPY8HVC.jpeg",
              },
              {
                name: "John Prophet",
                role: "CTO & Co-Founder, Developer & Cybersecurity",
                bio: "AI/ML expert with extensive experience in financial technology",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-07-07_21-15-55.jpg-nuhDcq9lUpvmvvRd5P69EW7A5Bzkjz.jpeg",
              },
              {
                name: "Lauris",
                role: "Head of Compliance",
                bio: "Regulatory expert with deep knowledge of global compliance frameworks",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-08-08_03-48-27.jpg-zDTXl1r4qMhsYdVcf0n4wqsTapqdC5.jpeg",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden hover:bg-white/10 transition-colors">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-white text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-purple-400 text-sm mb-3">{member.role}</p>
                    <p className="text-gray-400 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
