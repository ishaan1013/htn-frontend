import type { Metadata } from "next"
import { Schibsted_Grotesk } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import NavBar from "@/components/layout/NavBar"
import { ThemeProvider } from "@/components/layout/ThemeProvider"

export const metadata: Metadata = {
  title: "Hack the North",
  description: "Ishaan's frontend take-home assignment for HTN.",
}

const fontSans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
