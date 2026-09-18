import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { AuthModalProvider } from "@/components/providers/AuthModalProvider";
import { UserProvider } from "@/components/providers/UserProvider";
import { MailboxCountsProvider } from "@/hooks/useMailboxCounts";
import { Toaster } from "sonner";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "KSKY SOLUTION",
  description: "KSKY SOLUTION",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-sans antialiased`}>
        <MotionProvider>
          <UserProvider>
            <MailboxCountsProvider>
              <Suspense>
                <AuthModalProvider>
                  <Toaster position="top-right" richColors />
                  <div className="flex min-h-screen flex-col">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                  </div>
                </AuthModalProvider>
              </Suspense>
            </MailboxCountsProvider>
          </UserProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
