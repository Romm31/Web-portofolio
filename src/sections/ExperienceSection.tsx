// src/sections/ExperienceSection.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { TimelineItem } from "@/components/timeline-item";
import { GraduationCap, Briefcase, Users, Trophy, Calendar, Sparkles } from "lucide-react";
import { useState } from "react";

// Import data
import { educationData, internshipData, organizationData, achievementsData } from "@/data/portfolio";

// Enhanced animation variants with proper typing
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            delayChildren: 0.2, 
            staggerChildren: 0.1
        } 
    },
};

const itemVariants: Variants = {
    hidden: { x: -30, opacity: 0 },
    visible: { 
        x: 0, 
        opacity: 1, 
        transition: { 
            type: "spring", 
            stiffness: 100, 
            damping: 20
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
        className="text-center mb-16 md:mb-20 space-y-4"
    >
        <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block"
        >
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20 shadow-lg">
                <Calendar className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
        </motion.div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            {children}
        </h2>
        
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            My journey through education, work experience, and achievements
        </p>
        
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
    count: number;
}

const CategoryHeader = ({ icon, title, count }: CategoryHeaderProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div 
            variants={itemVariants}
            className="relative mb-8 md:mb-12"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div 
                className="flex items-center gap-3 md:gap-4 bg-card/50 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl sticky top-16 md:top-20 z-20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
            >
                <motion.div 
                    variants={iconVariants}
                    className="flex-shrink-0"
                    animate={{
                        rotate: isHovered ? [0, -10, 10, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center backdrop-blur border border-primary/20 hover:bg-primary/20 transition-colors">
                        {icon}
                    </div>
                </motion.div>
                
                <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
                        {title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                        {count} {count === 1 ? 'entry' : 'entries'}
                    </p>
                </div>

                <motion.div
                    className="hidden md:flex items-center gap-2"
                    animate={{
                        opacity: isHovered ? 1 : 0.3
                    }}
                >
                    <div className="w-2 h-2 rounded-full bg-primary/50" />
                    <div className="w-8 h-0.5 bg-primary/30 rounded-full" />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const CategoryDivider = () => (
    <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="my-12 md:my-16 flex items-center gap-4"
    >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-primary/40" />
            <div className="w-2 h-2 rounded-full bg-primary/40" />
            <div className="w-2 h-2 rounded-full bg-primary/40" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
    </motion.div>
);

// Stats Component
const StatsCard = () => {
    const stats = [
        { label: "Achievements", value: achievementsData.length, icon: Trophy },
        { label: "Education", value: educationData.length, icon: GraduationCap },
        { label: "Internships", value: internshipData.length, icon: Briefcase },
        { label: "Organizations", value: organizationData.length, icon: Users },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <motion.div
                        key={stat.label}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="relative p-4 md:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all shadow-lg hover:shadow-xl group"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:scale-110 transition-transform" />
                            <motion.div
                                className="text-2xl md:text-3xl font-black text-foreground"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                {stat.value}
                            </motion.div>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground font-medium">
                            {stat.label}
                        </p>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default function ExperienceSection() {
  return (
    <motion.section 
        id="experience" 
        className="relative py-20 md:py-28 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={containerVariants}
    >
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
            <motion.div
                className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>

        <div className="container px-4 md:px-6">
            <SectionTitle>Experience & Education Timeline</SectionTitle>

            {/* Stats Overview */}
            <StatsCard />

            <motion.div
                className="max-w-5xl mx-auto relative"
                variants={containerVariants}
            >
                {/* Decorative timeline line */}
                <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 rounded-full" />
                
                {/* Achievements */}
                <div className="relative pl-0 lg:pl-12">
                    <CategoryHeader 
                        icon={<Trophy className="w-6 h-6 text-primary" />}
                        title="Achievements"
                        count={achievementsData.length}
                    />
                    <div className="space-y-4 md:space-y-6">
                        {achievementsData.map((item, index) => (
                            <motion.div 
                                key={`ach-${index}`} 
                                variants={itemVariants}
                                whileHover={{ x: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
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
                <div className="relative pl-0 lg:pl-12">
                    <CategoryHeader 
                        icon={<GraduationCap className="w-6 h-6 text-primary" />}
                        title="Education"
                        count={educationData.length}
                    />
                    <div className="space-y-4 md:space-y-6">
                        {educationData.map((item, index) => (
                            <motion.div 
                                key={`edu-${index}`} 
                                variants={itemVariants}
                                whileHover={{ x: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
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
                <div className="relative pl-0 lg:pl-12">
                    <CategoryHeader 
                        icon={<Briefcase className="w-6 h-6 text-primary" />}
                        title="Internship"
                        count={internshipData.length}
                    />
                    <div className="space-y-4 md:space-y-6">
                        {internshipData.map((item, index) => (
                            <motion.div 
                                key={`int-${index}`} 
                                variants={itemVariants}
                                whileHover={{ x: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
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
                <div className="relative pl-0 lg:pl-12">
                    <CategoryHeader 
                        icon={<Users className="w-6 h-6 text-primary" />}
                        title="Organization"
                        count={organizationData.length}
                    />
                    <div className="space-y-4 md:space-y-6">
                        {organizationData.map((item, index) => (
                            <motion.div 
                                key={`org-${index}`} 
                                variants={itemVariants}
                                whileHover={{ x: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
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
        </div>

        <Separator className="container mt-20 md:mt-28 opacity-20" />
    </motion.section>
  );
}