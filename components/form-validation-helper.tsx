"use client"

import { useToast } from "@/components/toast-provider"

export function useFormValidation() {
  const { addToast } = useToast()

  const validateWagerAmount = (amount: string | number, minAmount = 1, maxAmount = 250) => {
    const num = Number.parseFloat(String(amount))

    if (!amount || Number.isNaN(num) || num <= 0) {
      addToast("Please enter a valid amount", "error")
      return false
    }

    if (num < minAmount) {
      addToast(`Minimum wager amount is $${minAmount}`, "error")
      return false
    }

    if (num > maxAmount) {
      addToast(`Maximum wager amount is $${maxAmount}`, "error")
      return false
    }

    return true
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      addToast("Please enter a valid email address", "error")
      return false
    }
    return true
  }

  const validatePassword = (password: string) => {
    if (!password || password.length < 6) {
      addToast("Password must be at least 6 characters", "error")
      return false
    }
    return true
  }

  const validateRequired = (value: string | null | undefined, fieldName: string) => {
    if (!value) {
      addToast(`${fieldName} is required`, "error")
      return false
    }
    return true
  }

  return {
    validateWagerAmount,
    validateEmail,
    validatePassword,
    validateRequired,
    addToast,
  }
}
