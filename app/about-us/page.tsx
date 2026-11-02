import AboutUsHero from "@/components/about-us-hero"
import AboutUsContent from "@/components/about-us-content"
import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/sparkles"

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <AboutUsHero />
        <AboutUsContent />
      </div>
    </main>
  )
}
