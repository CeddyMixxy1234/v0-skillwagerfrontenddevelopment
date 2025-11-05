"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Gamepad2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useFormValidation } from "@/components/form-validation-helper"
import { useToast } from "@/components/toast-provider"

export default function SignupPage() {
  const router = useRouter()
  const { validateEmail, validatePassword, validateRequired } = useFormValidation()
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!validateRequired(formData.username, "Username")) {
        setError("Username is required")
        setLoading(false)
        return
      }
      if (!validateEmail(formData.email)) {
        setError("Invalid email address")
        setLoading(false)
        return
      }
      if (!validatePassword(formData.password)) {
        setError("Password must be at least 8 characters")
        setLoading(false)
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        setLoading(false)
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: formData.email,
          username: formData.username,
          id: "user123",
        }),
      )
      addToast("Account created successfully!", "success")
      router.push("/dashboard")
    } catch (err) {
      setError("Signup failed. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl">SkillWager</span>
          </Link>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join the gaming wager community</p>
        </div>

        <Card className="p-6 border border-border">
          <form onSubmit={handleSignup} className="space-y-4">
            {error && <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">{error}</div>}

            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                type="text"
                name="username"
                placeholder="your_username"
                value={formData.username}
                onChange={handleChange}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-input border-border"
              />
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
