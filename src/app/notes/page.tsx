// src/app/notes/page.tsx

import { Navbar } from "@/components/navbar"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

export default function NotesListPage() {
  return (
    <div>
      <Navbar />
      <main className="container py-16 min-h-[80vh]">
        <h1 className="text-5xl font-extrabold mb-10 border-b pb-4 text-center">
          Semua Catatan (Notes)
        </h1>
        
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Contoh Card untuk Catatan Pertama Anda */}
          <Link href="/notes/first-post">
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>Catatan Pertama: Fondasi Next.js</CardTitle>
                <CardDescription>
                  10 Oktober 2025 • Tags: Next.js, MDX, Setup
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Anda akan menambahkan Card lain di sini setelah membuat lebih banyak catatan */}

        </div>
      </main>
    </div>
  )
}