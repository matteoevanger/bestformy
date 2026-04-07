import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://bestformy.com'),
  title: {
    default: 'BestForMy - Find the Best Software for Your Business',
    template: '%s | BestForMy',
  },
  description:
    'Compare and find the best SaaS tools for your industry. Honest reviews, side-by-side comparisons, and expert recommendations for CRM, project management, invoicing, and more.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BestForMy',
    images: [{ url: '/og-image.png', width: 1536, height: 1024 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'mWEaDAa3b8e9LsXaw4PboK0H185jpyETbjjEQMvS3tk',
    other: {
      'impact-site-verification': '3aff5cce-64ce-4247-b26d-1679a574b167',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G5CBS9XDN6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G5CBS9XDN6');
          `}
        </Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
