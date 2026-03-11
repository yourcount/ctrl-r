import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beheer",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
