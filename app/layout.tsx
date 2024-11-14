import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import '@rainbow-me/rainbowkit/styles.css';
import { ThemeProvider } from "./theme-provider"
// import { Fredoka } from "next/font/google"
import { Toaster } from "sonner";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeToggle } from "@/components/theme-toggle";


// const fredoka = Fredoka({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "CartooNFT",
  description: "An NFT Marketplace for Cartoons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`tracking-wide`}
      >
        <Providers>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster richColors position="top-center" />
            <nav className="flex justify-between p-6 sticky top-0 dark:bg-black bg-white">
              <div className="text-2xl font-bold">
                HedgeFlow
              </div>
              <div className="flex justify-between space-x-4">
                <ConnectButton />
                <ThemeToggle />
              </div>
            </nav>
              {children}
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
