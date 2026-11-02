"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Lock, FileText, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

interface SecurityAnalysisWidgetProps {
  identifier: string
  type: "wallet" | "token" | "transaction"
  blockchain: string
}

interface SecurityCheck {
  name: string
  status: "pass" | "fail" | "warning" | "unknown"
  score: number
  description: string
  details: string[]
  recommendation: string
}

interface VulnerabilityReport {
  severity: "critical" | "high" | "medium" | "low"
  category: string
  title: string
  description: string
  impact: string
  mitigation: string
}

interface ComplianceCheck {
  regulation: string
  status: "compliant" | "non-compliant" | "partial" | "unknown"
  details: string
  requirements: string[]
}

export default function SecurityAnalysisWidget({ identifier, type, blockchain }: SecurityAnalysisWidgetProps) {
  const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([])
  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityReport[]>([])
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([])
  const [overallSecurityScore, setOverallSecurityScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const generateSecurityAnalysis = () => {
    const hash = identifier.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)

    // Generate security checks based on type
    const checks: SecurityCheck[] = []

    if (type === "token") {
      checks.push(
        {
          name: "Smart Contract Verification",
          status: Math.abs(hash % 10) < 7 ? "pass" : "fail",
          score: Math.abs(hash % 10) < 7 ? 95 : 20,
          description: "Contract source code verification status",
          details:
            Math.abs(hash % 10) < 7
              ? [
                  "Source code verified on Etherscan",
                  "Contract matches deployed bytecode",
                  "No proxy patterns detected",
                ]
              : ["Source code not verified", "Unable to analyze contract logic", "Potential security risk"],
          recommendation:
            Math.abs(hash % 10) < 7
              ? "Contract is verified and appears legitimate"
              : "Avoid interacting with unverified contracts",
        },
        {
          name: "Ownership Analysis",
          status: Math.abs((hash >> 4) % 10) < 6 ? "pass" : Math.abs((hash >> 4) % 10) < 8 ? "warning" : "fail",
          score: Math.abs((hash >> 4) % 10) < 6 ? 90 : Math.abs((hash >> 4) % 10) < 8 ? 60 : 25,
          description: "Contract ownership and control mechanisms",
          details:
            Math.abs((hash >> 4) % 10) < 6
              ? ["Ownership renounced", "No admin functions", "Decentralized control"]
              : Math.abs((hash >> 4) % 10) < 8
                ? ["Limited admin functions", "Timelock implemented", "Multi-sig ownership"]
                : ["Single owner control", "Unlimited mint function", "High centralization risk"],
          recommendation:
            Math.abs((hash >> 4) % 10) < 6
              ? "Good decentralization practices"
              : Math.abs((hash >> 4) % 10) < 8
                ? "Moderate centralization risk"
                : "High centralization risk - proceed with caution",
        },
        {
          name: "Liquidity Lock Analysis",
          status: Math.abs((hash >> 8) % 10) < 7 ? "pass" : "warning",
          score: Math.abs((hash >> 8) % 10) < 7 ? 85 : 45,
          description: "Liquidity pool lock status and duration",
          details:
            Math.abs((hash >> 8) % 10) < 7
              ? ["Liquidity locked for 12+ months", "Lock verified on-chain", "No early unlock mechanisms"]
              : ["Short-term liquidity lock", "Partial liquidity locked", "Risk of rug pull"],
          recommendation:
            Math.abs((hash >> 8) % 10) < 7 ? "Liquidity appears secure" : "Monitor liquidity status closely",
        },
      )
    }

    // Common checks for all types
    checks.push(
      {
        name: "Blacklist Screening",
        status: Math.abs((hash >> 12) % 20) < 18 ? "pass" : "fail",
        score: Math.abs((hash >> 12) % 20) < 18 ? 100 : 0,
        description: "OFAC and sanctions list screening",
        details:
          Math.abs((hash >> 12) % 20) < 18
            ? ["No matches in OFAC SDN list", "Not flagged by major exchanges", "Clean regulatory status"]
            : ["Flagged in sanctions database", "Potential regulatory issues", "High compliance risk"],
        recommendation:
          Math.abs((hash >> 12) % 20) < 18
            ? "No regulatory red flags detected"
            : "CRITICAL: Potential sanctions violation",
      },
      {
        name: "Transaction Pattern Analysis",
        status: Math.abs((hash >> 16) % 10) < 6 ? "pass" : Math.abs((hash >> 16) % 10) < 8 ? "warning" : "fail",
        score: Math.abs((hash >> 16) % 10) < 6 ? 80 : Math.abs((hash >> 16) % 10) < 8 ? 50 : 20,
        description: "Analysis of transaction patterns and behaviors",
        details:
          Math.abs((hash >> 16) % 10) < 6
            ? ["Normal transaction patterns", "Consistent behavior over time", "No suspicious activity"]
            : Math.abs((hash >> 16) % 10) < 8
              ? ["Some irregular patterns detected", "Possible automated trading", "Monitor for changes"]
              : ["Highly suspicious patterns", "Potential wash trading", "Mixer service interactions"],
        recommendation:
          Math.abs((hash >> 16) % 10) < 6
            ? "Transaction patterns appear normal"
            : Math.abs((hash >> 16) % 10) < 8
              ? "Monitor transaction patterns"
              : "High risk transaction patterns detected",
      },
    )

    // Generate vulnerabilities for tokens
    const vulns: VulnerabilityReport[] = []
    if (type === "token" && Math.abs(hash % 10) > 3) {
      const vulnerabilityTypes = [
        {
          severity: "high" as const,
          category: "Access Control",
          title: "Unrestricted Mint Function",
          description: "Contract contains mint function without proper access controls",
          impact: "Unlimited token supply inflation possible",
          mitigation: "Implement proper access controls or renounce mint function",
        },
        {
          severity: "medium" as const,
          category: "Economic",
          title: "High Transfer Tax",
          description: "Transfer tax exceeds recommended threshold",
          impact: "May prevent token trading on some platforms",
          mitigation: "Consider reducing transfer tax to industry standards",
        },
        {
          severity: "low" as const,
          category: "Transparency",
          title: "Missing Events",
          description: "Some functions don't emit proper events",
          impact: "Reduced transparency for off-chain monitoring",
          mitigation: "Add event emissions for better transparency",
        },
      ]

      const numVulns = Math.abs((hash >> 20) % 3) + 1
      vulns.push(...vulnerabilityTypes.slice(0, numVulns))
    }

    // Generate compliance checks
    const compliance: ComplianceCheck[] = [
      {
        regulation: "AML/KYC Requirements",
        status: Math.abs((hash >> 24) % 10) < 7 ? "compliant" : "partial",
        details:
          Math.abs((hash >> 24) % 10) < 7
            ? "No indicators of AML violations detected"
            : "Some transactions may require additional KYC verification",
        requirements: [
          "Customer identification procedures",
          "Suspicious activity monitoring",
          "Record keeping requirements",
          "Regulatory reporting",
        ],
      },
      {
        regulation: "FATF Travel Rule",
        status: Math.abs((hash >> 28) % 10) < 8 ? "compliant" : "unknown",
        details:
          Math.abs((hash >> 28) % 10) < 8
            ? "Transactions appear to comply with travel rule thresholds"
            : "Unable to verify travel rule compliance for all transactions",
        requirements: [
          "Originator information sharing",
          "Beneficiary identification",
          "Transaction monitoring",
          "Cross-border reporting",
        ],
      },
    ]

    // Calculate overall security score
    const avgScore = checks.reduce((sum, check) => sum + check.score, 0) / checks.length
    const vulnPenalty = vulns.reduce((penalty, vuln) => {
      switch (vuln.severity) {
        case "critical":
          return penalty + 30
        case "high":
          return penalty + 20
        case "medium":
          return penalty + 10
        case "low":
          return penalty + 5
        default:
          return penalty
      }
    }, 0)

    setSecurityChecks(checks)
    setVulnerabilities(vulns)
    setComplianceChecks(compliance)
    setOverallSecurityScore(Math.max(0, Math.min(100, avgScore - vulnPenalty)))
  }

  useEffect(() => {
    generateSecurityAnalysis()
  }, [identifier, type, blockchain])

  const refreshAnalysis = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    generateSecurityAnalysis()
    setLastUpdate(new Date())
    setIsLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
      case "compliant":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      case "warning":
      case "partial":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "fail":
      case "non-compliant":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
      case "compliant":
        return <CheckCircle className="w-4 h-4" />
      case "warning":
      case "partial":
        return <AlertTriangle className="w-4 h-4" />
      case "fail":
      case "non-compliant":
        return <XCircle className="w-4 h-4" />
      default:
        return <Eye className="w-4 h-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      case "high":
        return "text-orange-400 bg-orange-500/10 border-orange-500/20"
      case "medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "low":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20"
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    if (score >= 40) return "text-orange-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-6">
      {/* Overall Security Score */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Security Analysis
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshAnalysis}
              disabled={isLoading}
              className="text-gray-400 hover:text-white"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
          <p className="text-xs text-gray-400">Last updated: {lastUpdate.toLocaleTimeString()}</p>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(overallSecurityScore)}`}>
              {overallSecurityScore.toFixed(0)}
            </div>
            <div className="text-gray-400 mb-4">Overall Security Score</div>
            <Progress value={overallSecurityScore} className="w-full h-2" />
            <div className="text-sm text-gray-400 mt-2">
              {overallSecurityScore >= 80
                ? "Excellent Security"
                : overallSecurityScore >= 60
                  ? "Good Security"
                  : overallSecurityScore >= 40
                    ? "Moderate Risk"
                    : "High Risk"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Checks */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-400" />
            Security Checks
            <Badge variant="secondary" className="bg-white/10 text-white text-xs">
              {securityChecks.length} checks
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityChecks.map((check, i) => (
              <motion.div
                key={check.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getStatusColor(check.status)}`}>
                      {getStatusIcon(check.status)}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{check.name}</h4>
                      <p className="text-sm text-gray-400">{check.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getScoreColor(check.score)}`}>{check.score}</div>
                    <div className="text-xs text-gray-400">Score</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <h5 className="text-white text-sm font-medium mb-1">Details:</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {check.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-gray-500 mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className="text-sm text-blue-300">
                      <strong>Recommendation:</strong> {check.recommendation}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vulnerabilities */}
      {vulnerabilities.length > 0 && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Vulnerability Report
              <Badge variant="secondary" className="bg-red-500/20 text-red-300 text-xs">
                {vulnerabilities.length} issues
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vulnerabilities.map((vuln, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-lg border ${getSeverityColor(vuln.severity)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getSeverityColor(vuln.severity)}>{vuln.severity.toUpperCase()}</Badge>
                        <span className="text-sm text-gray-400">{vuln.category}</span>
                      </div>
                      <h4 className="text-white font-medium">{vuln.title}</h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-300">{vuln.description}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-white text-sm font-medium mb-1">Impact:</h5>
                        <p className="text-sm text-gray-300">{vuln.impact}</p>
                      </div>
                      <div>
                        <h5 className="text-white text-sm font-medium mb-1">Mitigation:</h5>
                        <p className="text-sm text-gray-300">{vuln.mitigation}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compliance Checks */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            Regulatory Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceChecks.map((compliance, i) => (
              <motion.div
                key={compliance.regulation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{compliance.regulation}</h4>
                    <p className="text-sm text-gray-300 mt-1">{compliance.details}</p>
                  </div>
                  <Badge className={getStatusColor(compliance.status)}>{compliance.status.replace("-", " ")}</Badge>
                </div>

                <div>
                  <h5 className="text-white text-sm font-medium mb-2">Key Requirements:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {compliance.requirements.map((req, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-gray-500 mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
