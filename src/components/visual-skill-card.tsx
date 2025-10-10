// src/components/visual-skill-card.tsx (Perbaikan Simpel)

import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface VisualSkillCardProps {
  name: string;
  Icon: IconType;
  color: string;
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export function VisualSkillCard({ name, Icon, color }: VisualSkillCardProps) {
  return (
    <motion.div 
      variants={itemVariants} 
      // Hapus w-1/x dan p-2 di sini. Biarkan Grid parent yang mengatur lebar.
      className="w-full"
    >
      <Card 
        className="flex flex-col items-center justify-center p-4 h-28 
                   transition-all duration-300 hover:shadow-xl hover:scale-[1.05] 
                   hover:border-primary border-2 border-transparent"
      >
        <Icon className="w-8 h-8 mb-2" style={{ color: color }} />
        <p className="text-xs font-semibold text-center">{name}</p>
      </Card>
    </motion.div>
  );
}