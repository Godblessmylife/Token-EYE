"use client"
import { SparklesCore } from "@/components/sparkles"

export function DarkSparkles() {
  return (
    <SparklesCore
      background="transparent"
      minSize={0.4}
      maxSize={1}
      particleDensity={80}
      className="w-full h-full"
      particleColor="#FFFFFF"
    />
  )
}
