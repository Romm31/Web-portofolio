// src/components/visual-skill-card.tsx

import React from 'react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import Tooltip components
import { cn } from '@/lib/utils'; // Pastikan ini terimport

interface VisualSkillCardProps {
  name: string;
  Icon: React.ElementType; // Menggunakan React.ElementType untuk fleksibilitas icon
  color: string;
  className?: string; // Tambahkan prop className
}

export function VisualSkillCard({ name, Icon, color, className }: VisualSkillCardProps) {
  return (
    <TooltipProvider delayDuration={200}> {/* Add TooltipProvider */}
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={cn(
              "flex flex-col items-center justify-center p-3 sm:p-4 border rounded-lg shadow-sm w-fit",
              "text-center bg-card text-card-foreground hover:bg-card/80 transition-colors",
              className // Apply custom className
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Icon className="h-6 w-6 sm:h-8 sm:w-8 mb-1" style={{ color: color }} />
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">{name}</span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}