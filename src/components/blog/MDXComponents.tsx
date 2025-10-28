import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

// Custom heading with anchor links
function H2({ children }: { children: ReactNode }) {
  const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return (
    <h2 id={id} className="group relative scroll-mt-20 text-2xl font-bold tracking-tight mt-8 mb-4">
      <a href={`#${id}`} className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity">
        #
      </a>
      {children}
    </h2>
  );
}

function H3({ children }: { children: ReactNode }) {
  const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return (
    <h3 id={id} className="group relative scroll-mt-20 text-xl font-bold tracking-tight mt-6 mb-3">
      <a href={`#${id}`} className="absolute -left-5 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
        #
      </a>
      {children}
    </h3>
  );
}

// Custom code block
function Code({ children, className }: { children: ReactNode; className?: string }) {
  const isInline = !className;
  
  if (isInline) {
    return (
      <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono text-primary">
        {children}
      </code>
    );
  }
  
  return (
    <code className={className}>
      {children}
    </code>
  );
}

// Pre block with copy button (will enhance later)
function Pre({ children, ...props }: any) {
  return (
    <pre className="relative overflow-x-auto rounded-lg bg-muted/50 p-4 my-4" {...props}>
      {children}
    </pre>
  );
}

// Blockquote
function Blockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-4 border-primary/50 pl-4 py-2 my-4 italic text-muted-foreground bg-muted/30 rounded-r">
      {children}
    </blockquote>
  );
}

// Custom link
function CustomLink({ href, children }: { href: string; children: ReactNode }) {
  const isExternal = href.startsWith('http');
  
  if (isExternal) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-primary hover:underline font-medium"
      >
        {children}
      </a>
    );
  }
  
  return (
    <Link href={href} className="text-primary hover:underline font-medium">
      {children}
    </Link>
  );
}

// Custom table
function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse">
        {children}
      </table>
    </div>
  );
}

function THead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-muted">
      {children}
    </thead>
  );
}

function TBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

function TR({ children }: { children: ReactNode }) {
  return (
    <tr className="border-b border-border">
      {children}
    </tr>
  );
}

function TH({ children }: { children: ReactNode }) {
  return (
    <th className="px-4 py-3 text-left font-semibold">
      {children}
    </th>
  );
}

function TD({ children }: { children: ReactNode }) {
  return (
    <td className="px-4 py-3">
      {children}
    </td>
  );
}

// Custom paragraph
function P({ children }: { children: ReactNode }) {
  return (
    <p className="my-4 leading-7 text-foreground/90">
      {children}
    </p>
  );
}

// Custom list
function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc list-inside space-y-2 my-4 ml-4">
      {children}
    </ul>
  );
}

function OL({ children }: { children: ReactNode }) {
  return (
    <ol className="list-decimal list-inside space-y-2 my-4 ml-4">
      {children}
    </ol>
  );
}

function LI({ children }: { children: ReactNode }) {
  return (
    <li className="leading-7">
      {children}
    </li>
  );
}

// Callout component (custom)
function Callout({ children, type = 'info' }: { children: ReactNode; type?: 'info' | 'warning' | 'error' | 'success' }) {
  const styles = {
    info: 'bg-blue-500/10 border-blue-500/50 text-blue-600 dark:text-blue-400',
    warning: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-600 dark:text-yellow-400',
    error: 'bg-red-500/10 border-red-500/50 text-red-600 dark:text-red-400',
    success: 'bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400',
  };
  
  return (
    <div className={`border-l-4 p-4 my-4 rounded-r ${styles[type]}`}>
      {children}
    </div>
  );
}

// Export all components
export const MDXComponents = {
  h2: H2,
  h3: H3,
  code: Code,
  pre: Pre,
  blockquote: Blockquote,
  a: CustomLink,
  table: Table,
  thead: THead,
  tbody: TBody,
  tr: TR,
  th: TH,
  td: TD,
  p: P,
  ul: UL,
  ol: OL,
  li: LI,
  Image,
  Callout,
};