"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Upload,
  Shield,
  AlertTriangle,
  FileText,
  CheckCircle,
  ArrowRight,
  Clock,
  Brain,
  Eye,
  Lock,
  BarChart3,
} from "lucide-react"

export default function HowItWorksContent() {
  const steps = [
    {
      step: "01",
      title: "Initial Setup & Integration",
      description: "Connect your blockchain infrastructure to our secure platform",
      icon: <Upload className="w-8 h-8" />,
      details: [
        "Secure API integration with your blockchain networks",
        "Custom configuration based on your security requirements",
        "Zero-downtime deployment with minimal setup time",
        "Comprehensive onboarding with dedicated support team",
      ],
      duration: "5-10 minutes",
    },
    {
      step: "02",
      title: "AI-Powered Analysis",
      description: "Our advanced AI algorithms analyze your entire blockchain ecosystem",
      icon: <Brain className="w-8 h-8" />,
      details: [
        "Deep learning models scan smart contracts and transactions",
        "Pattern recognition identifies potential vulnerabilities",
        "Risk assessment algorithms evaluate threat levels",
        "Behavioral analysis detects anomalous activities",
      ],
      duration: "Real-time",
    },
    {
      step: "03",
      title: "Continuous Monitoring",
      description: "24/7 real-time monitoring with instant threat detection",
      icon: <Eye className="w-8 h-8" />,
      details: [
        "Real-time transaction monitoring across all networks",
        "Automated threat detection and classification",
        "Suspicious activity flagging and investigation",
        "Cross-chain analysis for comprehensive coverage",
      ],
      duration: "24/7",
    },
    {
      step: "04",
      title: "Threat Response",
      description: "Immediate response to detected threats with automated mitigation",
      icon: <AlertTriangle className="w-8 h-8" />,
      details: [
        "Instant alerts via multiple communication channels",
        "Automated threat containment and mitigation",
        "Detailed incident reports with remediation steps",
        "Emergency response team activation for critical threats",
      ],
      duration: "< 1 second",
    },
    {
      step: "05",
      title: "Compliance Reporting",
      description: "Automated regulatory compliance and detailed security reports",
      icon: <FileText className="w-8 h-8" />,
      details: [
        "Automated AML/KYC compliance reporting",
        "Regulatory requirement tracking and updates",
        "Detailed audit trails and documentation",
        "Custom reports for stakeholders and regulators",
      ],
      duration: "Automated",
    },
  ]

  const technologies = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Machine Learning",
      description: "Advanced ML algorithms for pattern recognition and threat prediction",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Blockchain Security",
      description: "Specialized security protocols designed for blockchain networks",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Risk Analytics",
      description: "Sophisticated risk scoring and assessment algorithms",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Encryption",
      description: "End-to-end encryption for all data transmission and storage",
    },
  ]

  const benefits = [
    {
      title: "Reduced Security Incidents",
      value: "95%",
      description: "Average reduction in security incidents for our clients",
    },
    {
      title: "Faster Threat Detection",
      value: "<1s",
      description: "Average time to detect and alert on potential threats",
    },
    {
      title: "Compliance Automation",
      value: "100%",
      description: "Automated compliance reporting and regulatory updates",
    },
    {
      title: "Cost Savings",
      value: "60%",
      description: "Average reduction in security-related operational costs",
    },
  ]

  return (
    <div className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Step-by-Step Process */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              A comprehensive 5-step process that ensures maximum security for your blockchain infrastructure
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                      <div className="lg:col-span-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                            <div className="text-white">{step.icon}</div>
                          </div>
                          <div>
                            <Badge className="bg-purple-600/20 text-purple-300 mb-2">Step {step.step}</Badge>
                            <h3 className="text-white text-xl font-semibold">{step.title}</h3>
                          </div>
                        </div>
                        <p className="text-gray-400 mb-4">{step.description}</p>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-400 text-sm font-medium">{step.duration}</span>
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <div className="grid md:grid-cols-2 gap-4">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300 text-sm">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {index < steps.length - 1 && (
                  <div className="flex justify-center my-8">
                    <ArrowRight className="w-6 h-6 text-purple-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* AML Intelligence Platform */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our AML Intelligence Platform</h2>
              <p className="text-gray-400 text-lg mb-8">
                The only solution that combines on- and off-chain data to detect crypto crime, fraud and market
                manipulation
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Aggregated transactions data from top KYT providers</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white">
                    Full coverage on all necessary KYC procedures from various KYC providers
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Unique regulatory reporting tools</span>
                </div>
              </div>

              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">REQUEST A DEMO</Button>
            </div>

            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sss.PNG-lQRU5eqMPidxXvFHbk8wU20YgvlaJz.png"
                alt="AML Intelligence Platform - KYT, KYC, KYB Integration"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </motion.section>

        {/* Technologies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Powered by Advanced Technology</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              The cutting-edge technologies that make our blockchain security platform possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-sm border-purple-500/20 h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <div className="text-purple-400">{tech.icon}</div>
                    </div>
                    <h3 className="text-white font-semibold mb-2">{tech.title}</h3>
                    <p className="text-gray-400 text-sm">{tech.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Results & Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Proven Results</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              The measurable impact SFTY AI delivers for blockchain security
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                  {benefit.value}
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
