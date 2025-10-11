// src/sections/ExperienceSection.tsx
"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { TimelineItem } from "@/components/timeline-item";

// Import data
import { educationData, internshipData, organizationData, achievementsData } from "@/data/portfolio";

// Re-use animation items
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.1 } },
};
const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } as const },
};

const SectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.h2 
      className={`text-3xl font-extrabold mb-10 text-center tracking-tighter sm:text-4xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h2>
);

export default function ExperienceSection() {
  return (
    <motion.section 
        id="experience" 
        className="container py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
    >
        <SectionTitle>Experience & Education Timeline 📜</SectionTitle>

        <motion.div
            className="max-w-3xl mx-auto relative border-l-2 border-primary/50 pl-6" 
            variants={containerVariants}
        >
            {/* Category 1: Education */}
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6 text-primary sticky top-16 bg-background/95 backdrop-blur z-20 pt-4">Education</motion.h3>
            {educationData.map((item, index) => (
                <TimelineItem key={`edu-${index}`} year={item.year} title={item.title} organization={item.organization} detail={item.detail} isLast={false} />
            ))}

            {/* Category 2: Internship */}
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mt-12 mb-6 text-primary sticky top-16 bg-background/95 backdrop-blur z-20 border-t pt-4">Internship</motion.h3>
            {internshipData.map((item, index) => (
                <TimelineItem key={`int-${index}`} year={item.year} title={item.title} organization={item.organization} detail={item.detail} isLast={false}/>
            ))}
            
            {/* Category 3: Organization */}
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mt-12 mb-6 text-primary sticky top-16 bg-background/95 backdrop-blur z-20 border-t pt-4">Organization</motion.h3>
            {organizationData.map((item, index) => (
                <TimelineItem key={`org-${index}`} year={item.year} title={item.title} organization={item.organization} detail={item.detail} isLast={false}/>
            ))}
            
            {/* Category 4: Achievements */}
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mt-12 mb-6 text-primary sticky top-16 bg-background/95 backdrop-blur z-20 border-t pt-4">Achievements</motion.h3>
            {achievementsData.map((item, index) => (
                <TimelineItem key={`ach-${index}`} year={item.year} title={item.title} detail={item.detail} isLast={index === achievementsData.length - 1} />
            ))}

        </motion.div>
        <Separator className="container mt-16" />
    </motion.section>
  );
}