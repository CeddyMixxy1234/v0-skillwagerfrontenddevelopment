"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardNav } from "@/components/dashboard-nav"

type WithdrawalMethod = "bank" | "mobiletech" | "paypal" | "cryptocurrency"
type ProcessingStatus = "idle" | "processing" | "success" | "error"

export default function WithdrawPage() {
  const [selectedMethod, setSelectedMethod] = useState<WithdrawalMethod>("bank")
  const [amount, setAmount] = useState("")
  const [status, setStatus] = useState<ProcessingStatus>("idle")
  const [accountInfo, setAccountInfo] = useState("")
  const balance = 250.5

  const methods = {
    bank: {
      name: "Direct Bank Transfer",
      icon: "🏦",
      time: "2-5 business days",
      fee: "Free",
      info: "Transfer funds directly to your bank account",
    },
    mobiletech: {
      name: "Mobile Money",
      icon: "📱",
      time: "5-15 minutes",
      fee: "$0.50",
      info: "Send to MTN, Vodafone, AirtelTigo",
    },
    paypal: {
      name: "PayPal",
      icon: "🔵",
      time: "Instant - 2 hours",
      fee: "2%",
      info: "Withdraw to your PayPal account",
    },
    cryptocurrency: {
      name: "Cryptocurrency",
      icon: "₿",
      time: "30 minutes - 1 hour",
      fee: "Variable",
      info: "Withdraw to your crypto wallet",
    },
  }

  const quickAmounts = [25, 50, 100, 250]

  const handleWithdraw = async () => {
    if (!amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > balance) {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
      return
    }

    setStatus("processing")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setStatus("success")
    setTimeout(() => {
      setAmount("")
      setAccountInfo("")
      setStatus("idle")
    }, 2000)
  }

  return (
    <>
      <DashboardNav />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pt-20">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/wallet">
              <Button variant="ghost" size="icon" className="rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">Withdraw Funds</h1>
          </div>

          {/* Balance Card */}
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 mb-8 p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Available Balance</p>
            <h2 className="text-4xl font-bold">${balance.toFixed(2)}</h2>
          </Card>

          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Select Withdrawal Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(methods).map(([key, method]) => (
                <Card
                  key={key}
                  className={`cursor-pointer p-4 transition-all ${
                    selectedMethod === key
                      ? "bg-purple-600 border-purple-400 ring-2 ring-cyan-400"
                      : "bg-slate-800 border-slate-700 hover:border-purple-500"
                  }`}
                  onClick={() => setSelectedMethod(key as WithdrawalMethod)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{method.icon}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        selectedMethod === key ? "bg-purple-700 text-white" : "bg-slate-700 text-cyan-400"
                      }`}
                    >
                      {method.fee}
                    </span>
                  </div>
                  <h4 className={`font-semibold mb-1 ${selectedMethod === key ? "text-white" : "text-slate-100"}`}>
                    {method.name}
                  </h4>
                  <p className={`text-xs mb-2 ${selectedMethod === key ? "text-purple-100" : "text-slate-400"}`}>
                    {method.info}
                  </p>
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="w-3 h-3" />
                    <span className={selectedMethod === key ? "text-purple-100" : "text-slate-400"}>{method.time}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card className="bg-slate-800 border-slate-700 p-6 mb-8">
            <div className="space-y-4">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Withdrawal Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-7 bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                    disabled={status === "processing"}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">Max: ${balance.toFixed(2)}</p>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <p className="text-sm text-slate-400 mb-2">Quick select:</p>
                <div className="flex gap-2 flex-wrap">
                  {quickAmounts.map((qa) => (
                    <Button
                      key={qa}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(qa.toString())}
                      className="border-slate-600 text-slate-300 hover:bg-purple-600 hover:border-purple-500 hover:text-white"
                      disabled={status === "processing"}
                    >
                      ${qa}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Account Info */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {selectedMethod === "bank" ? "Bank Account Number" : "Account/Wallet Address"}
                </label>
                <Input
                  type="text"
                  placeholder={
                    selectedMethod === "bank"
                      ? "Enter your bank account"
                      : selectedMethod === "paypal"
                        ? "your@email.com"
                        : "Enter your account details"
                  }
                  value={accountInfo}
                  onChange={(e) => setAccountInfo(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                  disabled={status === "processing"}
                />
              </div>
            </div>
          </Card>

          {/* Status Messages */}
          {status === "error" && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">Invalid amount. Please check your input and try again.</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-8">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-sm text-green-400">Withdrawal request submitted successfully!</p>
            </div>
          )}

          {/* Withdraw Button */}
          <Button
            onClick={handleWithdraw}
            disabled={status === "processing" || !amount}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 rounded-lg"
          >
            {status === "processing" ? "Processing..." : "Confirm Withdrawal"}
          </Button>

          {/* Info */}
          <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-xs text-slate-400">
              <strong className="text-slate-300">Note:</strong> Withdrawals are typically processed within the timeframe
              shown for each method. You'll receive a confirmation email once your withdrawal is processed.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
