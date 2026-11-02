"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, BarChart3, Activity, RefreshCw, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

interface MarketDataWidgetProps {
  tokenAddress?: string
  blockchain?: string
  tokenSymbol?: string
}

interface MarketTrend {
  period: string
  change: number
  volume: number
  high: number
  low: number
}

interface LiquidityData {
  platform: string
  pair: string
  liquidity: number
  volume24h: number
  apy: number
  fees24h: number
}

interface MarketAlert {
  type: "price" | "volume" | "liquidity"
  severity: "info" | "warning" | "critical"
  message: string
  timestamp: string
}

export default function MarketDataWidget({ tokenAddress, blockchain, tokenSymbol }: MarketDataWidgetProps) {
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([])
  const [liquidityData, setLiquidityData] = useState<LiquidityData[]>([])
  const [marketAlerts, setMarketAlerts] = useState<MarketAlert[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const generateMarketData = () => {
    if (!tokenAddress) return

    const hash = tokenAddress.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)

    // Generate market trends
    const periods = ["1h", "24h", "7d", "30d"]
    const trends = periods.map((period, i) => ({
      period,
      change: (Math.abs((hash >> (i * 4)) % 200) - 100) / 10, // -10% to +10%
      volume: Math.abs((hash >> (i * 6)) % 10000000),
      high: 0.001 + Math.abs((hash >> (i * 3)) % 1000) / 1000000,
      low: 0.0005 + Math.abs((hash >> (i * 5)) % 500) / 1000000,
    }))

    // Generate liquidity data
    const platforms = ["Uniswap V3", "PancakeSwap", "SushiSwap", "Balancer", "Curve"]
    const liquidity = platforms.slice(0, 3).map((platform, i) => ({
      platform,
      pair: `${tokenSymbol || "TOKEN"}/ETH`,
      liquidity: Math.abs((hash >> (i * 8)) % 5000000),
      volume24h: Math.abs((hash >> (i * 6)) % 1000000),
      apy: Math.abs((hash >> (i * 4)) % 500) / 10, // 0-50% APY
      fees24h: Math.abs((hash >> (i * 7)) % 10000),
    }))

    // Generate market alerts
    const alertTypes = [
      {
        type: "price" as const,
        severity: "warning" as const,
        message: "Price volatility increased by 25% in last hour",
      },
      { type: "volume" as const, severity: "info" as const, message: "Trading volume up 150% compared to 24h average" },
      {
        type: "liquidity" as const,
        severity: "critical" as const,
        message: "Major liquidity withdrawal detected on Uniswap",
      },
    ]

    const alerts = alertTypes.slice(0, Math.abs(hash % 3) + 1).map((alert, i) => ({
      ...alert,
      timestamp: new Date(Date.now() - Math.abs((hash >> (i * 8)) % 3600000)).toLocaleTimeString(),
    }))

    setMarketTrends(trends)
    setLiquidityData(liquidity)
    setMarketAlerts(alerts)
  }

  useEffect(() => {
    if (tokenAddress) {
      generateMarketData()
    }
  }, [tokenAddress, blockchain, tokenSymbol])

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    generateMarketData()
    setLastUpdate(new Date())
    setIsLoading(false)
  }

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      case "warning":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      default:
        return "text-blue-400 bg-blue-500/10 border-blue-500/20"
    }
  }

  if (!tokenAddress) {
    return (
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6 text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">Market data will appear here when scanning tokens</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Market Trends */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Market Trends
            </CardTitle>
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
          <p className="text-xs text-gray-400">Last updated: {lastUpdate.toLocaleTimeString()}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {marketTrends.map((trend, i) => (
              <motion.div
                key={trend.period}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">{trend.period}</span>
                  {trend.change >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div className={`text-lg font-bold ${trend.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {trend.change >= 0 ? "+" : ""}
                  {trend.change.toFixed(2)}%
                </div>
                <div className="text-xs text-gray-400">Vol: {formatNumber(trend.volume)}</div>
                <div className="text-xs text-gray-400 mt-1">
                  H: ${trend.high.toFixed(6)} L: ${trend.low.toFixed(6)}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Liquidity Analysis */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Liquidity Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {liquidityData.map((pool, i) => (
              <motion.div
                key={pool.platform}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{pool.platform}</h4>
                    <p className="text-sm text-gray-400">{pool.pair}</p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {pool.apy.toFixed(1)}% APY
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Liquidity</span>
                    <div className="text-white font-medium">{formatNumber(pool.liquidity)}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">24h Volume</span>
                    <div className="text-white font-medium">{formatNumber(pool.volume24h)}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">24h Fees</span>
                    <div className="text-white font-medium">{formatNumber(pool.fees24h)}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Alerts */}
      {marketAlerts.length > 0 && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Market Alerts
              <Badge variant="secondary" className="bg-white/10 text-white text-xs">
                {marketAlerts.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {marketAlerts.map((alert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-3 rounded-lg border ${getAlertColor(alert.severity)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`text-xs ${getAlertColor(alert.severity)}`}>{alert.type.toUpperCase()}</Badge>
                        <span className="text-xs text-gray-400">{alert.timestamp}</span>
                      </div>
                      <p className="text-sm text-white">{alert.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
