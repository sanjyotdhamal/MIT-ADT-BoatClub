import type { Metadata } from "next";
import "./globals.css";
import NavbarFooterWrapper from "@/components/layout/NavbarFooterWrapper";

export const metadata: Metadata = {
  title: "MIT-ADT Boat Club",
  description: "Official website of MIT-ADT Boat Club — Pune",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <NavbarFooterWrapper>
          {children}
        </NavbarFooterWrapper>
      </body>
    </html>
  );
}