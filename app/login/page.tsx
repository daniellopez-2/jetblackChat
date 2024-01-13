import React, { useState } from 'react';
import { Brand } from "@/components/ui/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/supabase/types";
import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Login({
  searchParams
}) {
  const [message, setMessage] = useState(searchParams.message || '');
  
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        }
      }
    }
  );
  const session = (await supabase.auth.getSession()).data.session;

  if (session) {
    return redirect("/chat");
  }

  // ... Keep the signIn function as is ...
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
  const signUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // TODO: USE IF YOU WANT TO SEND EMAIL VERIFICATION, ALSO CHANGE TOML FILE
        // emailRedirectTo: `${origin}/auth/callback`
      }
    });

    if (error) {
      setMessage('Could not sign up user: ' + error.message);
      return;
    }

    // TODO: USE IF YOU WANT TO SEND EMAIL VERIFICATION, ALSO CHANGE TOML FILE
    // setMessage('Check email to continue sign in process');
    setMessage('Signup successful! Check your inbox or spam folder to continue.');
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        className="animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2"
        // Remove action={signIn} as we will handle submission manually
      >
        <Brand />

        {/* ... Keep the rest of the form as is ... */}
        <Label className="text-md mt-4" htmlFor="email">
          Email
        </Label>
        <Input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          name="email"
          placeholder="Your Email Address"
          required
        />

        <Label className="text-md" htmlFor="password">
          Password
        </Label>
        <Input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <Button
          className="mb-2 rounded-md bg-blue-700 px-4 py-2 text-white"
          onClick={/* Add signIn event handler */}
        >
          Login
        </Button>

        <Button
          className="border-foreground/20 mb-2 rounded-md border px-4 py-2"
          onClick={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target.form);
            await signUp(formData);
          }}
        >
          Sign Up
        </Button>
        {message && (
          <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}