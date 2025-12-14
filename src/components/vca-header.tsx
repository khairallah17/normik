'use client'

import React, { useState } from 'react'
import { Link } from '@/i18n/routing'
import { Search, ChevronDown, User, LogOut, Key, Shield, Settings, CreditCard, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function VCAHeader() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <nav 
      className="fixed top-0 left-0 right-0 bg-[#0066CC] text-white shadow-lg" 
      id="menu"
      style={{ zIndex: 1000, height: '56px' }}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/dashboard" className="text-white font-bold text-lg mr-4 hover:opacity-80 transition-opacity">
            Dashboard
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center flex-1 mx-4" style={{ maxWidth: '400px' }}>
          <form className="w-full relative" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="text"
              placeholder="Zoek"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 focus:border-white/40 pr-10"
            />
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 text-white hover:bg-white/10"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-2">
          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            className="text-white px-3 py-2 rounded hover:bg-white/10 transition-colors text-sm"
          >
            Dashboard
          </Link>

          {/* Modules Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 px-3 py-2 h-auto text-sm"
              >
                Modules
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/vca/modules/work-plans" className="flex items-center cursor-pointer">
                  Werkplannen
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/vca/modules/workplace-inspections" className="flex items-center cursor-pointer">
                  Werkplekinspectie
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/vca/modules/notifications" className="flex items-center cursor-pointer">
                  Meldingen
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/vca/modules/personnel" className="flex items-center cursor-pointer">
                  Personeel
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/vca/modules/work-equipment" className="flex items-center cursor-pointer">
                  Arbeidsmiddelen
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 px-3 py-2 h-auto text-sm"
              >
                <User className="h-4 w-4 mr-2" />
                Elias Bakkali
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex items-center cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profiel
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings/password" className="flex items-center cursor-pointer">
                  <Key className="mr-2 h-4 w-4" />
                  Wachtwoord wijzigen
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings/2fa" className="flex items-center cursor-pointer">
                  <Shield className="mr-2 h-4 w-4" />
                  Two-Factor authenticatie
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings/users" className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Gebruiker / systeem beheer
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings/payments" className="flex items-center cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Betalingen
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings/trash" className="flex items-center cursor-pointer">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Prullenbak
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/logout" className="flex items-center cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Afmelden
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

