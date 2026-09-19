import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#4A78F6",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pauseforlove.in"),
  title: "Pause for Love | Neha, M.A. Psychology - Counselling Therapist",
  description:
    "A confidential, evidence-informed therapeutic sanctuary led by Neha, M.A. Psychology. Specializing in recovery from narcissistic abuse, restoring relationship intimacy, and rediscovering peaceful emotional autonomy.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Pause for Love | Counselling & Therapy",
    description: "Confidential therapeutic sanctuary by Neha, M.A. Psychology",
    images: ["/logo.png"],
    siteName: "Pause for Love",
    url: "https://pauseforlove.in",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
