"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { useState, useEffect } from "react"
import { Menu, X, Home, BookOpen, Code2, Award, Briefcase, Mail, FileText, ChevronDown, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
      
      // Update active link based on scroll position
      const sections = ["home", "about", "skills", "projects", "experience", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(`#${section}`)
            break
          }
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { name: "Home", href: "/", icon: Home },
    { name: "About Me", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Award },
    { name: "Blog", href: "/blog", icon: FileText },
    { name: "Notes", href: "/blog", icon: BookOpen },
    { name: "Projects", href: "#projects", icon: Code2 },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail },
  ]

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      return activeLink === href
    }
    return pathname === href
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg"
            : "bg-background/70 backdrop-blur-md border-b border-border/20"
        }`}
      >
        <div className="container flex h-16 md:h-18 max-w-screen-2xl items-center justify-between px-4 sm:px-6">
          {/* Logo with Animation */}
        <Link href="/" className="group flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md group-hover:blur-lg transition-all" />
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden border border-primary/30 bg-primary/10 flex items-center justify-center">
            <img
              src="/logo/logo.png"
              alt="Erwin Wijaya Logo"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </motion.div>
        <span className="text-lg md:text-xl font-black tracking-tight group-hover:text-primary transition-colors hidden sm:inline-block">
          Erwin Wijaya
        </span>
      </Link>


          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center ml-auto space-x-1">
            {links.map((link) => {
              const Icon = link.icon
              const active = isActive(link.href)
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </motion.div>
                  
                  {/* Active Indicator */}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right side (Theme + Mobile Menu) */}
          <div className="flex items-center gap-2 md:gap-3 ml-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThemeToggle />
            </motion.div>

            {/* Mobile menu toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden inline-flex items-center justify-center rounded-xl p-2.5 hover:bg-muted transition-all border border-border/50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-16 md:top-18 bottom-0 z-40 w-[85%] sm:w-80 bg-background border-l border-border/50 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Navigation Links */}
                <div className="flex-1 py-6 px-4 space-y-2">
                  {links.map((link, index) => {
                    const Icon = link.icon
                    const active = isActive(link.href)
                    
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            active
                              ? "text-primary bg-primary/10 shadow-sm"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="flex-1">{link.name}</span>
                          {active && (
                            <motion.div
                              layoutId="activeMobile"
                              className="w-2 h-2 rounded-full bg-primary"
                            />
                          )}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Footer Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border-t border-border/50 p-4 bg-muted/30"
                >
                  <p className="text-xs text-muted-foreground text-center">
                    © 2025 Erwin Wijaya
                  </p>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Cyber Security Enthusiast & CTF Player
                  </p>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}