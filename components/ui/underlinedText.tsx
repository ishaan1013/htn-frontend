import { cn } from "@/lib/utils"

// custom heading text component, on brand with hack the north gradient

export default function UnderlinedText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("relative z-0", className)}>
      {children}
      <div className="w-full -z-10 absolute -bottom-1 h-1 bg-gradient" />
    </div>
  )
}
