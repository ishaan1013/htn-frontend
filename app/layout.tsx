import type { Metadata } from "next"
import { Schibsted_Grotesk } from "next/font/google"
import "./globals.css"
import NavBar from "@/components/layout/navbar"
import { ThemeProvider } from "@/components/layout/ThemeProvider"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Hackathon Global Inc.",
  description: "Ishaan's frontend take-home assignment for HTN.",
}

// font variable
const fontSans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

// root layout
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
          <div className="min-h-screen relative">
            <NavBar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
