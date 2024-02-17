import Image from "next/image"
import Link from "next/link"
import Logo from "@/assets/logo.svg"
import { Button } from "../ui/button"

export default function Footer() {
  return (
    <div className="w-screen border-t border-border mt-12 flex select-none justify-center">
      <nav className="w-full max-w-screen-md p-6 flex items-center justify-between">
        <Link href="/" className="w-10 h-10">
          <Image alt="Logo" src={Logo} height={40} width={40} />
        </Link>
        <a href="https://github.com/ishaan1013/htn-frontend" target="_blank">
          <Button variant="outline">
            <Image
              height="16"
              width="16"
              className="invert mr-2"
              src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg"
              alt="GitHub Logo"
            />
            GitHub Repo
          </Button>
        </a>
      </nav>
    </div>
  )
}
