import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AnimationProvider } from "@/components/shared/animation-provider";
import { AccessibilityProvider } from "@/components/shared/accessibility-provider";
import { I18nProvider } from "@/components/shared/i18n-provider";
import { assetPath } from "@/lib/asset-path";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ivoka - La Comunidad líder que une TU potencial humano con inteligencia artificial",
  description: "Somos una comunidad vibrante que integra inteligencia artificial con desarrollo humano. Descubre tu potencial y únete a la revolución Ivoka.",
  keywords: ["inteligencia artificial", "desarrollo humano", "comunidad", "aprendizaje", "creatividad", "finanzas personales"],
  authors: [{ name: "Ivoka" }],
  openGraph: {
    title: "Ivoka - La Comunidad líder que une TU potencial humano con inteligencia artificial",
    description: "Descubre una comunidad donde la inteligencia artificial se integra con tu desarrollo humano para crear un futuro extraordinario.",
    url: "https://ivoka.com",
    siteName: "Ivoka",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivoka - La Comunidad líder que une TU potencial humano con inteligencia artificial",
    description: "Únete a la comunidad que está transformando la forma en que interactuamos con la inteligencia artificial.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    'twitter:image': 'https://ivoka.com/og-image.jpg',
    'twitter:image:alt': 'Ivoka - Comunidad de IA y desarrollo humano',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0062FF" />
        <meta name="msapplication-TileColor" content="#0062FF" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//stats.g.doubleclick.net" />
        {/* Video prefetch for performance */}
        {/* No extra crossOrigin handling is needed; if you later serve it from a CDN, add crossOrigin="anonymous" on both the <link> and <video>.*/}
        <link rel="preload" as="video" href={assetPath("/videos/IvokaLoop.mp4")} type="video/mp4"/>
        
        {/* Icons */}
        <link rel="icon" href={assetPath("/favicon.ico")} sizes="any" />
        <link rel="icon" href={assetPath("/icon.svg")} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={assetPath("/apple-touch-icon.png")} />
        
        {/* Web app manifest */}
        <link rel="manifest" href={assetPath("/manifest.json")} />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0062FF" />
        <meta name="msapplication-navbutton-color" content="#0062FF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ivoka" />
      </head>
      <body
        className={`${manrope.variable} font-sans antialiased bg-background text-foreground`}
      >
        <I18nProvider>
          <AccessibilityProvider>
            <AnimationProvider>
              {children}
            </AnimationProvider>
          </AccessibilityProvider>
        </I18nProvider>
        <Toaster />
      </body>
    </html>
  );
}
