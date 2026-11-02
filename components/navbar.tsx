"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, ChevronDown, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import Image from "next/image"

// Declare the triggerHapticFeedback function here
const triggerHapticFeedback = (type: "light" | "medium" | "heavy" = "medium") => {
  if ("vibrate" in navigator) {
    // Different vibration patterns for different feedback types
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
    }
    navigator.vibrate(patterns[type])
  }

  // For iOS devices that support haptic feedback
  if ("hapticFeedback" in window) {
    try {
      // @ts-ignore - hapticFeedback is not in TypeScript definitions
      window.hapticFeedback.impact({ style: type })
    } catch (error) {
      // Silently fail if haptic feedback is not available
    }
  }
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const toggleMobileMenu = () => {
    triggerHapticFeedback("light")
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isUpSwipe = distanceY > minSwipeDistance && Math.abs(distanceX) < Math.abs(distanceY)

    if (isUpSwipe && isMobileMenuOpen) {
      // Trigger haptic feedback before closing menu
      triggerHapticFeedback("light")
      closeMobileMenu()
    }
  }

  useEffect(() => {
    const mobileMenu = mobileMenuRef.current

    if (isMobileMenuOpen && mobileMenu) {
      // Add touch event listeners when menu is open
      mobileMenu.addEventListener("touchstart", onTouchStart, { passive: true })
      mobileMenu.addEventListener("touchmove", onTouchMove, { passive: true })
      mobileMenu.addEventListener("touchend", onTouchEnd, { passive: true })

      // Cleanup function
      return () => {
        mobileMenu.removeEventListener("touchstart", onTouchStart)
        mobileMenu.removeEventListener("touchmove", onTouchMove)
        mobileMenu.removeEventListener("touchend", onTouchEnd)
      }
    }
  }, [isMobileMenuOpen, touchStart, touchEnd])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        closeMobileMenu()
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [isMobileMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10 relative z-50"
      >
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-10 h-10 transition-transform duration-300 hover:scale-110">
            <Image
              src="/images/token-eye-logo.jpg"
              alt="Token Eye Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
          </div>
          <span className="text-white font-medium text-xl">Token Eye</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/about-us">About Us</NavLink>
          <NavLink href="/contact">Contact</NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-gray-300 hover:text-white transition-colors relative group flex items-center space-x-1 bg-transparent border-none outline-none">
              <span>Solution</span>
              <ChevronDown className="w-4 h-4" />
              <span className="ml-2 px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">
                Coming Soon
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/90 backdrop-blur-sm border border-white/10 text-white">
              <DropdownMenuItem className="hover:bg-purple-500/20 focus:bg-purple-500/20 opacity-60 cursor-not-allowed">
                <div className="w-full flex items-center justify-between">
                  <span>Transaction Monitoring (KYT)</span>
                  <span className="text-xs text-orange-400">In Dev</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-purple-500/20 focus:bg-purple-500/20 opacity-60 cursor-not-allowed">
                <div className="w-full flex items-center justify-between">
                  <span>Customer Verification (KYC)</span>
                  <span className="text-xs text-orange-400">In Dev</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-purple-500/20 focus:bg-purple-500/20 opacity-60 cursor-not-allowed">
                <div className="w-full flex items-center justify-between">
                  <span>Business Verification (KYB)</span>
                  <span className="text-xs text-orange-400">In Dev</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-purple-500/20 focus:bg-purple-500/20 opacity-60 cursor-not-allowed">
                <div className="w-full flex items-center justify-between">
                  <span>Business Regulation (RYV)</span>
                  <span className="text-xs text-orange-400">In Dev</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink href="/features">Features</NavLink>
          <NavLink href="/how-it-works">How it Works</NavLink>

          <Link href="/scan" className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative px-4 py-2 bg-black rounded-lg leading-none flex items-center">
              <span className="text-white font-medium">SCAN</span>
            </div>
          </Link>

          {/* Add glowing AI button */}
          <Link href="/ai-assistant" className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative px-4 py-2 bg-black rounded-lg leading-none flex items-center">
              <span className="text-white font-medium">AI</span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:text-purple-400" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Demo</Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/10"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-[76px] left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10 z-50 md:hidden max-h-[calc(100vh-76px)] overflow-y-auto"
          >
            <div className="px-6 py-4 space-y-4">
              {/* Swipe indicator */}
              <div className="flex justify-center mb-2">
                <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
              </div>

              <MobileNavLink href="/about-us" onClick={closeMobileMenu}>
                About Us
              </MobileNavLink>
              <MobileNavLink href="/contact" onClick={closeMobileMenu}>
                Contact
              </MobileNavLink>

              {/* Mobile Solution Dropdown */}
              <div className="space-y-2">
                <div className="text-white font-medium py-2 flex items-center space-x-2">
                  <span>Solution</span>
                  <span className="px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">
                    Coming Soon
                  </span>
                </div>
                <div className="pl-4 space-y-2">
                  <div className="text-gray-500 py-2 flex items-center justify-between opacity-60">
                    <span>Transaction Monitoring (KYT)</span>
                    <span className="text-xs text-orange-400">In Dev</span>
                  </div>
                  <div className="text-gray-500 py-2 flex items-center justify-between opacity-60">
                    <span>Customer Verification (KYC)</span>
                    <span className="text-xs text-orange-400">In Dev</span>
                  </div>
                  <div className="text-gray-500 py-2 flex items-center justify-between opacity-60">
                    <span>Business Verification (KYB)</span>
                    <span className="text-xs text-orange-400">In Dev</span>
                  </div>
                  <div className="text-gray-500 py-2 flex items-center justify-between opacity-60">
                    <span>Business Regulation (RYV)</span>
                    <span className="text-xs text-orange-400">In Dev</span>
                  </div>
                </div>
              </div>

              <MobileNavLink href="/features" onClick={closeMobileMenu}>
                Features
              </MobileNavLink>
              <MobileNavLink href="/how-it-works" onClick={closeMobileMenu}>
                How it Works
              </MobileNavLink>

              <MobileNavLink href="/scan" onClick={closeMobileMenu}>
                <div className="flex items-center space-x-2">
                  <span>SCAN</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </MobileNavLink>

              {/* AI Assistant Mobile NavLink */}
              <MobileNavLink href="/ai-assistant" onClick={closeMobileMenu}>
                <div className="flex items-center space-x-2">
                  <span>AI Assistant</span>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
              </MobileNavLink>

              <div className="pt-4 space-y-3 border-t border-white/10">
                <Button
                  variant="ghost"
                  className="w-full text-white hover:text-purple-400 justify-start"
                  onClick={() => {
                    triggerHapticFeedback("light")
                    closeMobileMenu()
                  }}
                  asChild
                >
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    triggerHapticFeedback("medium")
                    closeMobileMenu()
                  }}
                >
                  Get Demo
                </Button>
              </div>

              {/* Swipe hint */}
              <div className="text-center pt-4">
                <p className="text-gray-500 text-sm">Swipe up to close menu</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
    </Link>
  )
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick: () => void
}) {
  const handleClick = () => {
    triggerHapticFeedback("light")
    onClick()
  }

  return (
    <Link href={href} className="block text-gray-300 hover:text-white transition-colors py-2" onClick={handleClick}>
      {children}
    </Link>
  )
}
