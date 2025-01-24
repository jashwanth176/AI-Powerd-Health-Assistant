"use client"

import type { NextPage } from "next"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Testimonials from "../components/Testimonials"
import CallToAction from "../components/CallToAction"

const Home: NextPage = () => {
  return (
    <main className="bg-gradient-to-b from-slate-900 to-slate-800 text-white min-h-screen">
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
    </main>
  )
}

export default Home

