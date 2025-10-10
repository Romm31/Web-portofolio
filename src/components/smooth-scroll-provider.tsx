// src/components/smooth-scroll-provider.tsx

"use client"

import { ReactNode, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Inisialisasi Lenis
    const lenis = new Lenis({
      duration: 1.2, // Kecepatan scroll (standar: 1.2)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      // direction: 'vertical', <-- Dihapus
      // gestureDirection: 'vertical', <-- Dihapus
      smoothTouch: false, // Nonaktifkan smooth scroll di touch device (opsional, untuk performa)
      lerp: 0.1, // Interpolasi (seberapa cepat Lenis mengejar posisi scroll)
    });

    // Fungsi loop untuk mengupdate Lenis setiap frame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup saat komponen di-unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}