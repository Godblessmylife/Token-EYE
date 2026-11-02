"use client"

import { useState, useEffect } from "react"
import { X, Download, Smartphone } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if device is iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    // Check if app is already installed (standalone mode)
    const standalone = window.matchMedia("(display-mode: standalone)").matches
    setIsStandalone(standalone)

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Show iOS prompt if on iOS and not standalone
    if (iOS && !standalone) {
      const hasSeenPrompt = localStorage.getItem("pwa-ios-prompt-seen")
      if (!hasSeenPrompt) {
        setShowPrompt(true)
      }
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setDeferredPrompt(null)
        setShowPrompt(false)
      }
    }
  }

  const handleClose = () => {
    setShowPrompt(false)
    if (isIOS) {
      localStorage.setItem("pwa-ios-prompt-seen", "true")
    }
  }

  if (!showPrompt || isStandalone) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Установить Token Eye</h3>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
          Установите приложение для быстрого доступа и работы без интернета
        </p>

        {isIOS ? (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p className="mb-2">Для установки на iOS:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Нажмите кнопку "Поделиться" в Safari</li>
              <li>Выберите "На экран Домой"</li>
              <li>Нажмите "Добавить"</li>
            </ol>
          </div>
        ) : (
          <button
            onClick={handleInstallClick}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Установить приложение</span>
          </button>
        )}
      </div>
    </div>
  )
}
