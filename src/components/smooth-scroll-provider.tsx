"use client"

import { ReactNode, useEffect } from "react"
import Lenis from "@studio-freight/lenis"

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: true,
      gestureOrientation: "vertical",
      touchMultiplier: 1.5,
      infinite: false,
    })

    let animationFrame: number

    const raf = (time: number) => {
      lenis.raf(time)
      animationFrame = requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    if (process.env.NODE_ENV === "development") {
      lenis.on("scroll", (e: { scroll: number }) => {
        void e.scroll
      })
    }

    return () => {
      cancelAnimationFrame(animationFrame)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
