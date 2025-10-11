// src/sections/ExperienceSection.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { TimelineItem } from "@/components/timeline-item";
import { GraduationCap, Briefcase, Users, Trophy } from "lucide-react";

// Import data
import { educationData, internshipData, organizationData, achievementsData } from "@/data/portfolio";

// Enhanced animation variants with proper typing
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            delayChildren: 0.2, 
            staggerChildren: 0.08 
        } 
    },
};

const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
        x: 0, 
        opacity: 1, 
        transition: { 
            type: "spring", 
            stiffness: 100, 
            damping: 15 
        } 
    },
};

const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
        scale: 1, 
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15
        }
    },
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16 space-y-4"
    >
        <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            {children}
        </h2>
        <motion.div 
            className="h-1 w-24 mx-auto bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
        />
    </motion.div>
);

interface CategoryHeaderProps {
    icon: React.ReactNode;
    title: string;
}

const CategoryHeader = ({ icon, title }: CategoryHeaderProps) => (
    <motion.div 
        variants={itemVariants}
        className="relative mb-8 md:mb-12"
    >
        <div className="flex items-center gap-3 md:gap-4 bg-background/80 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-primary/20 shadow-lg sticky top-16 md:top-20 z-20">
            <motion.div 
                variants={iconVariants}
                className="flex-shrink-0"
            >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center backdrop-blur border border-primary/20">
                    {icon}
                </div>
            </motion.div>
            <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                {title}
            </h3>
            <div className="ml-auto hidden md:block">
                <div className="w-12 h-1 bg-primary/30 rounded-full" />
            </div>
        </div>
    </motion.div>
);

const CategoryDivider = () => (
    <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="my-12 md:my-16 flex items-center gap-4"
    >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="w-2 h-2 rounded-full bg-primary/50" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </motion.div>
);

export default function ExperienceSection() {
  return (
    <motion.section 
        id="experience" 
        className="container py-16 md:py-24 px-4 md:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={containerVariants}
    >
        <SectionTitle>Experience & Education Timeline</SectionTitle>

        <motion.div
            className="max-w-4xl mx-auto relative"
            variants={containerVariants}
        >
            {/* Decorative timeline line - hidden on mobile for cleaner look */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />
            
            {/* Achievements - PALING ATAS */}
            <div className="relative pl-0 md:pl-8">
                <CategoryHeader 
                    icon={<Trophy className="w-5 h-5 md:w-6 md:h-6" />}
                    title="Achievements"
                />
                <div className="space-y-6 md:space-y-8">
                    {achievementsData.map((item, index) => (
                        <motion.div key={`ach-${index}`} variants={itemVariants}>
                            <TimelineItem 
                                year={item.year} 
                                title={item.title} 
                                detail={item.detail} 
                                isLast={false} 
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            <CategoryDivider />

            {/* Education */}
            <div className="relative pl-0 md:pl-8">
                <CategoryHeader 
                    icon={<GraduationCap className="w-5 h-5 md:w-6 md:h-6" />}
                    title="Education"
                />
                <div className="space-y-6 md:space-y-8">
                    {educationData.map((item, index) => (
                        <motion.div key={`edu-${index}`} variants={itemVariants}>
                            <TimelineItem 
                                year={item.year} 
                                title={item.title} 
                                organization={item.organization} 
                                detail={item.detail} 
                                isLast={false} 
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            <CategoryDivider />

            {/* Internship */}
            <div className="relative pl-0 md:pl-8">
                <CategoryHeader 
                    icon={<Briefcase className="w-5 h-5 md:w-6 md:h-6" />}
                    title="Internship"
                />
                <div className="space-y-6 md:space-y-8">
                    {internshipData.map((item, index) => (
                        <motion.div key={`int-${index}`} variants={itemVariants}>
                            <TimelineItem 
                                year={item.year} 
                                title={item.title} 
                                organization={item.organization} 
                                detail={item.detail} 
                                isLast={false}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            <CategoryDivider />

            {/* Organization */}
            <div className="relative pl-0 md:pl-8">
                <CategoryHeader 
                    icon={<Users className="w-5 h-5 md:w-6 md:h-6" />}
                    title="Organization"
                />
                <div className="space-y-6 md:space-y-8">
                    {organizationData.map((item, index) => (
                        <motion.div key={`org-${index}`} variants={itemVariants}>
                            <TimelineItem 
                                year={item.year} 
                                title={item.title} 
                                organization={item.organization} 
                                detail={item.detail} 
                                isLast={index === organizationData.length - 1}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>

        <Separator className="mt-16 md:mt-24 opacity-20" />
    </motion.section>
  );
}