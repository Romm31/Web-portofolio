// src/sections/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Import data
import { EMAIL } from "@/data/portfolio";

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

export default function ContactSection() {
  return (
    <motion.section 
        id="contact" 
        className="container py-24 md:py-32 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
    >
        <SectionTitle>Get in Touch</SectionTitle>
        <motion.div variants={itemVariants}>
            <Card className="max-w-xl mx-auto p-8 border border-primary/20">
                <h3 className="text-xl font-semibold mb-4 text-primary">Interested in Collaborating?</h3>
                <p className="text-muted-foreground mb-6">
                Feel free to send me an email or connect via LinkedIn.
                </p>
                <Button size="lg" asChild>
                <a href={`mailto:${EMAIL}`}>Send Email</a>
                </Button>
            </Card>
        </motion.div>
    </motion.section>
  );
}