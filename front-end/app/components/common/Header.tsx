"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Sparkles } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // State to track login status

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/check-session', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.status === "authenticated") {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include' 
      });

      if (response.ok) {
        setIsLoggedIn(false);
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
      <a className="flex items-center justify-center" href="#">
        <Sparkles className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold">SaveSquad</span>
      </a>
      <nav className="flex items-center gap-4 sm:gap-6">
        <a className="text-sm font-medium hover:underline underline-offset-4" href="/pages/welcome">
          Dashboard
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="/pages/challenges">
          Challenges
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="/pages/friends">
          Friends
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="/pages/rewards">
          Rewards
        </a>
      </nav>
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <hr/>
      </div>
    </header>
  )
}


