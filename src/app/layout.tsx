import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CSES Profile Badge & Card Generator',
  description: 'Generate beautiful dynamic SVG progress badges and stats cards for your CSES profile on GitHub READMEs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-zinc-950 text-zinc-50 antialiased">{children}</body>
    </html>
  );
}
