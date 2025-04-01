"use client"

import { Menu, Search, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HelpCircle, LogOut, Palette, Settings, UserIcon } from "lucide-react"
import NotificationsPopover from "@/components/notifications/notifications-popover"
import { useTheme } from "next-themes"
import type { User } from "@/types"
import { signOut } from "@/services/auth-service"
import { useRouter } from "next/navigation"

interface DashboardHeaderProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  onProfileClick: () => void
  onNotificationsClick: () => void
  user?: User | null
}

export default function DashboardHeader({
  isSidebarOpen,
  setIsSidebarOpen,
  searchQuery,
  setSearchQuery,
  onProfileClick,
  onNotificationsClick,
  user,
}: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
      <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
        <Menu className="w-5 h-5 dark:text-gray-300" />
      </Button>
      <div className="flex items-center w-full max-w-md ml-auto">
        <div className="relative w-full">
          <Input
            placeholder="Search..."
            className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="flex items-center ml-4 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              {theme === "dark" ? (
                <Moon className="h-5 w-5 text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
            <DropdownMenuItem onClick={() => setTheme("light")} className="dark:text-gray-300 dark:focus:bg-gray-700">
              <Sun className="mr-2 h-4 w-4" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="dark:text-gray-300 dark:focus:bg-gray-700">
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className="dark:text-gray-300 dark:focus:bg-gray-700">
              <Palette className="mr-2 h-4 w-4" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <NotificationsPopover onViewAllClick={onNotificationsClick} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="w-8 h-8 border dark:border-gray-700">
                <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "Admin"} />
                <AvatarFallback>{user?.name?.substring(0, 2).toUpperCase() || "AD"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium text-sm dark:text-gray-100">{user?.name || "Admin User"}</p>
                <p className="w-[200px] truncate text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || "admin@example.com"}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator className="dark:bg-gray-700" />
            <DropdownMenuItem className="dark:text-gray-300 dark:focus:bg-gray-700" onClick={onProfileClick}>
              <UserIcon className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="dark:text-gray-300 dark:focus:bg-gray-700"
              onClick={() => router.push("/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="dark:text-gray-300 dark:focus:bg-gray-700">
              <Palette className="mr-2 h-4 w-4" />
              Appearance
            </DropdownMenuItem>
            <DropdownMenuSeparator className="dark:bg-gray-700" />
            <DropdownMenuItem className="dark:text-gray-300 dark:focus:bg-gray-700">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator className="dark:bg-gray-700" />
            <DropdownMenuItem className="dark:text-gray-300 dark:focus:bg-gray-700" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

