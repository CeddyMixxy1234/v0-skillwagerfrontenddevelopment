"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { Wallet, Plus, Gamepad2, TrendingUp, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { AchievementBadges } from "@/components/achievement-badges"
import { WagerStats } from "@/components/wager-stats"
import { RecommendedWagers } from "@/components/recommended-wagers"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    balance: 250.5,
    escrow: 25.0,
    totalWinnings: 1250.0,
    totalWagers: 12,
    wins: 8,
    losses: 4,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const recentWagers = [
    { id: 1, game: "PUBG", opponent: "ProPlayer_123", amount: 50, status: "won", date: "2 hours ago" },
    { id: 2, game: "Valorant", opponent: "GamingKing", amount: 25, status: "pending", date: "1 day ago" },
    { id: 3, game: "Chess.com", opponent: "ChessMaster", amount: 100, status: "lost", date: "3 days ago" },
  ]

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-7xl mx-auto px-3 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.email?.split("@")[0] || "Player"}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Here's your gaming dashboard</p>
          </div>
          <Link href="/wager/create">
            <Button className="bg-primary text-primary-foreground gap-1 text-sm py-1 px-2 h-8">
              <Plus className="w-3 h-3" />
              Create Wager
            </Button>
          </Link>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <Card className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-xs text-muted-foreground">Available Balance</h3>
              <Wallet className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">${stats.balance.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Ready to wager</p>
            <Link href="/wallet" className="mt-2 inline-block">
              <Button
                size="sm"
                variant="outline"
                className="text-xs py-0.5 px-2 h-6 bg-transparent"
                onClick={() => {
                  console.log("[v0] User navigating to wallet management")
                }}
              >
                Manage Wallet
              </Button>
            </Link>
          </Card>

          <Card className="p-3 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:border-accent/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-xs text-muted-foreground">In Escrow</h3>
              <Gamepad2 className="w-4 h-4 text-accent" />
            </div>
            <p className="text-2xl font-bold">${stats.escrow.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">In active wagers</p>
            <p className="text-xs text-muted-foreground mt-0.5">Locked until match completes</p>
          </Card>

          <Card className="p-3 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 hover:border-green-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-xs text-muted-foreground">Total Winnings</h3>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-500">${stats.totalWinnings.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">All time earnings</p>
          </Card>
        </div>

        <div className="mb-4">
          <WagerStats />
        </div>

        {/* Achievements Section */}
        <div className="mb-4">
          <AchievementBadges compact={true} />
        </div>

        {/* Recommended Wagers Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold">Recommended for You</h2>
            <Link href="/wager/browse">
              <Button variant="ghost" size="sm" className="text-xs py-0.5 px-2 h-6">
                Browse All →
              </Button>
            </Link>
          </div>
          <RecommendedWagers />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          <Card className="p-2 text-center border-border hover:bg-secondary/50 transition-colors">
            <p className="text-xl font-bold text-primary">{stats.totalWagers}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Total Wagers</p>
          </Card>
          <Card className="p-2 text-center border-border hover:bg-secondary/50 transition-colors">
            <p className="text-xl font-bold text-green-500">{stats.wins}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Wins</p>
          </Card>
          <Card className="p-2 text-center border-border hover:bg-secondary/50 transition-colors">
            <p className="text-xl font-bold text-destructive">{stats.losses}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Losses</p>
          </Card>
          <Card className="p-2 text-center border-border hover:bg-secondary/50 transition-colors">
            <p className="text-xl font-bold">{((stats.wins / stats.totalWagers) * 100).toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mt-0.5">Win Rate</p>
          </Card>
        </div>

        {/* Recent Wagers */}
        <Card className="border-border">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Wagers</h2>
            <Link href="/wagers">
              <Button variant="ghost" size="sm" className="text-xs py-0.5 px-2 h-6">
                View All
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentWagers.map((wager) => (
              <div
                key={wager.id}
                className="p-3 flex items-center justify-between hover:bg-secondary/30 transition-colors text-sm"
              >
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Gamepad2 className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm">{wager.game}</p>
                    <p className="text-xs text-muted-foreground truncate">vs {wager.opponent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-2">
                  <div className="text-right">
                    <p className="font-semibold text-sm">${wager.amount.toFixed(2)}</p>
                    <p
                      className={`text-xs font-medium ${wager.status === "won" ? "text-green-500" : wager.status === "lost" ? "text-destructive" : "text-yellow-500"}`}
                    >
                      {wager.status === "won" ? "✓ Won" : wager.status === "lost" ? "✗ Lost" : "⏳ Pending"}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 text-xs text-muted-foreground whitespace-nowrap">
                    {wager.status === "won" ? (
                      <ArrowUpRight className="w-3 h-3 text-green-500" />
                    ) : (
                      <ArrowDownLeft className="w-3 h-3 text-destructive" />
                    )}
                    {wager.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-secondary/30 text-center border-t border-border">
            <Link href="/wagers">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs py-0.5 px-2 h-6"
                onClick={() => {
                  console.log("[v0] User viewing all wagers")
                }}
              >
                View All Wagers →
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  )
}
