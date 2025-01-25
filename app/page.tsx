"use client"

import type { NextPage } from "next"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Testimonials from "../components/Testimonials"
import CallToAction from "../components/CallToAction"

const Home: NextPage = () => {
  return (
    <main className="bg-gradient-to-b from-slate-900 to-slate-800 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Hero />
          <div className="space-y-24 py-12 sm:py-16 lg:py-20">
            <Features />
            <Testimonials />
            <CallToAction />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home

