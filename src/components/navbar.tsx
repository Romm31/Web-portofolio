"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { name: "Home", href: "/" },
    { name: "Notes", href: "/notes" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/40 shadow-sm"
          : "bg-background/50 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg sm:text-xl font-extrabold tracking-tight hover:text-primary transition-colors"
        >
          Erwin Wijaya
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center ml-auto space-x-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
            >
              {link.name}
              <motion.span
                className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"
                layoutId="underline"
              />
            </Link>
          ))}
        </nav>

        {/* Right side (Theme + Mobile Menu) */}
        <div className="flex items-center gap-3 ml-4">
          <ThemeToggle />

          {/* Mobile menu toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/40 shadow-lg"
        >
          <ul className="flex flex-col items-center py-4 space-y-4">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </header>
  )
}
