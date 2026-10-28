import { Providers } from "./providers";
import { CommandPalette } from "@/components/CommandPalette";
import { RealtimeNotifier } from "@/components/RealtimeNotifier";
import { PWARegister } from "@/components/PWARegister";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "WikiNova - Bách khoa toàn thư thế hệ mới",
  description: "Khám phá tri thức nhân loại với giao diện hiện đại, cập nhật realtime mỗi phút.",
  manifest: "/manifest.json",
  themeColor: "#2563EB",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="YOUR-WEBSITE-ID"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <CommandPalette />
            <RealtimeNotifier />
            <PWARegister />
            <Toaster position="top-right" richColors />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}