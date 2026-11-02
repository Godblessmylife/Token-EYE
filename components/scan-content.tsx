"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Shield, Clock, ArrowLeft, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ScanLanding from "./scan-landing"
import ScanResultCard from "./scan-result-card"
import { scanDataProvider, type ScanResult } from "@/lib/scan-data-provider"
import { analytics } from "@/lib/analytics"

export default function ScanContent() {
  const [showScanner, setShowScanner] = useState(false)
  const [scanType, setScanType] = useState<"wallet" | "token" | "transaction">("wallet")
  const [identifier, setIdentifier] = useState("")
  const [blockchain, setBlockchain] = useState("ethereum")
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [remainingRequests, setRemainingRequests] = useState(10)
  const [scanStartTime, setScanStartTime] = useState<number>(0)

  useEffect(() => {
    // Initialize analytics
    analytics.init()

    // Track initial page view
    analytics.trackPageView("/scan", "AML Security Scanner")
    analytics.trackScanJourney("landing")
  }, [])

  useEffect(() => {
    // Track journey step changes
    if (showScanner) {
      analytics.trackScanJourney("form")
    } else {
      analytics.trackScanJourney("landing")
    }
  }, [showScanner])

  if (!showScanner) {
    return (
      <ScanLanding
        onStartScan={() => {
          setShowScanner(true)
          analytics.trackButtonClick("start_scan", "landing_page")
        }}
      />
    )
  }

  const handleScan = async () => {
    if (!identifier.trim()) return

    setIsScanning(true)
    setResult(null)
    setError(null)
    setScanStartTime(Date.now())

    // Track scan start
    analytics.trackScanStart(scanType, blockchain)
    analytics.trackScanJourney("scanning")

    try {
      const scanResult = await scanDataProvider.scanIdentifier({
        identifier: identifier.trim(),
        type: scanType,
        blockchain,
      })

      const scanDuration = Date.now() - scanStartTime
      setResult(scanResult)
      setRemainingRequests(scanDataProvider.getRemainingRequests())

      // Track successful scan
      analytics.trackScanComplete(scanType, blockchain, scanResult.riskScore, scanResult.trustScore, scanDuration)
      analytics.trackScanJourney("results")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred during scanning"
      setError(errorMessage)
      setRemainingRequests(scanDataProvider.getRemainingRequests())

      // Track scan error
      const errorType = errorMessage.includes("Rate limit")
        ? "rate_limit"
        : errorMessage.includes("Invalid")
          ? "validation_error"
          : "unknown_error"
      analytics.trackScanError(scanType, blockchain, errorType)

      if (errorType === "rate_limit") {
        analytics.trackRateLimit(scanDataProvider.getRemainingRequests())
      }
    } finally {
      setIsScanning(false)
    }
  }

  const handleRescan = () => {
    analytics.trackButtonClick("rescan", "results_page")
    handleScan()
  }

  const handleShare = () => {
    analytics.trackFeatureUsage("share_results", "share")
    if (result) {
      const shareText = `Token Eye Security Scan Results:\nRisk Score: ${result.riskScore}\nTrust Score: ${result.trustScore}\nOverall Risk: ${result.overallRisk.toUpperCase()}`
      navigator.share?.({ text: shareText }) || navigator.clipboard.writeText(shareText)
    }
  }

  const handleExport = () => {
    analytics.trackFeatureUsage("export_results", "export")
    analytics.trackScanJourney("export")
    if (result) {
      const exportData = JSON.stringify(result, null, 2)
      const blob = new Blob([exportData], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `scan-result-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleScanTypeChange = (newType: string) => {
    setScanType(newType as any)
    analytics.trackFeatureUsage("scan_type_change", newType)
  }

  const handleBlockchainChange = (newBlockchain: string) => {
    setBlockchain(newBlockchain)
    analytics.trackFeatureUsage("blockchain_change", newBlockchain)
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => {
              setShowScanner(false)
              analytics.trackButtonClick("back_to_overview", "scanner_page")
            }}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Overview
          </Button>
          <div className="text-sm text-gray-400">
            Remaining scans: <span className="text-white font-medium">{remainingRequests}</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">AML Security Scanner</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get instant risk assessment for wallets, tokens, and transactions across multiple blockchain networks
          </p>
        </div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Alert className="mb-6 bg-red-500/10 border-red-500/20 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scan Form */}
        <Card className="bg-black/50 backdrop-blur-sm border border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Quick Security Scan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Scan Type Tabs */}
            <Tabs value={scanType} onValueChange={handleScanTypeChange}>
              <TabsList className="grid w-full grid-cols-3 bg-white/5">
                <TabsTrigger value="wallet" className="text-white data-[state=active]:bg-purple-600">
                  Wallet
                </TabsTrigger>
                <TabsTrigger value="token" className="text-white data-[state=active]:bg-purple-600">
                  Token
                </TabsTrigger>
                <TabsTrigger value="transaction" className="text-white data-[state=active]:bg-purple-600">
                  Transaction
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Blockchain Selection */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Blockchain</label>
              <select
                value={blockchain}
                onChange={(e) => handleBlockchainChange(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 [&>option]:bg-gray-800 [&>option]:text-white"
              >
                <option value="ethereum" className="bg-gray-800 text-white">
                  Ethereum (ETH)
                </option>
                <option value="bsc" className="bg-gray-800 text-white">
                  Binance Smart Chain (BNB)
                </option>
                <option value="polygon" className="bg-gray-800 text-white">
                  Polygon (MATIC)
                </option>
                <option value="avalanche" className="bg-gray-800 text-white">
                  Avalanche (AVAX)
                </option>
                <option value="cardano" className="bg-gray-800 text-white">
                  Cardano (ADA)
                </option>
                <option value="arbitrum" className="bg-gray-800 text-white">
                  Arbitrum (ARB)
                </option>
                <option value="optimism" className="bg-gray-800 text-white">
                  Optimism (OP)
                </option>
              </select>
            </div>

            {/* Identifier Input */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">
                {scanType === "wallet" && "Wallet Address"}
                {scanType === "token" && "Token Contract Address"}
                {scanType === "transaction" && "Transaction Hash"}
              </label>
              <div className="flex gap-2">
                <Input
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    scanType === "wallet"
                      ? "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87"
                      : scanType === "token"
                        ? "0xA0b86a33E6441E6C8D3c8C7C5b8C8C8C8C8C8C8C"
                        : "0x1234567890abcdef1234567890abcdef12345678"
                  }
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
                <Button
                  onClick={handleScan}
                  disabled={!identifier.trim() || isScanning || remainingRequests <= 0}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6"
                >
                  {isScanning ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      SCAN
                    </>
                  )}
                </Button>
              </div>
              {remainingRequests <= 0 && (
                <p className="text-red-400 text-xs">Rate limit reached. Please try again later.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <ScanResultCard result={result} onRescan={handleRescan} onShare={handleShare} onExport={handleExport} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
