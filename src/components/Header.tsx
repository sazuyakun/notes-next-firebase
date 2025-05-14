'use client'

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { logout } from "@/lib/firebase/auth"
import { useRouter } from "next/navigation"


export default function Header() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  }

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex justify-between items-center max-w-4xl mx-auto">
        <Link href="/" className="text-xl font-bold">
          Note-Taking App
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link href="/notes">Notes</Link>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/signup">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
