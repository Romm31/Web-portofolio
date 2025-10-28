"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { TocItem } from "@/lib/blog"

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // 🧩 Pastikan kode DOM hanya jalan di browser, bukan saat build
    if (typeof window === "undefined") return

    const headings = document.querySelectorAll("h2[id], h3[id]")
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -35% 0px" }
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  if (items.length === 0) return null

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 rounded-xl border border-border bg-card"
    >
      <h2 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">
        Table of Contents
      </h2>
      <ul className="space-y-2 text-sm">
        {items.map((item) => {
          const isActive = activeId === item.id
          const isH3 = item.level === 3

          return (
            <li key={item.id} className={isH3 ? "ml-4" : ""}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  if (typeof window !== "undefined") {
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                }}
                className={`block py-1 transition-colors ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-primary" />
                  )}
                  {item.text}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </motion.nav>
  )
}
