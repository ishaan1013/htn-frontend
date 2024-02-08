"use client"

import Image from "next/image"
import Link from "next/link"
import Logo from "@/assets/logo.svg"
import { Button } from "../ui/button"
import { ArrowRight, LogIn } from "lucide-react"

export default function NavBar() {
  return (
    <div className="w-screen flex select-none justify-center">
      <nav className="w-full max-w-screen-md p-6 flex items-center justify-between">
        <Link href="/" className="w-10 h-10">
          <Image alt="Logo" src={Logo} height={40} width={40} />
        </Link>
        <Button variant="outline">Sign In</Button>
      </nav>
    </div>
  )
}
