"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Share2,
  Download,
  RefreshCw,
  Globe,
  Shield,
  TrendingUp,
  TrendingDown,
  Users,
  Lock,
  Coins,
  DollarSign,
} from "lucide-react"
import { motion } from "framer-motion"
import MarketDataWidget from "./market-data-widget"
import SecurityAnalysisWidget from "./security-analysis-widget"
import TradingPlatformWidget from "./trading-platform-widget"

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
    tokenInfo?: {
      name: string
      symbol: string
      price: number
      priceChange24h: number
      totalSupply: string
      circulatingSupply: string
      marketCap: number
      fullyDilutedValuation: number
      liquidity: {
        totalLiquidity: number
        liquidityPools: Array<{
          platform: string
          pair: string
          liquidity: number
          volume24h: number
        }>
      }
      tradingPlatforms: Array<{
        name: string
        url: string
        volume24h: number
        price: number
      }>
      securityChecks: {
        honeyPotStatus: "safe" | "warning" | "danger"
        honeyPotDetails: string
        auditStatus: "verified" | "unverified" | "failed"
        auditReports: Array<{
          auditor: string
          date: string
          score: number
          reportUrl: string
        }>
      }
      officialWebsite: string
      socialLinks: {
        twitter?: string
        telegram?: string
        discord?: string
        github?: string
      }
      tokenomics: {
        maxSupply: string
        burnedTokens: string
        holders: number
        topHolders: Array<{
          address: string
          percentage: number
          balance: string
        }>
        distribution: Array<{
          category: string
          percentage: number
          amount: string
          locked: boolean
          vestingPeriod?: string
        }>
      }
    }
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

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  const formatSupply = (supply: string) => {
    const num = Number.parseInt(supply)
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
    return num.toString()
  }

  const getSecurityColor = (status: string) => {
    switch (status) {
      case "safe":
      case "verified":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      case "warning":
      case "unverified":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "danger":
      case "failed":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20"
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
                {result.tokenInfo && (
                  <span className="text-purple-400">
                    - {result.tokenInfo.name} ({result.tokenInfo.symbol})
                  </span>
                )}
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
          {/* Trading Platform Integration for Tokens */}
          {result.type === "token" && result.tokenInfo && (
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Trading Platform Analysis
              </h3>
              <TradingPlatformWidget
                tokenAddress={result.identifier}
                tokenSymbol={result.tokenInfo.symbol}
                blockchain={result.blockchain}
                currentPrice={result.tokenInfo.price}
              />
            </div>
          )}

          {/* Advanced Security Analysis */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-400" />
              Advanced Security Analysis
            </h3>
            <SecurityAnalysisWidget identifier={result.identifier} type={result.type} blockchain={result.blockchain} />
          </div>

          {/* Market Data Integration for Tokens */}
          {result.type === "token" && result.tokenInfo && (
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Live Market Data
              </h3>
              <MarketDataWidget
                tokenAddress={result.identifier}
                blockchain={result.blockchain}
                tokenSymbol={result.tokenInfo.symbol}
              />
            </div>
          )}

          {/* Comprehensive Token Information Section */}
          {result.tokenInfo && (
            <div className="space-y-6">
              {/* Token Price & Market Data */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Price</span>
                  </div>
                  <div className="text-xl font-bold text-white">${result.tokenInfo.price.toFixed(8)}</div>
                  <div
                    className={`text-sm flex items-center gap-1 ${result.tokenInfo.priceChange24h >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {result.tokenInfo.priceChange24h >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {result.tokenInfo.priceChange24h.toFixed(2)}%
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-400">Market Cap</span>
                  </div>
                  <div className="text-xl font-bold text-white">{formatNumber(result.tokenInfo.marketCap)}</div>
                  <div className="text-sm text-gray-400">
                    FDV: {formatNumber(result.tokenInfo.fullyDilutedValuation)}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400">Liquidity</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatNumber(result.tokenInfo.liquidity.totalLiquidity)}
                  </div>
                  <div className="text-sm text-gray-400">{result.tokenInfo.liquidity.liquidityPools.length} pools</div>
                </div>

                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-gray-400">Holders</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {result.tokenInfo.tokenomics.holders.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">
                    Supply: {formatSupply(result.tokenInfo.circulatingSupply)}
                  </div>
                </div>
              </div>

              {/* Security Checks */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5 text-red-400" />
                      Honey Pot Check
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`p-3 rounded-lg border ${getSecurityColor(result.tokenInfo.securityChecks.honeyPotStatus)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium capitalize">{result.tokenInfo.securityChecks.honeyPotStatus}</span>
                        <Badge className={getSecurityColor(result.tokenInfo.securityChecks.honeyPotStatus)}>
                          {result.tokenInfo.securityChecks.honeyPotStatus}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300">{result.tokenInfo.securityChecks.honeyPotDetails}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Audit Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`p-3 rounded-lg border ${getSecurityColor(result.tokenInfo.securityChecks.auditStatus)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium capitalize">{result.tokenInfo.securityChecks.auditStatus}</span>
                        <Badge className={getSecurityColor(result.tokenInfo.securityChecks.auditStatus)}>
                          {result.tokenInfo.securityChecks.auditStatus}
                        </Badge>
                      </div>
                      {result.tokenInfo.securityChecks.auditReports.length > 0 && (
                        <div className="space-y-2">
                          {result.tokenInfo.securityChecks.auditReports.map((report, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                              <span className="text-gray-300">{report.auditor}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-green-400">{report.score}/100</span>
                                <a
                                  href={report.reportUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-purple-400 hover:text-purple-300"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Trading Platforms */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    Trading Platforms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {result.tokenInfo.tradingPlatforms.map((platform, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                      >
                        <div>
                          <div className="text-white font-medium">{platform.name}</div>
                          <div className="text-sm text-gray-400">24h Vol: {formatNumber(platform.volume24h)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white">${platform.price.toFixed(8)}</div>
                          <a
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 transition-colors"
                          >
                            Trade <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Official Links */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Globe className="w-5 h-5 text-green-400" />
                    Official Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={result.tokenInfo.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      Website
                    </a>
                    {result.tokenInfo.socialLinks.twitter && (
                      <a
                        href={result.tokenInfo.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:text-sky-300 transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                    {result.tokenInfo.socialLinks.telegram && (
                      <a
                        href={result.tokenInfo.socialLinks.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Telegram
                      </a>
                    )}
                    {result.tokenInfo.socialLinks.github && (
                      <a
                        href={result.tokenInfo.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-500/10 border border-gray-500/20 text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tokenomics */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Coins className="w-5 h-5 text-purple-400" />
                    Tokenomics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="text-sm text-gray-400 mb-1">Max Supply</div>
                      <div className="text-white font-medium">
                        {formatSupply(result.tokenInfo.tokenomics.maxSupply)}
                      </div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="text-sm text-gray-400 mb-1">Burned</div>
                      <div className="text-white font-medium">
                        {formatSupply(result.tokenInfo.tokenomics.burnedTokens)}
                      </div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="text-sm text-gray-400 mb-1">Holders</div>
                      <div className="text-white font-medium">
                        {result.tokenInfo.tokenomics.holders.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Token Distribution</h4>
                    <div className="space-y-2">
                      {result.tokenInfo.tokenomics.distribution.map((dist, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                          <div className="flex items-center gap-2">
                            <span className="text-white">{dist.category}</span>
                            {dist.locked && <Lock className="w-3 h-3 text-yellow-400" />}
                          </div>
                          <div className="text-right">
                            <div className="text-white">{dist.percentage}%</div>
                            {dist.vestingPeriod && <div className="text-xs text-gray-400">{dist.vestingPeriod}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Top Holders</h4>
                    <div className="space-y-2">
                      {result.tokenInfo.tokenomics.topHolders.map((holder, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded bg-white/5">
                          <span className="text-gray-300 font-mono text-sm">{holder.address}</span>
                          <span className="text-white">{holder.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

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
                        Verify <ExternalLink className="w-3 h-3" />
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
