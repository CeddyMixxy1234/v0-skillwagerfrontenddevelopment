"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Gamepad2, Home, Zap, Wallet, Trophy, Settings, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { NotificationsCenter } from "./notifications-center"

export function DashboardNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { label: "Wagers", href: "/wagers", icon: Zap },
    { label: "Browse", href: "/wager/browse", icon: Trophy },
    { label: "Matches", href: "/matches", icon: Gamepad2 },
    { label: "Wallet", href: "/wallet", icon: Wallet },
    { label: "Settings", href: "/settings", icon: Settings },
  ]

  const isActive = (href: string) => pathname === href

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("linkedAccounts")
    router.push("/")
  }

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-1.5 font-bold text-base flex-shrink-0">
          <Gamepad2 className="w-5 h-5 text-primary" />
          <span className="hidden sm:inline text-sm">SkillWager</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  size="sm"
                  className={`gap-1 text-xs py-0.5 px-2 h-7 ${isActive(item.href) ? "bg-primary text-primary-foreground" : ""}`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-1">
          <NotificationsCenter />
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="gap-1 text-xs py-0.5 px-2 h-7">
              <Settings className="w-3 h-3" />
              <span>Admin</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-1 text-xs py-0.5 px-2 h-7 text-destructive hover:text-destructive"
          >
            <LogOut className="w-3 h-3" />
            <span>Logout</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-3 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start gap-1 text-xs py-0.5 px-2 h-7 ${isActive(item.href) ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    <Icon className="w-3 h-3" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
            <div className="pt-1 border-t border-border space-y-1">
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-1 text-xs py-0.5 px-2 h-7">
                  <Settings className="w-3 h-3" />
                  Admin Panel
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-1 text-xs py-0.5 px-2 h-7 text-destructive hover:text-destructive"
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleLogout()
                }}
              >
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
