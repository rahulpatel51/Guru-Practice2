"use client"

import { Heart } from "lucide-react"
import Link from "next/link"

export default function DashboardFooter() {
  return (
    <footer className="border-t py-4 px-6 bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">© 2023 ShopAdmin. All rights reserved.</div>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400">
            Terms
          </Link>
          <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400">
            Privacy
          </Link>
          <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400">
            Help
          </Link>
          <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400 flex items-center gap-1">
            <Heart className="h-3 w-3" /> Support
          </Link>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Version 1.0.0</div>
      </div>
    </footer>
  )
}

