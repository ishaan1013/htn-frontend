"use client"

import Image from "next/image"
import Link from "next/link"
import Logo from "@/assets/logo.svg"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Loader2, LogIn, LogOut } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import LogOutAlert from "./logOutAlert"

export default function NavBar() {
  const [signedIn, setSignedIn] = useState<null | boolean>(null)
  const [isOpen, setIsOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSignedIn(!!localStorage.getItem("signedIn"))
    }
  }, [pathname])

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("signedIn")
    }
    setSignedIn(false)

    router.refresh()
  }

  return (
    <>
      <LogOutAlert
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSignOut={handleSignOut}
      />
      <div className="w-screen flex select-none justify-center">
        <nav className="w-full max-w-screen-md p-6 flex items-center justify-between">
          <Link href="/" className="w-10 h-10">
            <Image alt="Logo" src={Logo} height={40} width={40} />
          </Link>
          {signedIn === null ? (
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          ) : signedIn ? (
            <Button onClick={() => setIsOpen(true)} variant="outline">
              Log Out
              <LogOut className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Link href="/auth">
              <Button variant="outline">
                Sign In
                <LogIn className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </>
  )
}
