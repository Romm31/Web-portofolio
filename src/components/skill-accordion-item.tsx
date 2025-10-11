// src/components/skill-accordion-item.tsx
import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VisualSkillCard } from './visual-skill-card'; // Pastikan path benar

interface Skill {
  name: string;
  Icon: React.ElementType;
  color: string;
}

interface SkillAccordionItemProps {
  categoryTitle: string;
  skills: Skill[];
  value: string; // Untuk AccordionItem value
}

export function SkillAccordionItem({ categoryTitle, skills, value }: SkillAccordionItemProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-xl font-semibold">{categoryTitle}</AccordionTrigger>
      <AccordionContent className="pt-4">
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <VisualSkillCard key={skill.name} {...skill} />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}