// src/app/page.tsx

"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { TimelineItem } from "@/components/timeline-item" 
import { VisualSkillCard } from "@/components/visual-skill-card"

// --- ICONS & DATA ---
import { SiNextdotjs, SiTypescript, SiJavascript, SiPython, SiDocker, SiPostgresql, SiTailwindcss, SiReact, SiLinux, SiHtml5, SiCss3 } from "react-icons/si";

const GITHUB_URL = "https://github.com/Romm31";
const EMAIL = "erwinwijaya6510@gmail.com";
const LINKEDIN_URL = "https://id.linkedin.com/in/erwin-wijaya-b68b11299";

const projects = [
  { id: 1, title: "Next.js E-Commerce Platform", description: "Full-stack e-commerce solution built with Next.js, Vercel PostgreS, and Stripe.", tags: ["Next.js", "PostgreSQL", "Tailwind"], link: "#" },
  { id: 2, title: "Personal Blogging Site (MDX)", description: "A high-performance blog using MDX for content management and search functionality.", tags: ["React", "MDX", "SEO"], link: "#" },
  { id: 3, title: "Real-time Chat App", description: "Built a scalable WebSocket chat application using React and Node.js.", tags: ["React", "Node.js", "WebSocket"], link: "#" },
];

// Data Skill dengan Ikon dan Warna
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
  ],
  infrastructure: [
    { name: "Docker", Icon: SiDocker, color: "#2496ED" },
    { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
    { name: "Linux", Icon: SiLinux, color: "#FCC624" },
  ],
};

const experienceData = {
  education: [
    { year: "2024 - Sekarang", title: "Informatika (S1)", organization: "Universitas Teknokrat Indonesia", detail: "Fokus pada pengembangan perangkat lunak dan arsitektur sistem." },
    { year: "2021 - 2024", title: "Teknik Jaringan Komputer dan Telekomunikasi", organization: "SMKN 1 Bandar Lampung", detail: "Lulusan SMK dengan dasar kuat di jaringan dan komputasi." },
  ],
  internship: [
    { year: "Nov 2023 - Feb 2024", title: "Siswa PKL (Intern)", organization: "Telkom Akses Lampung", detail: "Pengalaman magang sebagai siswa." },
  ],
  organization: [
    { year: "2024 - Sekarang", title: "UKM Programming", organization: "Universitas Teknokrat Indonesia", detail: "Anggota aktif di Unit Kegiatan Mahasiswa Programming." },
    { year: "2022 - 2023", title: "Organisasi Intera Sekolah", organization: "SMKN 1 Bandar Lampung", detail: "Pengalaman berorganisasi di tingkat sekolah." },
  ],
  achievements: [
    { year: 2025, title: "Juara 1 Event CTF HUT Pesawaran, Lampung", detail: "Bidang Cyber Security" },
    { year: 2024, title: "Juara 2 Gematik Teknokrat", detail: "Bidang Cyber Security" },
    { year: 2023, title: "Juara 1 LKS Provinsi Lampung", detail: "Bidang Cyber Security" },
  ],
} as const;


// --- ANIMATION VARIANTS & TITLE COMPONENT ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      delayChildren: 0.3, 
      staggerChildren: 0.1 
    } 
  }
}
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

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
      
      <main>
        {/* HERO SECTION (Sama) */}
        <motion.section 
          id="home"
          className="container py-24 md:py-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-10"
            variants={containerVariants}
          >
            {/* Avatar & Kontak */}
            <motion.div 
              className="w-full md:w-1/3 flex flex-col items-center p-6 border rounded-xl shadow-lg"
              variants={itemVariants}
            >
              <Avatar className="w-32 h-32 mb-6 shadow-2xl">
                <AvatarImage src="https://github.com/Romm31.png" alt="Foto Profil Rommel" />
                <AvatarFallback>RM</AvatarFallback>
              </Avatar>
              
              <h1 className="text-3xl font-bold mb-2">Rommel F.</h1>
              <p className="text-lg text-muted-foreground mb-4">Full-Stack Developer</p>

              <Separator className="my-4 w-full" />
              
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" asChild>
                  <a href={GITHUB_URL} target="_blank">
                    <Github className="h-6 w-6" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={LINKEDIN_URL} target="_blank">
                    <Linkedin className="h-6 w-6 text-blue-600" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={`mailto:${EMAIL}`}>
                    <Mail className="h-6 w-6 text-red-500" />
                  </a>
                </Button>
              </div>

            </motion.div>

            {/* Ringkasan */}
            <motion.div 
              className="w-full md:w-2/3 md:pl-10 space-y-6"
              variants={itemVariants}
            >
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight text-primary">
                Koding untuk Masa Depan.
              </h2>
              <p className="text-xl text-muted-foreground">
                Saya Rommel, seorang pengembang Full-Stack yang berfokus pada membangun aplikasi web modern dengan Next.js dan TypeScript. Saya memiliki passion dalam optimasi performa dan arsitektur sistem yang skalabel.
              </p>
              <div className="pt-4">
                <Button size="lg" className="mr-4">
                  <Link href="#contact">Hubungi Saya</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/Rommel-CV.pdf" download>
                    Download CV
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
        
        <Separator className="container" />

        {/* === 2. SKILLS SECTION (Visual & Lega) === */}
        <section id="skills" className="container py-24">
          <SectionTitle>Skills & Expertise 🌟</SectionTitle>
          
          <motion.div 
            className="max-w-6xl mx-auto space-y-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {/* Kategori 1: Frontend Development */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Frontend & Design</h3>
              {/* Perubahan: Menggunakan Grid 5 kolom untuk tampilan yang lebih lega dan rapi */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"> 
                {visualSkillData.frontend.map((skill) => (
                  <VisualSkillCard key={skill.name} {...skill} />
                ))}
              </div>
            </motion.div>
            
            <Separator className="w-full" />

            {/* Kategori 2: Backend & Languages */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Backend & Programming Languages</h3>
              {/* Perubahan: Menggunakan Grid 5 kolom (tapi hanya 3 item) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {visualSkillData.backend.map((skill) => (
                  <VisualSkillCard key={skill.name} {...skill} />
                ))}
              </div>
            </motion.div>

            <Separator className="w-full" />

            {/* Kategori 3: Infrastructure & Tools */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Infrastructure & DevOps Tools</h3>
              {/* Perubahan: Menggunakan Grid 5 kolom */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {visualSkillData.infrastructure.map((skill) => (
                  <VisualSkillCard key={skill.name} {...skill} />
                ))}
              </div>
            </motion.div>

          </motion.div>
        </section>

        <Separator className="container" />

        {/* PROJECTS SECTION (Sama) */}
        <section id="projects" className="container py-24">
          <SectionTitle>Proyek Terbaru</SectionTitle>
          <div className="grid gap-8 md:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
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
                      <Link href={project.link}>Lihat Proyek &rarr;</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
        
        <Separator className="container" />

        {/* EXPERIENCE SECTION (Timeline Vertikal) */}
        <section id="experience" className="container py-24">
          <SectionTitle>Riwayat Pengalaman & Pendidikan 📜</SectionTitle>

          <motion.div
            className="max-w-3xl mx-auto relative border-l border-border pl-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {/* Kategori 1: Pendidikan */}
            <motion.h3 
              className="text-2xl font-bold mb-6 text-primary sticky top-16 bg-background/95 backdrop-blur z-20 pt-2"
              variants={itemVariants}
            >
              Pendidikan
            </motion.h3>
            {experienceData.education.map((item, index) => (
              <TimelineItem 
                key={`edu-${index}`} 
                year={item.year} 
                title={item.title} 
                organization={item.organization}
                detail={item.detail} 
                isLast={false} 
              />
            ))}

            {/* Kategori 2: Magang */}
            <motion.h3 
              className="text-2xl font-bold mt-12 mb-6 text-primary sticky top-16 bg-background/95 backdrop-blur z-20 pt-2 border-t"
              variants={itemVariants}
            >
              Magang
            </motion.h3>
            {experienceData.internship.map((item, index) => (
              <TimelineItem 
                key={`int-${index}`} 
                year={item.year} 
                title={item.title} 
                organization={item.organization}
                detail={item.detail} 
                isLast={false}
              />
            ))}
            
            {/* Kategori 3: Organisasi */}
            <motion.h3 
              className="text-2xl font-bold mt-12 mb-6 text-primary sticky top-16 bg-background/95 backdrop-blur z-20 pt-2 border-t"
              variants={itemVariants}
            >
              Organisasi
            </motion.h3>
            {experienceData.organization.map((item, index) => (
              <TimelineItem 
                key={`org-${index}`} 
                year={item.year} 
                title={item.title} 
                organization={item.organization}
                detail={item.detail} 
                isLast={false}
              />
            ))}
            
            {/* Kategori 4: Kejuaraan */}
            <motion.h3 
              className="text-2xl font-bold mt-12 mb-6 text-primary sticky top-16 bg-background/95 backdrop-blur z-20 pt-2 border-t"
              variants={itemVariants}
            >
              Kejuaraan
            </motion.h3>
            {experienceData.achievements.map((item, index) => (
              <TimelineItem 
                key={`ach-${index}`} 
                year={item.year} 
                title={item.title} 
                detail={item.detail} 
                isLast={index === experienceData.achievements.length - 1}
              />
            ))}

          </motion.div>
        </section>

        <Separator className="container" />

        {/* CONTACT SECTION (Sama) */}
        <section id="contact" className="container py-24 md:py-32 text-center">
          <SectionTitle>Hubungi Saya</SectionTitle>
          <Card className="max-w-xl mx-auto p-8">
            <h3 className="text-xl font-semibold mb-4">Tertarik Bekerja Sama?</h3>
            <p className="text-muted-foreground mb-6">
              Jangan ragu untuk mengirim email atau terhubung melalui LinkedIn.
            </p>
            <Button size="lg" asChild>
              <a href={`mailto:${EMAIL}`}>Kirim Email</a>
            </Button>
          </Card>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Rommel F. | Built with Next.js & Shadcn/ui.
        </div>
      </footer>
    </div>
  )
}