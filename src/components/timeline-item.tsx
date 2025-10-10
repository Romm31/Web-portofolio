// src/components/timeline-item.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Dot } from 'lucide-react'; // Menggunakan ikon Dot sebagai penanda timeline

interface TimelineItemProps {
  year: string | number;
  title: string;
  organization?: string;
  detail: string;
  isLast: boolean;
}

// Varian Animasi
const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export function TimelineItem({ year, title, organization, detail, isLast }: TimelineItemProps) {
  return (
    <motion.div 
      className="flex relative pl-6 pb-8"
      variants={itemVariants}
    >
      {/* Garis Vertikal Timeline */}
      {!isLast && (
        <div className="absolute left-[8px] top-[14px] h-full w-0.5 bg-border z-0" />
      )}
      
      {/* Bullet Point / Icon */}
      <div className="absolute left-0 top-0 z-10 bg-background rounded-full border border-primary text-primary">
        <Dot className="w-5 h-5" />
      </div>

      {/* Konten */}
      <div className="flex-1 ml-4 space-y-1">
        <p className="text-sm font-semibold text-muted-foreground">{year}</p>
        <h4 className="text-lg font-bold">
          {title}
          {organization && <span className="text-primary text-base font-normal block md:inline md:ml-2"> | {organization}</span>}
        </h4>
        <p className="text-muted-foreground">{detail}</p>
      </div>
    </motion.div>
  );
}