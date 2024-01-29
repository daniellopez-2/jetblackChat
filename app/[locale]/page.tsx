"use client"

import { ChatbotUISVG } from "@/components/icons/chatbotui-svg"
import { IconCircleArrowRightFilled } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function HomePage() {
  const { theme } = useTheme()

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div>
        <ChatbotUISVG theme={theme === "dark" ? "dark" : "light"} scale={0.3} />
      </div>

      <div className="mt-2 text-4xl mb-4"></div>

      <Link
        className="mt-4 flex w-[200px] items-center justify-center rounded-md bg-white p-2 font-semibold text-black border-white"
        href="/chat"
      >
        AI Chat App
      </Link>
    </div>
  )
}
