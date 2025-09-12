import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Alles voor Schiedam Meme Generator 2025",
  description: "Create personalized memes about your vision for Schiedam. Answer a few questions and get your own branded meme to share on social media.",
  keywords: ["Schiedam", "meme", "generator", "Alles voor Schiedam", "politics", "voting", "Netherlands"],
  authors: [{ name: "Alles voor Schiedam" }],
  openGraph: {
    title: "Alles voor Schiedam Meme Generator 2025",
    description: "Create personalized memes about your vision for Schiedam",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alles voor Schiedam Meme Generator 2025",
    description: "Create personalized memes about your vision for Schiedam",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
