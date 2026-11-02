"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, ExternalLink, Star, AlertTriangle, Zap, Shield, RefreshCw, ArrowUpDown } from "lucide-react"
import { motion } from "framer-motion"

interface TradingPlatformWidgetProps {
  tokenAddress?: string
  tokenSymbol?: string
  blockchain?: string
  currentPrice?: number
}

interface PlatformData {
  name: string
  logo: string
  url: string
  price: number
  volume24h: number
  liquidity: number
  spread: number
  fees: {
    trading: number
    gas: number
    slippage: number
  }
  securityRating: number
  trustScore: number
  features: string[]
  pros: string[]
  cons: string[]
  supported: boolean
  lastUpdate: string
}

interface ArbitrageOpportunity {
  buyPlatform: string
  sellPlatform: string
  buyPrice: number
  sellPrice: number
  profitPercent: number
  profitAmount: number
  volume: number
  risk: "low" | "medium" | "high"
}

export default function TradingPlatformWidget({
  tokenAddress,
  tokenSymbol,
  blockchain,
  currentPrice,
}: TradingPlatformWidgetProps) {
  const [platforms, setPlatforms] = useState<PlatformData[]>([])
  const [arbitrageOpportunities, setArbitrageOpportunities] = useState<ArbitrageOpportunity[]>([])
  const [bestPlatform, setBestPlatform] = useState<PlatformData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [sortBy, setSortBy] = useState<"price" | "volume" | "liquidity" | "fees" | "security">("volume")

  const generatePlatformData = () => {
    if (!tokenAddress || !tokenSymbol) return

    const hash = tokenAddress.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)

    const basePrice = currentPrice || 0.001
    const platformsData: PlatformData[] = [
      {
        name: "Uniswap V3",
        logo: "🦄",
        url: `https://app.uniswap.org/#/swap?outputCurrency=${tokenAddress}`,
        price: basePrice * (1 + (Math.abs(hash % 20) - 10) / 1000),
        volume24h: Math.abs((hash >> 4) % 5000000),
        liquidity: Math.abs((hash >> 8) % 10000000),
        spread: Math.abs((hash >> 12) % 100) / 100,
        fees: {
          trading: 0.3,
          gas: Math.abs((hash >> 16) % 50) + 20,
          slippage: Math.abs((hash >> 20) % 200) / 100,
        },
        securityRating: 95,
        trustScore: 98,
        features: ["AMM", "Concentrated Liquidity", "Multiple Fee Tiers", "Flash Loans"],
        pros: ["Highest liquidity", "Best price discovery", "Advanced features"],
        cons: ["High gas fees", "Complex interface"],
        supported: true,
        lastUpdate: new Date(Date.now() - Math.abs((hash >> 24) % 300000)).toLocaleTimeString(),
      },
      {
        name: "PancakeSwap",
        logo: "🥞",
        url: `https://pancakeswap.finance/swap?outputCurrency=${tokenAddress}`,
        price: basePrice * (1 + (Math.abs((hash >> 4) % 20) - 10) / 1000),
        volume24h: Math.abs((hash >> 8) % 3000000),
        liquidity: Math.abs((hash >> 12) % 8000000),
        spread: Math.abs((hash >> 16) % 150) / 100,
        fees: {
          trading: 0.25,
          gas: Math.abs((hash >> 20) % 10) + 2,
          slippage: Math.abs((hash >> 24) % 150) / 100,
        },
        securityRating: 88,
        trustScore: 92,
        features: ["AMM", "Yield Farming", "Lottery", "NFT Marketplace"],
        pros: ["Low fees", "Fast transactions", "Multiple features"],
        cons: ["Lower liquidity", "BSC dependency"],
        supported: blockchain === "bsc",
        lastUpdate: new Date(Date.now() - Math.abs((hash >> 28) % 300000)).toLocaleTimeString(),
      },
      {
        name: "SushiSwap",
        logo: "🍣",
        url: `https://app.sushi.com/swap?outputCurrency=${tokenAddress}`,
        price: basePrice * (1 + (Math.abs((hash >> 8) % 20) - 10) / 1000),
        volume24h: Math.abs((hash >> 12) % 2000000),
        liquidity: Math.abs((hash >> 16) % 6000000),
        spread: Math.abs((hash >> 20) % 200) / 100,
        fees: {
          trading: 0.3,
          gas: Math.abs((hash >> 24) % 40) + 25,
          slippage: Math.abs((hash >> 28) % 180) / 100,
        },
        securityRating: 85,
        trustScore: 89,
        features: ["AMM", "Cross-chain", "Lending", "Staking"],
        pros: ["Multi-chain support", "Additional yield opportunities"],
        cons: ["Moderate liquidity", "Complex tokenomics"],
        supported: true,
        lastUpdate: new Date(Date.now() - Math.abs(hash % 300000)).toLocaleTimeString(),
      },
      {
        name: "1inch",
        logo: "1️⃣",
        url: `https://app.1inch.io/#/1/swap/ETH/${tokenAddress}`,
        price: basePrice * (1 + (Math.abs((hash >> 12) % 15) - 7) / 1000),
        volume24h: Math.abs((hash >> 16) % 4000000),
        liquidity: Math.abs((hash >> 20) % 12000000),
        spread: Math.abs((hash >> 24) % 80) / 100,
        fees: {
          trading: 0.1,
          gas: Math.abs((hash >> 28) % 35) + 30,
          slippage: Math.abs(hash % 120) / 100,
        },
        securityRating: 92,
        trustScore: 94,
        features: ["DEX Aggregator", "Best Price Routing", "Gas Optimization", "Limit Orders"],
        pros: ["Best prices", "Gas optimization", "Multiple DEX access"],
        cons: ["Complex routing", "Higher gas for complex swaps"],
        supported: true,
        lastUpdate: new Date(Date.now() - Math.abs((hash >> 4) % 300000)).toLocaleTimeString(),
      },
      {
        name: "Balancer",
        logo: "⚖️",
        url: `https://app.balancer.fi/#/trade/${tokenAddress}`,
        price: basePrice * (1 + (Math.abs((hash >> 16) % 20) - 10) / 1000),
        volume24h: Math.abs((hash >> 20) % 1500000),
        liquidity: Math.abs((hash >> 24) % 5000000),
        spread: Math.abs((hash >> 28) % 250) / 100,
        fees: {
          trading: 0.5,
          gas: Math.abs(hash % 45) + 35,
          slippage: Math.abs((hash >> 4) % 220) / 100,
        },
        securityRating: 87,
        trustScore: 90,
        features: ["Weighted Pools", "Stable Pools", "Boosted Pools", "Liquidity Mining"],
        pros: ["Flexible pool types", "Capital efficiency", "Governance tokens"],
        cons: ["Lower volume", "Complex pool mechanics"],
        supported: true,
        lastUpdate: new Date(Date.now() - Math.abs((hash >> 8) % 300000)).toLocaleTimeString(),
      },
    ]

    // Filter supported platforms
    const supportedPlatforms = platformsData.filter((p) => p.supported)

    // Generate arbitrage opportunities
    const opportunities: ArbitrageOpportunity[] = []
    for (let i = 0; i < supportedPlatforms.length; i++) {
      for (let j = i + 1; j < supportedPlatforms.length; j++) {
        const platform1 = supportedPlatforms[i]
        const platform2 = supportedPlatforms[j]

        if (Math.abs(platform1.price - platform2.price) > 0.0001) {
          const buyPlatform = platform1.price < platform2.price ? platform1 : platform2
          const sellPlatform = platform1.price < platform2.price ? platform2 : platform1
          const profitPercent = ((sellPlatform.price - buyPlatform.price) / buyPlatform.price) * 100

          if (profitPercent > 0.5) {
            // Only show opportunities > 0.5%
            opportunities.push({
              buyPlatform: buyPlatform.name,
              sellPlatform: sellPlatform.name,
              buyPrice: buyPlatform.price,
              sellPrice: sellPlatform.price,
              profitPercent,
              profitAmount: sellPlatform.price - buyPlatform.price,
              volume: Math.min(buyPlatform.liquidity, sellPlatform.liquidity) * 0.1,
              risk: profitPercent > 3 ? "high" : profitPercent > 1.5 ? "medium" : "low",
            })
          }
        }
      }
    }

    // Sort opportunities by profit
    opportunities.sort((a, b) => b.profitPercent - a.profitPercent)

    // Find best platform based on current sort criteria
    const best = supportedPlatforms.reduce((prev, current) => {
      switch (sortBy) {
        case "price":
          return current.price < prev.price ? current : prev
        case "volume":
          return current.volume24h > prev.volume24h ? current : prev
        case "liquidity":
          return current.liquidity > prev.liquidity ? current : prev
        case "fees":
          return current.fees.trading < prev.fees.trading ? current : prev
        case "security":
          return current.securityRating > prev.securityRating ? current : prev
        default:
          return current.volume24h > prev.volume24h ? current : prev
      }
    })

    setPlatforms(supportedPlatforms)
    setArbitrageOpportunities(opportunities.slice(0, 3))
    setBestPlatform(best)
  }

  useEffect(() => {
    if (tokenAddress && tokenSymbol) {
      generatePlatformData()
    }
  }, [tokenAddress, tokenSymbol, blockchain, currentPrice, sortBy])

  const refreshData = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    generatePlatformData()
    setLastUpdate(new Date())
    setIsLoading(false)
  }

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      case "medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "high":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 80) return "text-yellow-400"
    if (score >= 70) return "text-orange-400"
    return "text-red-400"
  }

  if (!tokenAddress || !tokenSymbol) {
    return (
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6 text-center">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">Trading platform data will appear here when scanning tokens</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Best Platform Recommendation */}
      {bestPlatform && (
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Recommended Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{bestPlatform.logo}</span>
                <div>
                  <h3 className="text-white font-bold text-xl">{bestPlatform.name}</h3>
                  <p className="text-gray-400">Best for {sortBy}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">${bestPlatform.price.toFixed(8)}</div>
                <div className="text-sm text-gray-400">Current Price</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-2 rounded bg-white/5">
                <div className="text-white font-medium">{formatNumber(bestPlatform.volume24h)}</div>
                <div className="text-xs text-gray-400">24h Volume</div>
              </div>
              <div className="text-center p-2 rounded bg-white/5">
                <div className="text-white font-medium">{formatNumber(bestPlatform.liquidity)}</div>
                <div className="text-xs text-gray-400">Liquidity</div>
              </div>
              <div className="text-center p-2 rounded bg-white/5">
                <div className="text-white font-medium">{bestPlatform.fees.trading}%</div>
                <div className="text-xs text-gray-400">Trading Fee</div>
              </div>
              <div className="text-center p-2 rounded bg-white/5">
                <div className={`font-medium ${getScoreColor(bestPlatform.securityRating)}`}>
                  {bestPlatform.securityRating}
                </div>
                <div className="text-xs text-gray-400">Security</div>
              </div>
            </div>

            <Button
              asChild
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <a href={bestPlatform.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Trade on {bestPlatform.name}
              </a>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Platform Comparison */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <ArrowUpDown className="w-5 h-5 text-green-400" />
              Platform Comparison
            </CardTitle>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="volume">Sort by Volume</option>
                <option value="price">Sort by Price</option>
                <option value="liquidity">Sort by Liquidity</option>
                <option value="fees">Sort by Fees</option>
                <option value="security">Sort by Security</option>
              </select>
              <Button
                variant="ghost"
                size="sm"
                onClick={refreshData}
                disabled={isLoading}
                className="text-gray-400 hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-400">Last updated: {lastUpdate.toLocaleTimeString()}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platforms.map((platform, i) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{platform.logo}</span>
                    <div>
                      <h4 className="text-white font-medium">{platform.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${getScoreColor(platform.securityRating)} bg-transparent border`}>
                          Security: {platform.securityRating}
                        </Badge>
                        <Badge className={`text-xs ${getScoreColor(platform.trustScore)} bg-transparent border`}>
                          Trust: {platform.trustScore}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">${platform.price.toFixed(8)}</div>
                    <div className="text-xs text-gray-400">Updated: {platform.lastUpdate}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                  <div>
                    <div className="text-sm text-gray-400">24h Volume</div>
                    <div className="text-white font-medium">{formatNumber(platform.volume24h)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Liquidity</div>
                    <div className="text-white font-medium">{formatNumber(platform.liquidity)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Spread</div>
                    <div className="text-white font-medium">{platform.spread.toFixed(2)}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Trading Fee</div>
                    <div className="text-white font-medium">{platform.fees.trading}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Est. Gas</div>
                    <div className="text-white font-medium">${platform.fees.gas}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 className="text-white text-sm font-medium mb-2">Pros:</h5>
                    <ul className="text-sm text-green-400 space-y-1">
                      {platform.pros.map((pro, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">+</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-medium mb-2">Cons:</h5>
                    <ul className="text-sm text-red-400 space-y-1">
                      {platform.cons.map((con, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-red-500 mt-0.5">-</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {platform.features.slice(0, 3).map((feature, j) => (
                      <Badge key={j} variant="secondary" className="text-xs bg-white/10 text-gray-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <a href={platform.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Trade
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Arbitrage Opportunities */}
      {arbitrageOpportunities.length > 0 && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Arbitrage Opportunities
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 text-xs">
                {arbitrageOpportunities.length} found
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {arbitrageOpportunities.map((opportunity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-lg border ${getRiskColor(opportunity.risk)}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getRiskColor(opportunity.risk)}>{opportunity.risk.toUpperCase()} RISK</Badge>
                        <span className="text-green-400 font-bold">+{opportunity.profitPercent.toFixed(2)}%</span>
                      </div>
                      <p className="text-white text-sm">
                        Buy on <strong>{opportunity.buyPlatform}</strong> → Sell on{" "}
                        <strong>{opportunity.sellPlatform}</strong>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">+${opportunity.profitAmount.toFixed(6)}</div>
                      <div className="text-xs text-gray-400">Profit per token</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Buy Price</span>
                      <div className="text-white font-medium">${opportunity.buyPrice.toFixed(8)}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Sell Price</span>
                      <div className="text-white font-medium">${opportunity.sellPrice.toFixed(8)}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Max Volume</span>
                      <div className="text-white font-medium">{formatNumber(opportunity.volume)}</div>
                    </div>
                  </div>

                  {opportunity.risk === "high" && (
                    <div className="mt-3 p-2 rounded bg-red-500/10 border border-red-500/20">
                      <div className="flex items-center gap-2 text-red-400 text-xs">
                        <AlertTriangle className="w-3 h-3" />
                        <span>High risk: Large price difference may indicate low liquidity or technical issues</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trading Tips */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Trading Tips & Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-medium mb-2">Before Trading:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Check liquidity depth to avoid high slippage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Compare prices across multiple platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Consider gas fees in your profit calculations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Set appropriate slippage tolerance (1-3%)</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Risk Management:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Start with small amounts for new tokens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Use limit orders when possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Monitor for sandwich attacks on large trades</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Verify token contract before trading</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
