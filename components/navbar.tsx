"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import type React from "react"
import Image from "next/image"

export default function Navbar() {
  return (
    <div className="relative z-50">
      <div className="flex lg:hidden items-center justify-end px-4 py-2 bg-black/50 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            className="font-premium text-white hover:text-blue-400 font-medium text-xs px-3 py-1.5 h-auto border border-white/10 hover:border-blue-500/30 transition-all duration-300"
            asChild
          >
            <Link href="/ecosystem">ECOSYSTEM</Link>
          </Button>

          <Button
            variant="ghost"
            className="font-premium text-white hover:text-green-400 font-medium text-xs px-3 py-1.5 h-auto border border-white/10 hover:border-green-500/30 transition-all duration-300"
            asChild
          >
            <Link href="/info">INFO</Link>
          </Button>

          <Link href="/scan" className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative px-3 py-1.5 bg-black rounded leading-none flex items-center border border-red-500/20">
              <span className="font-brand text-white font-bold text-xs tracking-wider">SCAN</span>
            </div>
          </Link>

          <Link href="/ai-assistant" className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative px-3 py-1.5 bg-black rounded leading-none flex items-center border border-purple-500/20">
              <span className="font-brand text-white font-bold text-xs tracking-wider">AI</span>
            </div>
          </Link>

          <Button
            variant="ghost"
            className="font-premium text-white hover:text-purple-400 font-medium text-xs px-3 py-1.5 h-auto border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            asChild
          >
            <Link href="/auth/signin">LOGIN</Link>
          </Button>
        </div>
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10 relative"
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
          <span className="font-brand text-gradient-brand font-bold text-xl lg:text-2xl tracking-wide hover:scale-105 transition-transform duration-300">
            Token Eye
          </span>
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          <Button
            variant="ghost"
            className="font-premium text-white hover:text-blue-400 font-medium px-6 py-3 rounded-lg border border-white/10 hover:border-blue-500/30 transition-all duration-300"
            asChild
          >
            <Link href="/ecosystem">ECOSYSTEM</Link>
          </Button>

          <Button
            variant="ghost"
            className="font-premium text-white hover:text-green-400 font-medium px-6 py-3 rounded-lg border border-white/10 hover:border-green-500/30 transition-all duration-300"
            asChild
          >
            <Link href="/info">INFO</Link>
          </Button>

          <Link href="/scan" className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative px-6 py-3 bg-black rounded-lg leading-none flex items-center border border-red-500/20">
              <span className="font-brand text-white font-bold text-lg tracking-wider">SCAN</span>
            </div>
          </Link>

          <Link href="/ai-assistant" className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative px-6 py-3 bg-black rounded-lg leading-none flex items-center border border-purple-500/20">
              <span className="font-brand text-white font-bold text-lg tracking-wider">AI</span>
            </div>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="font-premium text-gray-300 hover:text-white transition-colors relative group flex items-center space-x-1 bg-transparent border-none outline-none font-medium">
              Solution
              <ChevronDown className="w-4 h-4" />
              <span className="ml-2 px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30 font-medium">
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

          <Link
            href="/features"
            className="font-premium text-gray-300 hover:text-white transition-colors relative group font-medium"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
          </Link>
          <Link
            href="/how-it-works"
            className="font-premium text-gray-300 hover:text-white transition-colors relative group font-medium"
          >
            How it Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
          </Link>
        </div>

        <div className="flex lg:hidden items-center space-x-1 overflow-x-auto"></div>

        <div className="hidden lg:flex items-center space-x-4">
          <Button
            variant="ghost"
            className="font-premium text-white hover:text-purple-400 font-medium px-6 py-2 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            asChild
          >
            <Link href="/auth/signin">LOGIN</Link>
          </Button>
        </div>
      </motion.nav>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-premium text-gray-300 hover:text-white transition-colors relative group font-medium"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-premium text-gray-300 hover:text-white transition-colors relative group font-medium text-xs whitespace-nowrap flex-shrink-0"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
    </Link>
  )
}
