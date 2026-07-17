import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Sidebar from "@/components/layout/Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase: new URL("https://thethirteen.com.br"),

  title: {
    default: "The Thirteen",
    template: "%s • The Thirteen",
  },

  description:
    "A curated visual archive for designers. Explore references across branding, typography, interfaces, products, studios, books, photography, tools and more.",

  keywords: [
    "design",
    "design inspiration",
    "visual archive",
    "design references",
    "branding",
    "typography",
    "ui",
    "ux",
    "graphic design",
    "product design",
    "creative archive",
  ],

  authors: [
    {
      name: "Artur Medeiros",
      url: "https://thethirteen.com.br/about",
    },
  ],

  creator: "Artur Medeiros",
  publisher: "The Thirteen",

  openGraph: {
    title: "The Thirteen",
    description: "A curated visual archive for designers.",
    url: "https://thethirteen.com.br",
    siteName: "The Thirteen",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Thirteen",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "The Thirteen",
    description: "A curated visual archive for designers.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
      suppressHydrationWarning
      className={`${geistSans.variable}`}
    >
      <body className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
