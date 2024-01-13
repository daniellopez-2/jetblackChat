import { useState } from 'react'
// import { Brand } from "@/components/ui/brand"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/server"
import { Database } from "@/supabase/types"
import { createServerClient } from "@supabase/ssr"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import LoginForm from './LoginForm'; // 引入客户端组件

export default async function Login({
  searchParams
}: {
  searchParams: { message: string }
}) {
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

  if (session) {
    return redirect("/chat")
  }

  const signIn = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return redirect("/login?message=Could not authenticate user")
    }

    return redirect("/chat")
  }
  const [alertMessage, setAlertMessage] = useState('');

  const signUp = async (formData: FormData) => {
    "use server"

    const origin = headers().get("origin")
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // TODO: USE IF YOU WANT TO SEND EMAIL VERIFICATION, ALSO CHANGE TOML FILE
        // emailRedirectTo: `${origin}/auth/callback`
      }
    })

    if (error) {
      return redirect("/login?message=Could not authenticate user")
    }
    setAlertMessage('Check your inbox to activate your account.');

    return redirect("/setup")

    // TODO: USE IF YOU WANT TO SEND EMAIL VERIFICATION, ALSO CHANGE TOML FILE
    // return redirect("/login?message=Check email to continue sign in process")
  }
  return (
    <LoginForm signIn={signIn} signUp={signUp} />
  );
}