// src/components/theme-provider.tsx

"use client"

import * as React from "react"
// Perbaikan: Impor type ThemeProviderProps langsung dari 'next-themes'
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes" 

// Gunakan ThemeProviderProps yang sudah diperbaiki
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}