"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Zap,
  Eye,
  Brain,
  Lock,
  AlertTriangle,
  BarChart3,
  Users,
  Globe,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react"

export default function FeaturesContent() {
  const coreFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze blockchain transactions in real-time",
      features: ["Pattern Recognition", "Anomaly Detection", "Predictive Analytics", "Smart Alerts"],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Multi-Layer Security",
      description: "Comprehensive security framework protecting against all types of blockchain threats",
      features: ["Smart Contract Auditing", "Wallet Security", "DeFi Protocol Analysis", "Cross-chain Protection"],
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Transaction Monitoring",
      description: "Real-time monitoring of all blockchain transactions with instant threat detection",
      features: ["KYT Compliance", "AML Screening", "Risk Scoring", "Suspicious Activity Reports"],
    },
  ]

  const advancedFeatures = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Identity Verification",
      description: "Comprehensive KYC/KYB solutions with AI-powered identity verification",
      category: "Compliance",
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Threat Intelligence",
      description: "Global threat intelligence network with real-time updates",
      category: "Security",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Risk Analytics",
      description: "Advanced risk assessment and scoring algorithms",
      category: "Analytics",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Management",
      description: "Multi-user dashboard with role-based access control",
      category: "Management",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Coverage",
      description: "Support for all major blockchain networks worldwide",
      category: "Coverage",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Monitoring",
      description: "Round-the-clock automated monitoring and alerting",
      category: "Monitoring",
    },
  ]

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "99.9% Uptime",
      description: "Guaranteed high availability with redundant infrastructure",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Scalable Solution",
      description: "Grows with your business from startup to enterprise",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Sub-second response times for critical security alerts",
    },
  ]

  return (
    <div className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Core Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Core Features</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Our flagship features that make SFTY AI the leading blockchain security platform
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-sm border-purple-500/20 h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-purple-400">{feature.icon}</div>
                    </div>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-6">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Advanced Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Advanced Capabilities</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Extended features that provide comprehensive blockchain security coverage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full hover:bg-white/10 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-purple-400">{feature.icon}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-white font-semibold">{feature.title}</h3>
                          <Badge className="bg-purple-600/20 text-purple-300 text-xs">{feature.category}</Badge>
                        </div>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose SFTY AI</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              The benefits that set us apart from other blockchain security solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-purple-400">{benefit.icon}</div>
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
