"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, ExternalLink, Share2, Download, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

interface ScanResultCardProps {
  result: {
    riskScore: number
    trustScore: number
    factors: Array<{
      type: "risk" | "trust"
      description: string
      source: string
      sourceUrl: string
      severity?: "low" | "medium" | "high"
    }>
    blockchain: string
    type: "wallet" | "token" | "transaction"
    identifier: string
    timestamp: string
    overallRisk: "low" | "medium" | "high"
  }
  onRescan?: () => void
  onShare?: () => void
  onExport?: () => void
}

export default function ScanResultCard({ result, onRescan, onShare, onExport }: ScanResultCardProps) {
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: "High", color: "bg-red-500", textColor: "text-red-500", bgColor: "bg-red-500/10" }
    if (score >= 50)
      return { level: "Medium", color: "bg-yellow-500", textColor: "text-yellow-500", bgColor: "bg-yellow-500/10" }
    return { level: "Low", color: "bg-green-500", textColor: "text-green-500", bgColor: "bg-green-500/10" }
  }

  const getTrustLevel = (score: number) => {
    if (score >= 80)
      return { level: "High", color: "bg-green-500", textColor: "text-green-500", bgColor: "bg-green-500/10" }
    if (score >= 50)
      return { level: "Medium", color: "bg-yellow-500", textColor: "text-yellow-500", bgColor: "bg-yellow-500/10" }
    return { level: "Low", color: "bg-red-500", textColor: "text-red-500", bgColor: "bg-red-500/10" }
  }

  const getOverallRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "border-red-500/50 bg-red-500/5"
      case "medium":
        return "border-yellow-500/50 bg-yellow-500/5"
      default:
        return "border-green-500/50 bg-green-500/5"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return "🔴"
      case "medium":
        return "🟡"
      default:
        return "🟢"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border-2 ${getOverallRiskColor(result.overallRisk)} p-1`}
    >
      <Card className="bg-black/50 backdrop-blur-sm border-0">
        {/* Header with Actions */}
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Security Analysis Results
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="capitalize">{result.type}</span>
                <span>•</span>
                <span className="capitalize">{result.blockchain}</span>
                <span>•</span>
                <span>{result.timestamp}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {onRescan && (
                <Button variant="ghost" size="sm" onClick={onRescan} className="text-gray-400 hover:text-white">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
              {onShare && (
                <Button variant="ghost" size="sm" onClick={onShare} className="text-gray-400 hover:text-white">
                  <Share2 className="w-4 h-4" />
                </Button>
              )}
              {onExport && (
                <Button variant="ghost" size="sm" onClick={onExport} className="text-gray-400 hover:text-white">
                  <Download className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score Overview */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Overall Risk */}
            <div className={`p-4 rounded-lg ${getOverallRiskColor(result.overallRisk)}`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{result.overallRisk.toUpperCase()}</div>
                <div className="text-sm text-gray-400">Overall Risk</div>
              </div>
            </div>

            {/* Risk Score */}
            <div className={`p-4 rounded-lg ${getRiskLevel(result.riskScore).bgColor}`}>
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <Badge className={`${getRiskLevel(result.riskScore).color} text-white text-xs`}>
                  {getRiskLevel(result.riskScore).level}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{result.riskScore}</div>
              <div className="text-sm text-gray-400">Risk Score</div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div
                  className={`h-1.5 rounded-full ${getRiskLevel(result.riskScore).color}`}
                  style={{ width: `${result.riskScore}%` }}
                />
              </div>
            </div>

            {/* Trust Score */}
            <div className={`p-4 rounded-lg ${getTrustLevel(result.trustScore).bgColor}`}>
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <Badge className={`${getTrustLevel(result.trustScore).color} text-white text-xs`}>
                  {getTrustLevel(result.trustScore).level}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{result.trustScore}</div>
              <div className="text-sm text-gray-400">Trust Score</div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div
                  className={`h-1.5 rounded-full ${getTrustLevel(result.trustScore).color}`}
                  style={{ width: `${result.trustScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Analysis Factors */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span>Key Findings</span>
              <Badge variant="secondary" className="bg-white/10 text-white text-xs">
                {result.factors.length} factors
              </Badge>
            </h3>
            <div className="space-y-3">
              {result.factors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${factor.type === "risk" ? "bg-red-500" : "bg-green-500"}`}
                    />
                    {factor.severity && <span className="text-xs">{getSeverityIcon(factor.severity)}</span>}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium mb-1">{factor.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-xs">Source: {factor.source}</span>
                      <a
                        href={factor.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 text-xs flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Verify
                      </a>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      factor.type === "risk" ? "border-red-500/30 text-red-400" : "border-green-500/30 text-green-400"
                    }`}
                  >
                    {factor.type}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Identifier Info */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400 mb-1">Scanned Identifier</div>
                <div className="text-white font-mono text-sm break-all">{result.identifier}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigator.clipboard.writeText(result.identifier)}
                className="text-gray-400 hover:text-white"
              >
                Copy
              </Button>
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
              <span>💡</span>
              Recommendations
            </h4>
            <div className="text-sm text-gray-300 space-y-1">
              {result.overallRisk === "high" && (
                <>
                  <p>• Avoid interacting with this address due to high risk factors</p>
                  <p>• Consider additional due diligence before proceeding</p>
                  <p>• Monitor for any changes in risk profile</p>
                </>
              )}
              {result.overallRisk === "medium" && (
                <>
                  <p>• Proceed with caution and additional verification</p>
                  <p>• Consider smaller transaction amounts initially</p>
                  <p>• Monitor transaction patterns</p>
                </>
              )}
              {result.overallRisk === "low" && (
                <>
                  <p>• Address appears to have low risk profile</p>
                  <p>• Standard security practices still recommended</p>
                  <p>• Continue monitoring for any changes</p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
