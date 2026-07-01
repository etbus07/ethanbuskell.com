import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ethan Buskell — Engineering Portfolio",
  description:
    "Aspiring mechanical engineer. Predicted A* in Further Maths, Maths, Computer Science, and Physics.",
  // Link unfurls (shared to a tutor/recruiter). Add an /og.png (1200×630) for a
  // preview image; the text fields below already give a clean card without one.
  openGraph: {
    title: "Ethan Buskell — Engineering Portfolio",
    description:
      "Aspiring mechanical engineer. Predicted A* in Further Maths, Maths, Computer Science, Physics. CAD, 3D printing, hardware, and software.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Ethan Buskell — Engineering Portfolio",
    description:
      "Aspiring mechanical engineer — CAD, 3D printing, hardware, and software.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
