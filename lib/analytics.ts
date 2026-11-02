// Analytics event tracking for Token Eye
interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

class Analytics {
  private isEnabled = false

  constructor() {
    // Enable analytics in production or when explicitly enabled
    this.isEnabled = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true"
  }

  // Initialize analytics (can be extended with Google Analytics, Mixpanel, etc.)
  init() {
    if (!this.isEnabled) return

    // Initialize Google Analytics 4 if GA_MEASUREMENT_ID is provided
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      this.initGoogleAnalytics()
    }
  }

  private initGoogleAnalytics() {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (!measurementId) return

    // Load Google Analytics script
    const script = document.createElement("script")
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    script.async = true
    document.head.appendChild(script)

    // Initialize gtag
    window.gtag =
      window.gtag ||
      ((...args: any[]) => {
        ;(window.gtag.q = window.gtag.q || []).push(args)
      })
    window.gtag("js", new Date())
    window.gtag("config", measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    })
  }

  // Track page views
  trackPageView(path: string, title?: string) {
    if (!this.isEnabled) return

    this.track({
      event: "page_view",
      category: "navigation",
      action: "page_view",
      label: path,
      custom_parameters: {
        page_path: path,
        page_title: title || document.title,
      },
    })
  }

  // Track scan events
  trackScanStart(scanType: string, blockchain: string) {
    this.track({
      event: "scan_start",
      category: "security_scan",
      action: "scan_initiated",
      label: `${scanType}_${blockchain}`,
      custom_parameters: {
        scan_type: scanType,
        blockchain: blockchain,
      },
    })
  }

  trackScanComplete(scanType: string, blockchain: string, riskScore: number, trustScore: number, duration: number) {
    this.track({
      event: "scan_complete",
      category: "security_scan",
      action: "scan_completed",
      label: `${scanType}_${blockchain}`,
      value: duration,
      custom_parameters: {
        scan_type: scanType,
        blockchain: blockchain,
        risk_score: riskScore,
        trust_score: trustScore,
        scan_duration: duration,
      },
    })
  }

  trackScanError(scanType: string, blockchain: string, errorType: string) {
    this.track({
      event: "scan_error",
      category: "security_scan",
      action: "scan_failed",
      label: `${scanType}_${blockchain}_${errorType}`,
      custom_parameters: {
        scan_type: scanType,
        blockchain: blockchain,
        error_type: errorType,
      },
    })
  }

  // Track user interactions
  trackButtonClick(buttonName: string, location: string) {
    this.track({
      event: "button_click",
      category: "user_interaction",
      action: "click",
      label: `${buttonName}_${location}`,
      custom_parameters: {
        button_name: buttonName,
        location: location,
      },
    })
  }

  trackFeatureUsage(feature: string, action: string) {
    this.track({
      event: "feature_usage",
      category: "features",
      action: action,
      label: feature,
      custom_parameters: {
        feature_name: feature,
      },
    })
  }

  // Track PWA events
  trackPWAInstall() {
    this.track({
      event: "pwa_install",
      category: "pwa",
      action: "install",
      label: "app_installed",
    })
  }

  trackPWAPromptShown() {
    this.track({
      event: "pwa_prompt_shown",
      category: "pwa",
      action: "prompt_displayed",
      label: "install_prompt",
    })
  }

  // Track rate limiting
  trackRateLimit(remainingRequests: number) {
    this.track({
      event: "rate_limit_hit",
      category: "api_usage",
      action: "rate_limit",
      value: remainingRequests,
      custom_parameters: {
        remaining_requests: remainingRequests,
      },
    })
  }

  // Generic event tracking
  private track(event: AnalyticsEvent) {
    if (!this.isEnabled) {
      return
    }

    // Send to Google Analytics if available
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.custom_parameters,
      })
    }

    // Send to other analytics providers here
    // Example: Mixpanel, Amplitude, etc.
  }

  // Track user journey through scan process
  trackScanJourney(step: "landing" | "form" | "scanning" | "results" | "export") {
    this.track({
      event: "scan_journey",
      category: "user_journey",
      action: "step_reached",
      label: step,
      custom_parameters: {
        journey_step: step,
      },
    })
  }
}

// Export singleton instance
export const analytics = new Analytics()

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
