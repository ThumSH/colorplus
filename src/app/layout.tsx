import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StyledJsxRegistry from "./registry";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Coluor Plus Printing Systems",
  description: "Precise.Printing.Always.",
  icons: {
    icon: "/logo.svg",
    shortcut: '/logo.svg', // For older browsers
    apple: '/logo.svg', // For when users add to homescreen on iOS
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledJsxRegistry>
          <Navbar/>
          {children}
          <Footer/>
        </StyledJsxRegistry>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
