// src/components/timeline-item.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  year: string | number;
  title: string;
  organization?: string; // Optional for achievements
  detail: string;
  isLast?: boolean;
}

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } as const } 
} as const;

export function TimelineItem({ year, title, organization, detail, isLast }: TimelineItemProps) {
  return (
    <motion.div variants={itemVariants} className="mb-8 flex items-start group">
      <div className="flex flex-col items-center mr-4">
        <div className="w-3 h-3 rounded-full bg-primary z-10 border-2 border-background flex-shrink-0" />
        {!isLast && <div className="h-full w-0.5 bg-border -mt-1 flex-grow" />}
      </div>
      <div className="flex-grow pt-0.5">
        <p className="text-sm text-muted-foreground">{year}</p>
        <h4 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{title}</h4>
        {organization && <p className="text-muted-foreground text-sm">{organization}</p>}
        <p className="text-sm text-muted-foreground mt-1">{detail}</p>
      </div>
    </motion.div>
  );
}