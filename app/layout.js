import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import { SmoothScrollProvider } from "@/components/smooth-scroll";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "CareerPilot AI | Premium Career Intelligence",
  description: "An AI-powered career mentor designed to accelerate your growth.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning className="dark">
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased selection:bg-primary/30 selection:text-primary-foreground`} suppressHydrationWarning>
          <SmoothScrollProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              forcedTheme="dark"
              disableTransitionOnChange
            >
              <Header />

              <main className="relative z-10 min-h-screen pt-16">
                {children}
              </main>

              <Toaster richColors theme="dark" />

              <footer className="mt-auto border-t border-white/[0.05] bg-background/50 backdrop-blur-md py-8 relative z-10">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
                  <p>&copy; {new Date().getFullYear()} CareerPilot AI. All rights reserved.</p>
                  <p className="mt-2 md:mt-0">Crafted with precision for modern professionals.</p>
                </div>
              </footer>
            </ThemeProvider>
          </SmoothScrollProvider>
        </body>

      </html>
    </ClerkProvider>
  );
}
