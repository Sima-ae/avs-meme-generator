import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthSessionProvider } from "@/components/providers/session-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Alles voor Schiedam Meme Generator 2025",
  description: "Maak persoonlijke memes over jouw visie voor Schiedam. Beantwoord een paar vragen en krijg je eigen meme om te delen op sociale media.",
  keywords: ["Schiedam", "meme", "generator", "Alles voor Schiedam", "politiek", "stemmen", "Nederland", "gemeenteraad", "verkiezingen"],
  authors: [{ name: "Alles voor Schiedam" }],
  openGraph: {
    title: "Alles voor Schiedam Meme Generator 2025",
    description: "Maak persoonlijke memes over jouw visie voor Schiedam",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alles voor Schiedam Meme Generator 2025",
    description: "Maak persoonlijke memes over jouw visie voor Schiedam",
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
        <AuthSessionProvider>
          <Header />
          <main className="pt-20 pb-0">
            {children}
          </main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
