// src/components/blog/ShareButtons.tsx
"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Link2, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  slug: string;
  layout?: 'horizontal' | 'vertical';
}

export default function ShareButtons({ title, slug, layout = 'horizontal' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : '';
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const buttonClass = layout === 'vertical' 
    ? 'w-full justify-start gap-3 px-4 py-2.5'
    : 'px-4 py-2';

  return (
    <div className={`flex ${layout === 'vertical' ? 'flex-col' : 'flex-wrap'} gap-2`}>
      {/* Twitter */}
      <motion.a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center ${buttonClass} rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] font-medium transition-colors`}
      >
        <Twitter className="w-4 h-4" />
        {layout === 'vertical' && <span>Share on Twitter</span>}
      </motion.a>

      {/* LinkedIn */}
      <motion.a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center ${buttonClass} rounded-lg bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] font-medium transition-colors`}
      >
        <Linkedin className="w-4 h-4" />
        {layout === 'vertical' && <span>Share on LinkedIn</span>}
      </motion.a>

      {/* Copy Link */}
      <motion.button
        onClick={handleCopyLink}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center ${buttonClass} rounded-lg bg-muted hover:bg-muted/80 text-foreground font-medium transition-colors`}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            {layout === 'vertical' && <span>Link Copied!</span>}
          </>
        ) : (
          <>
            <Link2 className="w-4 h-4" />
            {layout === 'vertical' && <span>Copy Link</span>}
          </>
        )}
      </motion.button>
    </div>
  );
}