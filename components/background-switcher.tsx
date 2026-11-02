"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, SparklesIcon } from "lucide-react"

export function BackgroundSwitcher() {
  const [background, setBackground] = useState<"light" | "dark" | "animated">("animated")

  useEffect(() => {
    const saved = localStorage.getItem("background-preference")
    if (saved) {
      setBackground(saved as "light" | "dark" | "animated")
    }
  }, [])

  const handleBackgroundChange = (newBg: "light" | "dark" | "animated") => {
    setBackground(newBg)
    localStorage.setItem("background-preference", newBg)
  }

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 bg-slate-800/80 backdrop-blur-sm rounded-lg p-2 border border-slate-700/50">
      <Button
        size="sm"
        variant={background === "light" ? "default" : "ghost"}
        onClick={() => handleBackgroundChange("light")}
        className="w-full justify-start"
        title="Light Background"
      >
        <Sun className="w-4 h-4 mr-2" />
        Light
      </Button>
      <Button
        size="sm"
        variant={background === "dark" ? "default" : "ghost"}
        onClick={() => handleBackgroundChange("dark")}
        className="w-full justify-start"
        title="Dark Background"
      >
        <Moon className="w-4 h-4 mr-2" />
        Dark
      </Button>
      <Button
        size="sm"
        variant={background === "animated" ? "default" : "ghost"}
        onClick={() => handleBackgroundChange("animated")}
        className="w-full justify-start"
        title="Animated Background"
      >
        <SparklesIcon className="w-4 h-4 mr-2" />
        Stars
      </Button>
    </div>
  )
}

export function useBackground() {
  const [background, setBackground] = useState<"light" | "dark" | "animated">("animated")

  useEffect(() => {
    const saved = localStorage.getItem("background-preference")
    if (saved) {
      setBackground(saved as "light" | "dark" | "animated")
    }

    const handleStorage = () => {
      const saved = localStorage.getItem("background-preference")
      if (saved) {
        setBackground(saved as "light" | "dark" | "animated")
      }
    }

    window.addEventListener("storage", handleStorage)
    const interval = setInterval(handleStorage, 100)

    return () => {
      window.removeEventListener("storage", handleStorage)
      clearInterval(interval)
    }
  }, [])

  return background
}
