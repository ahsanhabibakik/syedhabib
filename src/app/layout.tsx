import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google'
import { Providers } from './providers';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '@/lib/auth.config';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Syed Mir Ahsan Habib | Portfolio & Projects",
  description: "Personal website of Syed Mir Ahsan Habib (Syed Mir Habib, Ahsan Habib Akik, Syed Habib). Learning by building real projects and sharing knowledge.",
  keywords: "Syed Mir Ahsan Habib, Syed Mir Habib, Ahsan Habib Akik, Syed Habib, developer, portfolio, projects",
  authors: [{ name: "Syed Mir Ahsan Habib" }],
  openGraph: {
    title: "Syed Mir Ahsan Habib | Portfolio & Projects",
    description: "Personal website of Syed Mir Ahsan Habib (Syed Mir Habib, Ahsan Habib Akik, Syed Habib). Learning by building real projects and sharing knowledge.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authOptions = await getAuthOptions();
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId="GTM-NLRZDN5P" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NLRZDN5P"
            height="0"
            width="0"
            className="gtm-noscript"
          />
        </noscript>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
