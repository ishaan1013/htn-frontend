"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { validateLogin } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Eye, Search } from "lucide-react"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default function AuthPage() {
  const [invalid, setInvalid] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const valid = validateLogin(values)

    if (!valid) {
      setInvalid(true)
    } else {
      if (typeof window !== "undefined") {
        localStorage.setItem("signedIn", "true")
      }

      router.push("/")
    }
  }

  return (
    <main className="w-screen flex justify-center">
      <div className="w-full max-w-screen-md p-6 flex flex-col items-start justify-start">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="you@email.com" {...field} />
                  </FormControl>
                  <FormDescription className="select-none">
                    Test value:{" "}
                    <code className="select-all bg-secondary px-1 py-0.5 rounded-md">
                      admin@hackthenorth.com
                    </code>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="w-full relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        {...field}
                        className="pr-8"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute text-muted-foreground top-2.5 right-2.5 w-5 h-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <Eye className="w-full h-full" />
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription className="select-none">
                    Test value:{" "}
                    <code className="select-all bg-secondary px-1 py-0.5 rounded-md">
                      hackthenorth2024
                    </code>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button type="submit">Submit</Button>
              {invalid ? (
                <div className="mt-2 text-sm text-destructive">
                  Invalid credentials, try using the test values!
                </div>
              ) : null}
            </div>
          </form>
        </Form>
      </div>
    </main>
  )
}
