// src/app/page.tsx - PEROMBAKAN UI/UX TOTAL

"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { TimelineItem } from "@/components/timeline-item" 
import { VisualSkillCard } from "@/components/visual-skill-card"
import { SkillAccordionItem } from "@/components/skill-accordion-item" // Import komponen baru
import { Accordion } from "@/components/ui/accordion" // Import Accordion

// --- ICONS & DATA ---
import { SiNextdotjs, SiTypescript, SiJavascript, SiPython, SiDocker, SiPostgresql, SiTailwindcss, SiReact, SiLinux, SiHtml5, SiCss3, SiPhp } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

const GITHUB_URL = "https://github.com/Romm31";
const EMAIL = "erwinwijaya6510@gmail.com";
const LINKEDIN_URL = "https://id.linkedin.com/in/erwin-wijaya-b68b112999"; 
const TENESYS_URL = "https://ctftime.org/team/22044/";

const PROFILE_SUMMARY = `
I’m Erwin Wijaya, an Informatics student at Universitas Teknokrat Indonesia who’s passionate about both web development and cybersecurity. I love building full-stack web applications using Next.js, Prisma, and PostgreSQL, and I enjoy crafting clean and modern UIs with Tailwind CSS and shadcn/ui. One of my main projects is a full-featured website for my student organization, complete with an admin dashboard, CRUD systems, and authentication flows.
Beyond web development, I’m deeply involved in the CTF (Capture The Flag) community, where I explore areas like cryptography, reversing, and web exploitation. I’m currently a member of Tenesys, the Capture The Flag team of Universitas Teknokrat Indonesia. I constantly challenge myself to learn new concepts, develop secure solutions, and push my technical limits. I’m always excited to combine my passion for programming and security to create smarter, safer, and more efficient systems.
`;

const FOOTER_BIO = `Cybersecurity enthusiast, CTF player and fullstack developer based in Lampung, Bandar Lampung Indonesia.`;

const projects = [
  { id: 1, title: "Himpunan Web (ITSB)", description: "Student organization website for member management and information, in collaboration with the Palm Oil Processing Student Association of ITSB.", tags: ["Web Dev", "Collaboration", "Tailwind"], link: "https://github.com/Romm31/himpunan-web" },
  { id: 2, title: "Native CTF Platform", description: "A simple Capture The Flag (CTF) platform built using pure native PHP. Ideal for small events or educational purposes.", tags: ["PHP", "Security", "Web App"], link: "https://github.com/Romm31/Native-CTF-Platform" },
  { id: 3, title: "Caesar Cipher CLI", description: "Command Line Interface (CLI) tool for Decryption/Enkripsi using the Caesar Cipher algorithm.", tags: ["Security", "Python", "CLI Tool"], link: "https://github.com/Romm31/Caesar-Cipher-CLI" },
  { id: 4, title: "GZCTF Discord Webhooks", description: "Webhook implementation for Discord server notifications related to CTF events or results from GZCTF.", tags: ["Webhook", "Automation", "Discord"], link: "https://github.com/Romm31/GZCTF-Discord-Webhooks" },
  { id: 5, title: "Another Project Idea", description: "This is another placeholder project to demonstrate more cards.", tags: ["New", "Idea", "Fullstack"], link: "https://github.com/Romm31/example" },
  { id: 6, title: "Portfolio Website V1", description: "The initial version of my personal portfolio website, showcasing early work.", tags: ["Web Dev", "Design", "React"], link: "https://github.com/Romm31/old-portfolio" },
];

const visualSkillData = {
  frontend: [
    { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
    { name: "React", Icon: SiReact, color: "#61DAFB" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
    { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", Icon: SiCss3, color: "#1572B6" },
  ],
  backend: [
    { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
    { name: "Python", Icon: SiPython, color: "#3776AB" },
    { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  ],
  infrastructure: [
    { name: "Docker", Icon: SiDocker, color: "#2496ED" },
    { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
    { name: "Linux", Icon: SiLinux, color: "#FCC624" },
  ],
};

const educationData = [
  { year: "2024 - Present", title: "Informatics (B.S.)", organization: "Universitas Teknokrat Indonesia", detail: "Focusing on software development and system architecture." },
  { year: "2021 - 2024", title: "Computer Network and Telecommunication Engineering", organization: "SMKN 1 Bandar Lampung", detail: "Vocational High School graduate with a strong foundation in networking and computing." },
] as const;

const internshipData = [
  { year: "Nov 2023 - Feb 2024", title: "Internship Student (PKL)", organization: "Telkom Akses Lampung", detail: "Internship experience as a student." },
] as const;

const organizationData = [
  { year: "2024 - Present", title: "Programming Student Activity Unit", organization: "Universitas Teknokrat Indonesia", detail: "Active member in the Programming Student Activity Unit." },
  { year: "2022 - 2023", title: "Intra-School Organization", organization: "SMKN 1 Bandar Lampung", detail: "Organizational experience at the school level." },
] as const;

const achievementsData = [
  { year: 2025, title: "1st Place CTF Event HUT Pesawaran, Lampung", detail: "Cyber Security Field" },
  { year: 2024, title: "2nd Place Gematik Teknokrat", detail: "Cyber Security Field" },
  { year: 2023, title: "1st Place LKS Lampung Province", detail: "Cyber Security Field" },
] as const;

const dummyPosts = [
  { title: "Fixing the 'never' Error in Next.js & TypeScript", summary: "A quick guide on why the 'never' property appears in TypeScript array loops and how to use 'as const' to fix it.", link: "/notes/fixing-never-error" },
  { title: "Optimal Next.js Deployment on GitHub Pages", summary: "Step-by-step guide to configure next.config.mjs for static export and gh-pages deployment.", link: "/notes/github-pages-deployment" },
  { title: "Tailwind vs Styled-Components: Choosing UI Library", summary: "Comparative analysis of popular CSS-in-JS solutions and utility-first frameworks.", link: "/notes/tailwind-vs-styled" },
  { title: "Understanding React Hooks Deeply", summary: "Dive into the core concepts of useState, useEffect, and custom hooks for better React development.", link: "/notes/react-hooks" },
];


// --- ANIMATION VARIANTS & TITLE COMPONENT ---
const pageEnterVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const } as const }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.1 } }
} as const;

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } as const } 
} as const;

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
)
// ----------------------------


export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* GLOBAL ENTRY ANIMATION CONTAINER */}
      <motion.main
        initial="hidden"
        animate="visible"
        variants={pageEnterVariant}
      >
        {/* === 1. HERO SECTION === */}
        <motion.section 
          id="home"
          className="container pt-24 pb-12 md:pt-32 md:pb-16"
          variants={containerVariants}
        >
          <motion.div 
            className="flex flex-col md:flex-row items-start gap-10"
            variants={containerVariants}
          >
            {/* Avatar & Contact (Left) */}
            <motion.div 
              className="w-full md:w-1/3 flex flex-col items-center p-6 border rounded-xl shadow-lg md:sticky top-20 bg-background/90 z-10"
              variants={itemVariants}
            >
              <Avatar className="w-24 h-24 md:w-32 md:h-32 mb-6 shadow-2xl">
                <AvatarImage src="https://github.com/Romm31.png" alt="Profile Picture Erwin Wijaya" />
                <AvatarFallback>EW</AvatarFallback>
              </Avatar>
              
              <h1 className="text-3xl font-bold mb-2">Erwin Wijaya</h1>
              <p className="text-lg text-muted-foreground mb-4">Full-Stack Dev | Cybersecurity Enthusiast</p>

              <Separator className="my-4 w-full" />
              
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" asChild>
                  <a href={GITHUB_URL} target="_blank"><Github className="h-6 w-6" /></a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={LINKEDIN_URL} target="_blank"><Linkedin className="h-6 w-6 text-blue-600" /></a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={`mailto:${EMAIL}`}><Mail className="h-6 w-6 text-red-500" /></a>
                </Button>
              </div>

            </motion.div>

            {/* Summary (Right) */}
            <motion.div 
              className="w-full md:w-2/3 md:pl-10 space-y-6"
              variants={itemVariants}
            >
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight text-primary">
                Coding for a Secure Future.
              </h2>
              <p className="text-xl text-muted-foreground whitespace-pre-line">
                {PROFILE_SUMMARY}
              </p>
              <div className="pt-4">
                <Button size="lg" className="mr-4"><Link href="#contact">Contact Me</Link></Button>
                <Button variant="outline" size="lg" asChild><Link href="/Erwin-Wijaya-CV.pdf" download>Download CV</Link></Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
        
        <Separator className="container" />

        {/* LATEST POST SECTION (Grid / Vertical List) */}
        <section className="py-12 md:py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="container space-y-4"
            >
                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-2xl font-bold">Latest Posts</h3>
                    <Button variant="link" size="sm" asChild>
                        <Link href="/notes">View All <ArrowRight className="w-4 h-4 ml-2" /></Link>
                    </Button>
                </div>
                
                {/* Responsive Grid for Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dummyPosts.slice(0, 3).map((post, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.8 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                                <CardHeader>
                                    <CardTitle className="text-xl">{post.title}</CardTitle>
                                    <CardDescription>{post.summary}</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0 flex-grow">
                                    {/* Content here */}
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Button variant="link" asChild className="p-0">
                                        <Link href={post.link}>
                                            Read More <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>

        <Separator className="container" />

        {/* === 2. SKILLS SECTION (Responsive: Grid Desktop / Accordion Mobile) === */}
        <section id="skills" className="container py-24">
          <SectionTitle>Skills & Expertise 🌟</SectionTitle>
          
          <motion.div 
            className="max-w-6xl mx-auto space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div variants={itemVariants}>
                    <h3 className="text-2xl font-bold mb-4 text-primary border-b pb-2">Frontend & Design</h3>
                    <div className="flex flex-wrap gap-3"> 
                        {visualSkillData.frontend.map((skill) => (
                          <VisualSkillCard key={skill.name} {...skill} />
                        ))}
                    </div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                    <h3 className="text-2xl font-bold mb-4 text-primary border-b pb-2">Backend & Programming Languages</h3>
                    <div className="flex flex-wrap gap-3">
                      {visualSkillData.backend.map((skill) => (
                        <VisualSkillCard key={skill.name} {...skill} />
                      ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1"> {/* Memakai satu kolom di lg, tapi di md bisa 2 */}
                    <h3 className="text-2xl font-bold mb-4 text-primary border-b pb-2">Infrastructure & DevOps Tools</h3>
                    <div className="flex flex-wrap gap-3">
                      {visualSkillData.infrastructure.map((skill) => (
                        <VisualSkillCard key={skill.name} {...skill} />
                      ))}
                    </div>
                </motion.div>
            </div>

            {/* Mobile: Accordion Layout */}
            <div className="md:hidden">
                <Accordion type="multiple" defaultValue={["item-1"]}> {/* 'multiple' agar bisa buka beberapa */}
                    <SkillAccordionItem 
                        categoryTitle="Frontend & Design" 
                        skills={visualSkillData.frontend} 
                        value="item-1" 
                    />
                    <SkillAccordionItem 
                        categoryTitle="Backend & Programming Languages" 
                        skills={visualSkillData.backend} 
                        value="item-2" 
                    />
                    <SkillAccordionItem 
                        categoryTitle="Infrastructure & DevOps Tools" 
                        skills={visualSkillData.infrastructure} 
                        value="item-3" 
                    />
                </Accordion>
            </div>
          </motion.div>
        </section>

        <Separator className="container" />

        {/* PROJECTS SECTION (Grid / Vertical List) */}
        <section id="projects" className="py-24">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.5 }}
             transition={{ duration: 0.5 }}
             className="container space-y-4"
          >
            <div className="flex justify-between items-center border-b pb-2">
                <SectionTitle className="!mb-0">Featured Projects</SectionTitle>
                <Button variant="link" size="sm" asChild>
                    <a href={GITHUB_URL} target="_blank">View All on GitHub <FaGithub className="w-4 h-4 ml-2" /></a>
                </Button>
            </div>
            
            {/* Responsive Grid for Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((project, index) => ( // Batasi hingga 6 project atau semua jika kurang
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col justify-between hover:shadow-primary/30 transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="p-0" asChild>
                        <a href={project.link} target="_blank">
                          View on GitHub <FaGithub className="w-4 h-4 ml-2 inline" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        
        <Separator className="container" />

        {/* EXPERIENCE SECTION (Timeline Vertical) */}
        <section id="experience" className="container py-24">
          <SectionTitle>Experience & Education Timeline 📜</SectionTitle>

          <motion.div
            className="max-w-3xl mx-auto relative border-l border-border pl-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {/* Category 1: Education */}
            <motion.h3 className="text-2xl font-bold mb-6 text-primary sticky top-16 bg-background/95 backdrop-blur z-20 pt-2" variants={itemVariants}>Education</motion.h3>
            {educationData.map((item, index) => (
              <TimelineItem key={`edu-${index}`} year={item.year} title={item.title} organization={item.organization} detail={item.detail} isLast={false} />
            ))}

            {/* Category 2: Internship */}
            <motion.h3 className="text-2xl font-bold mt-12 mb-6 text-primary sticky top-16 bg-background/95 backdrop-blur z-20 pt-2 border-t" variants={itemVariants}>Internship</motion.h3>
            {internshipData.map((item, index) => (
              <TimelineItem key={`int-${index}`} year={item.year} title={item.title} organization={item.organization} detail={item.detail} isLast={false}/>
            ))}
            
            {/* Category 3: Organization */}
            <motion.h3 className="text-2xl font-bold mt-12 mb-6 text-primary sticky top-16 bg-background/95 backdrop-blur z-20 pt-2 border-t" variants={itemVariants}>Organization</motion.h3>
            {organizationData.map((item, index) => (
              <TimelineItem key={`org-${index}`} year={item.year} title={item.title} organization={item.organization} detail={item.detail} isLast={false}/>
            ))}
            
            {/* Category 4: Achievements */}
            <motion.h3 className="text-2xl font-bold mt-12 mb-6 text-primary sticky top-16 bg-background/95 backdrop-blur z-20 pt-2 border-t" variants={itemVariants}>Achievements</motion.h3>
            {achievementsData.map((item, index) => (
              <TimelineItem key={`ach-${index}`} year={item.year} title={item.title} detail={item.detail} isLast={index === achievementsData.length - 1} />
            ))}

          </motion.div>
        </section>

        <Separator className="container" />

        {/* CONTACT SECTION */}
        <section id="contact" className="container py-24 md:py-32 text-center">
          <SectionTitle>Get in Touch</SectionTitle>
          <Card className="max-w-xl mx-auto p-8">
            <h3 className="text-xl font-semibold mb-4">Interested in Collaborating?</h3>
            <p className="text-muted-foreground mb-6">
              Feel free to send me an email or connect via LinkedIn.
            </p>
            <Button size="lg" asChild>
              <a href={`mailto:${EMAIL}`}>Send Email</a>
            </Button>
          </Card>
        </section>
      </motion.main>
      
      {/* --- FOOTER (4 Kolom) --- */}
      <footer className="w-full border-t border-border/40 bg-background pt-12 pb-6">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Kolom 1: About */}
            <div>
                <h4 className="text-lg font-bold mb-4">Erwin Wijaya</h4>
                <p className="text-sm text-muted-foreground mb-4">
                    {FOOTER_BIO}
                </p>
            </div>

            {/* Kolom 2: Quick Links */}
            <div>
                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link href="/notes" className="text-muted-foreground hover:text-primary">Notes</Link></li>
                    <li><Link href="#projects" className="text-muted-foreground hover:text-primary">Projects</Link></li>
                    <li><Link href="#skills" className="text-muted-foreground hover:text-primary">Skills</Link></li>
                    <li><Link href="#experience" className="text-muted-foreground hover:text-primary">Experience</Link></li>
                </ul>
            </div>

            {/* Kolom 3: Connect */}
            <div>
                <h4 className="text-lg font-bold mb-4">Connect</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href={GITHUB_URL} target="_blank" className="text-muted-foreground hover:text-primary">GitHub</a></li>
                    <li><a href={LINKEDIN_URL} target="_blank" className="text-muted-foreground hover:text-primary">LinkedIn</a></li>
                    <li><a href={`mailto:${EMAIL}`} className="text-muted-foreground hover:text-primary">Email</a></li>
                </ul>
            </div>

            {/* Kolom 4: CTF Teams */}
            <div>
                <h4 className="text-lg font-bold mb-4">CTF Teams</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href={TENESYS_URL} target="_blank" className="text-muted-foreground hover:text-primary">Tenesys</a></li>
                </ul>
            </div>
        </div>
        
        {/* Copyright Bar */}
        <div className="container mt-8 pt-4 border-t border-border/40 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Erwin Wijaya. All rights reserved.
        </div>
      </footer>
    </div>
  )
}