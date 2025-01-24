"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, animate } from "framer-motion"
import ScrollProgress from "../../components/ScrollProgress"
import FormSection from "../../components/FormSection"
import ModelSection from "../../components/ModelSection"
import { useRouter } from "next/navigation"

interface FormData {
  name: string
  email: string
  password: string
  age: string
  weight: string
  height: string
  activityLevel: string
  medicalHistory: string[]
  fitnessGoals: string[]
}

export default function OnboardingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    height: "",
    activityLevel: "",
    medicalHistory: [],
    fitnessGoals: [],
  })
  const router = useRouter()

  const formSections = [
    { field: "name", label: "What's your name?", type: "text" },
    { field: "email", label: "What's your email?", type: "email" },
    { field: "password", label: "Create a password", type: "password" },
    { field: "age", label: "How old are you?", type: "number", unit: "years" },
    { field: "weight", label: "What's your weight?", type: "number", unit: "kg" },
    { field: "height", label: "How tall are you?", type: "number", unit: "cm" },
    {
      field: "activityLevel",
      label: "What's your activity level?",
      type: "select",
      options: ["Sedentary", "Light", "Moderate", "Active", "Very Active"],
    },
    {
      field: "medicalHistory",
      label: "Any medical conditions?",
      type: "multiselect",
      options: [
        "None",
        "Diabetes",
        "Hypertension",
        "Heart Disease",
        "Asthma",
        "Arthritis",
        "Back Pain",
        "Other"
      ],
    },
    {
      field: "fitnessGoals",
      label: "What are your fitness goals?",
      type: "multiselect",
      options: ["Weight Loss", "Muscle Gain", "Improved Endurance", "Better Flexibility", "Overall Health"],
    },
  ]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const scrollToNextSection = () => {
    if (containerRef.current) {
      const nextSection = currentSection + 1
      const sectionHeight = window.innerHeight
      const targetScroll = nextSection * sectionHeight
      
      animate(containerRef.current.scrollTop, targetScroll, {
        duration: 1,
        ease: [0.32, 0.72, 0, 1],
        onUpdate: (value) => {
          if (containerRef.current) {
            containerRef.current.scrollTop = value
          }
        },
        onComplete: () => setCurrentSection(nextSection)
      })
    }
  }

  const handleFormSubmit = async (field: string, value: string | string[]) => {
    console.log(`Submitting ${field}:`, value)
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    if (field === "fitnessGoals") {
      try {
        const finalFormData = {
          ...formData,
          [field]: value
        }
        
        console.log('Final form data:', finalFormData)
        
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalFormData)
        })

        if (response.ok) {
          router.push('/dashboard')
        } else {
          const error = await response.json()
          console.error('Signup failed:', error)
          // Show error message to user
        }
      } catch (error) {
        console.error('Signup error:', error)
        // Show error message to user
      }
    } else {
      scrollToNextSection()
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <motion.div
        ref={containerRef}
        className="absolute inset-0 overflow-y-scroll overflow-x-hidden"
      >
        <ScrollProgress progress={scrollYProgress.get()} />
        <div className="w-full" style={{ height: `${formSections.length * 100}vh` }}>
          {formSections.map((section, index) => (
            <motion.div
              key={section.field}
              className="h-screen w-screen flex items-center justify-center relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
              style={{
                position: 'relative',
                zIndex: formSections.length - index
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-purple-500/5" />
              <div className="relative w-full max-w-7xl mx-auto px-4 flex items-center justify-center">
                {index % 2 === 0 ? (
                  <>
                    <FormSection 
                      section={section} 
                      onComplete={(value) => handleFormSubmit(section.field, value)} 
                    />
                    <ModelSection modelIndex={index} />
                  </>
                ) : (
                  <>
                    <ModelSection modelIndex={index} />
                    <FormSection 
                      section={section} 
                      onComplete={(value) => handleFormSubmit(section.field, value)} 
                    />
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 