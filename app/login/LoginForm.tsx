// LoginForm.tsx
import { useState } from 'react';
import { Brand } from "@/components/ui/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm({ signIn, signUp }) {
  const [alertMessage, setAlertMessage] = useState('');

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        className="animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2"
        action={signIn}
      >
        <Brand />

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

        <Button className="mb-2 rounded-md bg-blue-700 px-4 py-2 text-white">
          Login
        </Button>

        <Button
          formAction={signUp}
          className="border-foreground/20 mb-2 rounded-md border px-4 py-2"
          onClick={() => setAlertMessage('Check your inbox to activate your account.')}
        >
          Sign Up
        </Button>

        {alertMessage && (
          <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
            {alertMessage}
          </p>
        )}
      </form>
    </div>
  );
}