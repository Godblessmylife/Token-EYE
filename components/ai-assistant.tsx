"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Loader2, Sparkles, Shield, Brain } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error("No response body")
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      let done = false
      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone

        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const jsonStr = line.slice(2)
                const data = JSON.parse(jsonStr)
                if (data.type === "text-delta" && data.textDelta) {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessage.id ? { ...msg, content: msg.content + data.textDelta } : msg,
                    ),
                  )
                }
              } catch (e) {
                // Ignore parsing errors for malformed chunks
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm experiencing technical difficulties. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const suggestions = [
    "How can I secure my smart contract?",
    "What are the latest blockchain security threats?",
    "Explain KYC compliance requirements",
    "How does transaction monitoring work?",
  ]

  return (
    <div className="min-h-[calc(100vh-76px)] flex flex-col px-6 py-8">
      <div className="container mx-auto max-w-4xl flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative w-16 h-16 bg-black rounded-full flex items-center justify-center border-2 border-purple-500">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Token Eye{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Assistant
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your intelligent blockchain security advisor. Ask questions about smart contract security, compliance, and
            threat detection.
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Badge className="bg-green-600/20 text-green-300">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Online
            </Badge>
            <Badge className="bg-purple-600/20 text-purple-300">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex flex-col"
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-400" />
                Security Chat
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <Bot className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-6">
                      Hello! I'm your Token Eye AI assistant. I can help you with blockchain security questions,
                      compliance guidance, and threat analysis.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="bg-white/5 border-white/20 text-white hover:bg-white/10 text-sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start space-x-3 max-w-[80%] ${
                          message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === "user" ? "bg-purple-600" : "bg-gradient-to-r from-purple-600 to-pink-600"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-purple-600 text-white"
                              : "bg-white/10 text-gray-100 border border-white/20"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/10 border border-white/20 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                          <span className="text-gray-300 text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about blockchain security, compliance, or threats..."
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            {
              icon: <Shield className="w-5 h-5" />,
              title: "Security Analysis",
              description: "Smart contract vulnerability assessment",
            },
            {
              icon: <Brain className="w-5 h-5" />,
              title: "Threat Intelligence",
              description: "Real-time blockchain threat detection",
            },
            {
              icon: <Sparkles className="w-5 h-5" />,
              title: "Compliance Guidance",
              description: "KYC/AML regulatory requirements",
            },
          ].map((feature, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <div className="text-purple-400">{feature.icon}</div>
                </div>
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
