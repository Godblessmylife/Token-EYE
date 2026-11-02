"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Clock, Shield, Users, Zap } from "lucide-react"

export default function ContactContent() {
  const offices = [
    {
      city: "San Francisco",
      address: "123 Blockchain Ave, San Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "sf@sftyai.com",
      timezone: "PST (UTC-8)",
    },
    {
      city: "New York",
      address: "456 Security St, New York, NY 10001",
      phone: "+1 (555) 234-5678",
      email: "ny@sftyai.com",
      timezone: "EST (UTC-5)",
    },
    {
      city: "London",
      address: "789 Crypto Lane, London, UK EC1A 1BB",
      phone: "+44 20 7123 4567",
      email: "london@sftyai.com",
      timezone: "GMT (UTC+0)",
    },
  ]

  const services = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Audits",
      description: "Comprehensive blockchain security assessments",
      response: "24-48 hours",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Compliance Consulting",
      description: "KYC, KYB, and regulatory compliance solutions",
      response: "Same day",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Emergency Response",
      description: "Immediate threat detection and mitigation",
      response: "Immediate",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Ongoing Monitoring",
      description: "24/7 blockchain security monitoring",
      response: "Real-time",
    },
  ]

  return (
    <div className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Contact Form Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Get Started Today</h2>
              <p className="text-gray-400 text-lg mb-8">
                Fill out the form below and our security experts will get back to you within 24 hours. We'll discuss
                your specific needs and provide a customized security solution.
              </p>

              <div className="space-y-6">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-purple-400">{service.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{service.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{service.description}</p>
                      <Badge className="bg-purple-600/20 text-purple-300 text-xs">Response: {service.response}</Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Contact Form</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">First Name</label>
                      <Input
                        placeholder="John"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">Last Name</label>
                      <Input
                        placeholder="Doe"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="john@company.com"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Company</label>
                    <Input
                      placeholder="Your Company"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Service Needed</label>
                    <select className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white">
                      <option value="">Select a service</option>
                      <option value="audit">Security Audit</option>
                      <option value="compliance">Compliance Consulting</option>
                      <option value="monitoring">Ongoing Monitoring</option>
                      <option value="emergency">Emergency Response</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      placeholder="Tell us about your security needs..."
                      rows={4}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Send Message</Button>

                  <p className="text-gray-400 text-xs text-center">
                    By submitting this form, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Office Locations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Offices</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              We have offices around the world to serve you better. Contact your nearest location for local support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full hover:bg-white/10 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="text-white text-xl font-semibold mb-4">{office.city}</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-gray-400 mb-1">Address:</p>
                        <p className="text-white">{office.address}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Phone:</p>
                        <a
                          href={`tel:${office.phone}`}
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          {office.phone}
                        </a>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Email:</p>
                        <a
                          href={`mailto:${office.email}`}
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          {office.email}
                        </a>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Timezone:</p>
                        <p className="text-white">{office.timezone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Quick answers to common questions about our services and processes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How quickly can you respond to security incidents?",
                answer:
                  "We provide 24/7 emergency response with immediate threat detection and mitigation. Our team can respond to critical incidents within minutes.",
              },
              {
                question: "What blockchain networks do you support?",
                answer:
                  "We support all major blockchain networks including Ethereum, Bitcoin, Solana, Polygon, BSC, and many others. Our AI adapts to any blockchain architecture.",
              },
              {
                question: "Do you provide ongoing monitoring services?",
                answer:
                  "Yes, we offer comprehensive 24/7 monitoring services with real-time threat detection, transaction analysis, and automated compliance reporting.",
              },
              {
                question: "How do you ensure data privacy and confidentiality?",
                answer:
                  "We follow strict data protection protocols with end-to-end encryption, zero-knowledge architectures, and compliance with GDPR, CCPA, and other privacy regulations.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
                  <CardContent className="p-6">
                    <h3 className="text-white text-lg font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
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
