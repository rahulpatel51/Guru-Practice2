import type React from "react"
import { ThemeToggle } from "@/components/theme-toggle"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b px-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="ShopAdmin Logo" className="h-8 w-auto" />
          <span className="text-xl font-semibold dark:text-white">ShopAdmin</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">{children}</main>
      <footer className="border-t py-4 text-center text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        <div className="container mx-auto px-6">
          <p>© 2023 ShopAdmin. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300">
              Terms
            </a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

