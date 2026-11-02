interface ScanRequest {
  identifier: string
  type: "wallet" | "token" | "transaction"
  blockchain: string
}

interface ScanResult {
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

interface RateLimitEntry {
  count: number
  resetTime: number
}

class ScanDataProvider {
  private rateLimitMap = new Map<string, RateLimitEntry>()
  private readonly RATE_LIMIT = 10 // requests per hour
  private readonly RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

  // Validation patterns for different identifier types
  private readonly VALIDATION_PATTERNS = {
    wallet: {
      ethereum: /^0x[a-fA-F0-9]{40}$/,
      bsc: /^0x[a-fA-F0-9]{40}$/,
      polygon: /^0x[a-fA-F0-9]{40}$/,
      avalanche: /^0x[a-fA-F0-9]{40}$/,
      arbitrum: /^0x[a-fA-F0-9]{40}$/,
      optimism: /^0x[a-fA-F0-9]{40}$/,
      cardano: /^addr1[a-z0-9]{98}$/,
    },
    token: {
      ethereum: /^0x[a-fA-F0-9]{40}$/,
      bsc: /^0x[a-fA-F0-9]{40}$/,
      polygon: /^0x[a-fA-F0-9]{40}$/,
      avalanche: /^0x[a-fA-F0-9]{40}$/,
      arbitrum: /^0x[a-fA-F0-9]{40}$/,
      optimism: /^0x[a-fA-F0-9]{40}$/,
      cardano: /^[a-fA-F0-9]{56}$/,
    },
    transaction: {
      ethereum: /^0x[a-fA-F0-9]{64}$/,
      bsc: /^0x[a-fA-F0-9]{64}$/,
      polygon: /^0x[a-fA-F0-9]{64}$/,
      avalanche: /^0x[a-fA-F0-9]{64}$/,
      arbitrum: /^0x[a-fA-F0-9]{64}$/,
      optimism: /^0x[a-fA-F0-9]{64}$/,
      cardano: /^[a-fA-F0-9]{64}$/,
    },
  }

  private getClientId(): string {
    // In a real implementation, this would use IP address or user session
    return typeof window !== "undefined" ? "browser-client" : "server-client"
  }

  private checkRateLimit(clientId: string): boolean {
    const now = Date.now()
    const entry = this.rateLimitMap.get(clientId)

    if (!entry || now > entry.resetTime) {
      // Reset or create new entry
      this.rateLimitMap.set(clientId, {
        count: 1,
        resetTime: now + this.RATE_LIMIT_WINDOW,
      })
      return true
    }

    if (entry.count >= this.RATE_LIMIT) {
      return false
    }

    entry.count++
    return true
  }

  validateInput(request: ScanRequest): { isValid: boolean; error?: string } {
    const { identifier, type, blockchain } = request

    if (!identifier || !type || !blockchain) {
      return { isValid: false, error: "Missing required fields" }
    }

    const pattern = this.VALIDATION_PATTERNS[type]?.[blockchain as keyof typeof this.VALIDATION_PATTERNS.wallet]

    if (!pattern) {
      return { isValid: false, error: `Unsupported blockchain: ${blockchain}` }
    }

    if (!pattern.test(identifier)) {
      return { isValid: false, error: `Invalid ${type} format for ${blockchain}` }
    }

    return { isValid: true }
  }

  private generateMockFactors(identifier: string, type: string, blockchain: string) {
    const riskFactors = [
      {
        type: "risk" as const,
        description: "Associated with high-risk exchanges",
        source: "Chainalysis",
        sourceUrl: "https://chainalysis.com",
        severity: "high" as const,
      },
      {
        type: "risk" as const,
        description: "Recent interaction with mixer services",
        source: "Elliptic",
        sourceUrl: "https://elliptic.co",
        severity: "medium" as const,
      },
      {
        type: "risk" as const,
        description: "Flagged in sanctions screening",
        source: "OFAC Database",
        sourceUrl: "https://ofac.treasury.gov",
        severity: "high" as const,
      },
      {
        type: "risk" as const,
        description: "Multiple small transactions pattern",
        source: "Crystal Blockchain",
        sourceUrl: "https://crystalblockchain.com",
        severity: "low" as const,
      },
    ]

    const trustFactors = [
      {
        type: "trust" as const,
        description: "Long transaction history (2+ years)",
        source: "Etherscan",
        sourceUrl: "https://etherscan.io",
        severity: "low" as const,
      },
      {
        type: "trust" as const,
        description: "Verified by multiple DeFi protocols",
        source: "DeFiPulse",
        sourceUrl: "https://defipulse.com",
        severity: "low" as const,
      },
      {
        type: "trust" as const,
        description: "Active in legitimate DeFi protocols",
        source: "DeBank",
        sourceUrl: "https://debank.com",
        severity: "low" as const,
      },
      {
        type: "trust" as const,
        description: "Consistent transaction patterns",
        source: "Nansen",
        sourceUrl: "https://nansen.ai",
        severity: "low" as const,
      },
    ]

    // Generate deterministic but varied results based on identifier
    const hash = identifier.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)

    const numRiskFactors = Math.abs(hash % 3) + 1
    const numTrustFactors = Math.abs((hash >> 8) % 3) + 1

    const selectedRiskFactors = riskFactors.slice(0, numRiskFactors)
    const selectedTrustFactors = trustFactors.slice(0, numTrustFactors)

    return [...selectedRiskFactors, ...selectedTrustFactors]
  }

  private calculateScores(factors: any[]) {
    const riskFactors = factors.filter((f) => f.type === "risk")
    const trustFactors = factors.filter((f) => f.type === "trust")

    let riskScore = 0
    riskFactors.forEach((factor) => {
      switch (factor.severity) {
        case "high":
          riskScore += 30
          break
        case "medium":
          riskScore += 20
          break
        case "low":
          riskScore += 10
          break
      }
    })

    let trustScore = 0
    trustFactors.forEach((factor) => {
      switch (factor.severity) {
        case "low":
          trustScore += 25
          break
        case "medium":
          trustScore += 15
          break
        case "high":
          trustScore += 10
          break
      }
    })

    // Normalize scores to 0-100 range
    riskScore = Math.min(riskScore, 100)
    trustScore = Math.min(trustScore, 100)

    return { riskScore, trustScore }
  }

  async scanIdentifier(request: ScanRequest): Promise<ScanResult> {
    const clientId = this.getClientId()

    // Check rate limit
    if (!this.checkRateLimit(clientId)) {
      throw new Error("Rate limit exceeded. Please try again later.")
    }

    // Validate input
    const validation = this.validateInput(request)
    if (!validation.isValid) {
      throw new Error(validation.error)
    }

    // Simulate API delay (2-4 seconds)
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000 + 2000))

    // Generate mock data
    const factors = this.generateMockFactors(request.identifier, request.type, request.blockchain)
    const { riskScore, trustScore } = this.calculateScores(factors)

    const overallRisk: "low" | "medium" | "high" = riskScore >= 70 ? "high" : riskScore >= 40 ? "medium" : "low"

    return {
      riskScore,
      trustScore,
      factors,
      blockchain: request.blockchain,
      type: request.type,
      identifier: request.identifier,
      timestamp: new Date().toLocaleString(),
      overallRisk,
    }
  }

  getRemainingRequests(clientId?: string): number {
    const id = clientId || this.getClientId()
    const entry = this.rateLimitMap.get(id)

    if (!entry || Date.now() > entry.resetTime) {
      return this.RATE_LIMIT
    }

    return Math.max(0, this.RATE_LIMIT - entry.count)
  }

  getResetTime(clientId?: string): number {
    const id = clientId || this.getClientId()
    const entry = this.rateLimitMap.get(id)

    if (!entry || Date.now() > entry.resetTime) {
      return 0
    }

    return entry.resetTime
  }
}

// Export singleton instance
export const scanDataProvider = new ScanDataProvider()
export type { ScanRequest, ScanResult }
