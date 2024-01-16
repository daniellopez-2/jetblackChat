import { Toaster } from "@/components/ui/sonner"
import { GlobalState } from "@/components/utility/global-state"
import { Providers } from "@/components/utility/providers"
import { Database } from "@/supabase/types"
import { createServerClient } from "@supabase/ssr"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import { ReactNode } from "react"
import { Analytics } from '@vercel/analytics/react';


import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = cookies()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )
  const session = (await supabase.auth.getSession()).data.session

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Apiskey.com offers convenient access to your AIGC API keys for seamless online integration and usage.">
        <title>Apiskey | Convenient AIGC API Access</title>
        <link rel="canonical" href="https://www.apiskey.com">
        <meta property="og:title" content="Apiskey | Convenient AIGC API Access">
        <meta property="og:description" content="Apiskey.com offers convenient access to your AIGC API keys for seamless online integration and usage.">
        <meta property="og:image" content="https://www.apiskey.com/readme/screenshot.png">
        <meta property="og:url" content="https://www.apiskey.com">
    </head>
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="dark">
          <Toaster richColors position="top-center" duration={2000} />
          <div className="bg-background text-foreground flex h-screen flex-col items-center">
            {session ? <GlobalState>{children}</GlobalState> : children}
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
