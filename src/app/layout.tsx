import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ctrl+r",
    template: "%s | ctrl+r",
  },
  description:
    "ctrl+r helpt kunstenaars en culturele makers met doordachte websites, digitale strategie en duurzaam beheer.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ctrl+r",
    description:
      "Digitale vernieuwing voor cultuur met een duidelijke propositie en beheersbare content.",
    url: siteUrl,
    siteName: "ctrl+r",
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ctrl+r",
    description:
      "Digitale vernieuwing voor cultuur met een duidelijke propositie en beheersbare content.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <a href="#main-content" className="skip-link">
          Ga naar inhoud
        </a>
        <div className="aurora-background" aria-hidden />
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand-link">
              ctrl+r
            </Link>
            <nav aria-label="Hoofdnavigatie" className="header-nav">
              <Link href="/work">Werk</Link>
              <Link href="/#contact">Contact</Link>
              <Link href="/studio">Beheer</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} ctrl+r. Digitale vernieuwing voor cultuur.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
