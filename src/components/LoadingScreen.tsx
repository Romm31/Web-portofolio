'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
    
    // Prevent scroll saat loading
    document.body.style.overflow = 'hidden';

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    // Finish loading after progress complete
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = 'unset';
      }, 400);
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Jangan render apapun sampai mounted
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[9999] bg-background" />
    );
  }

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          {/* Animated gradient orbs - very subtle */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] 
              bg-primary/[0.03] dark:bg-primary/[0.08] rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.3, 1],
              x: [-20, 20, -20],
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] 
              bg-primary/[0.02] dark:bg-primary/[0.06] rounded-full blur-[90px]"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [20, -20, 20],
              y: [20, -20, 20],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] 
            bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" 
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-4">
            {/* Logo container - CLEAN tanpa ring-ring */}
            <motion.div 
              className="relative mb-12"
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {/* Subtle glow only */}
              <motion.div
                className="absolute inset-0 -m-6"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full rounded-full bg-primary/20 dark:bg-primary/30 blur-3xl" />
              </motion.div>

              {/* Logo - clean dengan card subtle */}
              <motion.div
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl 
                  bg-background/80 dark:bg-background/60
                  border border-border/30 dark:border-border/20
                  shadow-xl dark:shadow-2xl
                  backdrop-blur-md
                  flex items-center justify-center p-8"
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/logo/logo.png"
                    alt="Erwin Wijaya"
                    fill
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Text content */}
            <motion.div
              className="text-center space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Erwin Wijaya
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground font-medium">
                Cyber Security Enthusiast & CTF Player
              </p>
            </motion.div>

            {/* Progress bar - lebih elegan */}
            <motion.div
              className="mt-10 w-64 sm:w-80"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {/* Progress track */}
              <div className="relative h-1.5 bg-muted/40 dark:bg-muted/20 rounded-full overflow-hidden">
                {/* Progress fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-primary/70 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    boxShadow: '0 0 10px rgba(var(--primary), 0.5)',
                  }}
                />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>

              {/* Progress percentage - bigger & cleaner */}
              <motion.p
                className="mt-4 text-lg sm:text-xl text-center text-foreground/70 font-bold tabular-nums"
                key={Math.round(progress)}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {Math.round(progress)}%
              </motion.p>
            </motion.div>
          </div>

          {/* Corner decorations - lebih elegan */}
          <motion.div
            className="absolute top-8 left-8 w-10 h-10 sm:w-12 sm:h-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="w-full h-full border-l-2 border-t-2 border-primary/30 dark:border-primary/25" />
          </motion.div>
          <motion.div
            className="absolute top-8 right-8 w-10 h-10 sm:w-12 sm:h-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="w-full h-full border-r-2 border-t-2 border-primary/30 dark:border-primary/25" />
          </motion.div>
          <motion.div
            className="absolute bottom-8 left-8 w-10 h-10 sm:w-12 sm:h-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <div className="w-full h-full border-l-2 border-b-2 border-primary/30 dark:border-primary/25" />
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-8 w-10 h-10 sm:w-12 sm:h-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <div className="w-full h-full border-r-2 border-b-2 border-primary/30 dark:border-primary/25" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}