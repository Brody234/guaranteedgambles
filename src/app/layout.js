'use client'
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/authcontext";
import { OppProvider } from "@/contexts/arbitragecontext";
import { AffProvider } from "@/contexts/affiliationcontext";
import CustomHead from '@/components/head';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CustomHead />
      <body className={inter.className}>
        <AuthProvider>
          <OppProvider>
            <AffProvider>
              {children}
            </AffProvider>
          </OppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
