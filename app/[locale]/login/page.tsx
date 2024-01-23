// Import necessary modules
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import toast from "react-hot-toast"

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Login() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin + "/api/auth/callback" }
      })
      if (error) throw error
    } catch (error) {
      console.error("Error with Google sign-in:", error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMagicLinkSignIn = async e => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + "/api/auth/callback"
        }
      })
      if (error) throw error
      toast.success("Check your email for the login link!")
    } catch (error) {
      console.error("Error with Magic Link sign-in:", error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <button onClick={handleGoogleSignIn} disabled={isLoading}>
        {isLoading ? "Loading..." : "Sign in with Google"}
      </button>

      <form onSubmit={handleMagicLinkSignIn}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Send Magic Link"}
        </button>
      </form>
    </div>
  )
}
