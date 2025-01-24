"use client"

import { useEffect, useState } from "react"
import Dashboard from "../../components/Dashboard"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in by looking for userData in localStorage
    const storedUserData = localStorage.getItem('userData')
    if (!storedUserData) {
      router.push('/login')
      return
    }

    try {
      const parsedData = JSON.parse(storedUserData)
      setUserData(parsedData)
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    }
  }, [router])

  if (!userData) {
    return <div>Loading...</div>
  }

  return <Dashboard userName={userData.name || 'User'} />
} 