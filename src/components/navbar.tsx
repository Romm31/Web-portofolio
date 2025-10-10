// src/components/navbar.tsx

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  return (
    // 'bg-background/95 backdrop-blur' memberikan efek semi-transparan yang modern
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        {/* Logo/Nama */}
        <Link href="/" className="text-xl font-extrabold text-primary">
          {/* 'text-primary' akan mengikuti warna aksen yang Anda atur di shadcn */}
          Rommel.dev
        </Link>
        
        {/* Navigasi & Toggle */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#projects" className="text-sm font-medium transition-colors hover:text-primary">
              Projects
            </Link>
            <Link href="#skills" className="text-sm font-medium transition-colors hover:text-primary">
              Skills
            </Link>
            <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}