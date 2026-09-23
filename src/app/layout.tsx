import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { BUSINESS, SITE_URL } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonLd";

const TITLE = "Ultra Mobiles Training Institute";
const DESCRIPTION =
  "Hands-on mobile phone repairing and servicing training in Sulur, Tamil Nadu — basic, advanced, and chip-level courses with certification and job assistance.";
// Every phrase here maps to something actually taught or written about on the
// site (a course, a skill in its syllabus, a guide, a location) — this is a
// keyword LIST, not keyword STUFFING: the meta tag itself carries no Google
// ranking weight (Google has ignored it since 2009), but Bing and other
// engines still glance at it, and keeping every term genuinely relevant here
// is what keeps the identical list safe to reuse in structured data below,
// where relevance does matter.
const KEYWORDS = [
  // Core / institute-level (combined, then shorter sub-phrases a searcher might actually type)
  "mobile repairing course",
  "mobile phone repair training institute",
  "mobile phone repair",
  "repair training institute",
  "mobile phone repairing training",
  "mobile phone repairing",
  "mobile service technician course",
  "mobile service technician",
  "service technician course",
  "mobile service academy",
  "mobile repairing academy",
  "mobile repairing training institute",
  "repairing training institute",
  "smartphone repair training",
  "smartphone repair course",
  "smartphone repair",
  "cell phone repair course",
  "cell phone repair",
  "phone repair training center",
  "phone repair training",
  "repair training center",
  "mobile repair classes",
  "hands-on mobile repair training",
  "hands-on mobile repair",
  "practical mobile repair course",
  "practical mobile repair",
  "mobile repair certification course",
  "mobile repair certification",
  "certified mobile repair course",
  "certified mobile repair",
  "mobile technician certification",
  "mobile repair training with job placement",
  "repair training job placement",
  "mobile repairing course with certificate",
  "mobile repairing certificate",
  // Course-specific
  "basic mobile repairing course",
  "basic mobile repairing",
  "basic mobile repair training for beginners",
  "basic mobile repair training",
  "mobile repair course for beginners",
  "mobile repair for beginners",
  "advanced mobile repairing course",
  "advanced mobile repairing",
  "advanced smartphone repair training",
  "advanced smartphone repair",
  "flagship phone repair training",
  "flagship phone repair",
  "chip level training",
  "chip level training course",
  "chip level mobile repairing course",
  "chip level mobile repairing",
  "chip level repair training",
  "chip level repair",
  "motherboard repair course",
  "motherboard repair",
  "motherboard level repair training",
  "motherboard level repair",
  "PCB repair training",
  "PCB layout and circuit diagram course",
  "PCB layout",
  "circuit diagram course",
  "micro soldering course",
  "micro soldering training",
  "micro soldering",
  "hot air rework training",
  "hot air rework",
  "BGA rework training",
  "BGA rework",
  "IC reballing course",
  "IC reballing training",
  "IC reballing",
  "EEPROM programming course",
  "EEPROM programming",
  "BIOS chip repair training",
  "BIOS chip repair",
  "bootloader repair training",
  "bootloader repair",
  "flashing and unlocking course",
  "mobile flashing course",
  "mobile unlocking course",
  "IMEI repair training",
  "IMEI repair",
  "mobile software repair course",
  "mobile software repair",
  "mobile hardware repair course",
  "mobile hardware repair",
  // Skill / repair-topic specific
  "phone screen replacement training",
  "phone screen replacement",
  "display replacement training",
  "touch panel replacement course",
  "touch panel replacement",
  "battery replacement training",
  "mobile battery repair course",
  "mobile battery repair",
  "charging port repair course",
  "charging port repair",
  "charging port replacement training",
  "charging port replacement",
  "speaker and microphone replacement training",
  "speaker replacement training",
  "microphone replacement training",
  "water damage repair training",
  "water damage repair course",
  "water damage repair",
  "liquid damage phone repair training",
  "liquid damage phone repair",
  "short circuit repair training",
  "short circuit repair",
  "power section troubleshooting course",
  "power section troubleshooting",
  "mobile diagnostics course",
  "mobile fault diagnosis training",
  "mobile fault diagnosis",
  "software vs hardware troubleshooting course",
  "software vs hardware troubleshooting",
  "mobile OS troubleshooting course",
  "mobile OS troubleshooting",
  // Business / career
  "mobile repair shop business training",
  "mobile repair shop business",
  "repair shop business training",
  "start your own mobile repair shop",
  "own mobile repair shop",
  "freelance mobile repair training",
  "freelance mobile repair",
  "mobile repair business guidance",
  "mobile repair job placement course",
  "mobile repair job placement",
  "mobile repair career course",
  "mobile repair career",
  "recession proof career course",
  "mobile technician job training",
  "mobile technician job",
  "career in mobile repairing",
  "become a mobile repair technician",
  "become mobile repair technician",
  // Location-based
  "mobile repairing course in Sulur",
  "mobile repairing Sulur",
  "mobile repairing institute in Sulur",
  "mobile repairing institute Sulur",
  "mobile repairing course in Coimbatore",
  "mobile repairing Coimbatore",
  "mobile repairing training in Coimbatore",
  "mobile repairing training Coimbatore",
  "mobile repairing course in Tamil Nadu",
  "mobile repairing Tamil Nadu",
  "mobile service training institute Tamil Nadu",
  "mobile repairing institute near Sulur",
  "repairing institute near Sulur",
  "mobile repair training institute near me",
  "best mobile repairing institute in Tamil Nadu",
  "best mobile repairing institute",
  "best mobile repairing course in Coimbatore",
  "best mobile repairing course",
  "19 East",
  "S Car St",
  "Sulur",
  "Tamil Nadu",
  "641402",
  "19 East, S Car St, Sulur, Tamil Nadu 641402",
  // Audience / logistics
  "mobile repair training for students",
  "mobile repair for students",
  "mobile repair training for working professionals",
  "mobile repair for working professionals",
  "flexible batch mobile repair course",
  "flexible batch mobile repair",
  "affordable mobile repairing course",
  "mobile repair course with tools provided",
  "mobile repair tools provided",
  "mobile repair training with real devices",
  "mobile repair real devices",
  "mobile repair internship training",
  "mobile repair internship",
  "mobile repairing course syllabus",
  "learn mobile repairing from scratch",
  "learn mobile repairing",
  "smartphone motherboard repair training",
  "smartphone motherboard repair",
  "student testimonials mobile repair course",
  "student testimonials mobile repair",
  // Equipment / tools
  "mobile repair microscope training",
  "mobile repair microscope",
  "diagnostic software training for mobile repair",
  "diagnostic software mobile repair",
  "mobile repair tools training course",
  "mobile repair tools training",
  // Guides / common problems (knowledge base topics)
  "cracked screen repair guide",
  "cracked screen repair",
  "battery draining fast solutions",
  "mobile charging port issues fix",
  "mobile charging port issues",
  "common mobile phone problems guide",
  "common mobile phone problems",
  "how to fix water damaged phone",
  "fix water damaged phone",
  "software vs hardware problem diagnosis",
  "software vs hardware problem",
  "what is chip level repair",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${TITLE}`,
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: BUSINESS.name, url: SITE_URL }],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: TITLE,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: BUSINESS.name,
  description: DESCRIPTION,
  email: BUSINESS.email,
  telephone: BUSINESS.phone,
  url: SITE_URL,
  image: `${SITE_URL}/images/logo.png`,
  logo: `${SITE_URL}/images/logo.png`,
  address: {
    "@type": "PostalAddress",
    ...BUSINESS.address,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.028419958680905,
    longitude: 77.10649251937869,
  },
  areaServed: ["Sulur", "Coimbatore", "Tamil Nadu"],
  sameAs: [
    "https://www.instagram.com/ultramobiles07/",
    "https://www.youtube.com/@ultramobiles07",
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: jsonLdScript(localBusinessJsonLd) }}
        />
        <Header />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
