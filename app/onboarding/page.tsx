"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, animate } from "framer-motion"
import ScrollProgress from "../../components/ScrollProgress"
import FormSection from "../../components/FormSection"
import ModelSection from "../../components/ModelSection"
import { useRouter } from "next/navigation"
import axios from 'axios'

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
    
    const updatedFormData = {
      ...formData,
      [field]: value
    }
    
    setFormData(updatedFormData)

    if (field === "fitnessGoals") {
      try {
        console.log('Final form data:', updatedFormData)
        
        const response = await axios.post('https://hms-da9g.onrender.com/userSignup', updatedFormData);
        
        if (response.data.body && response.data.body.code === 10) {
          router.push('/login')
        } else {
          //alert('Failed to create account.');
          router.push('/login')
        }

      } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred during signup.');
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
              className="min-h-screen w-screen flex items-center justify-center relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-6 sm:py-8"
              style={{
                position: 'relative',
                zIndex: formSections.length - index
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-purple-500/5" />
              <div className="relative w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
                {index % 2 === 0 ? (
                  <>
                    <FormSection 
                      section={section} 
                      onComplete={(value) => handleFormSubmit(section.field, value)} 
                      className="w-full md:w-1/2"
                    />
                    <ModelSection modelIndex={index} className="w-full md:w-1/2 mt-4 sm:mt-6 md:mt-0" />
                  </>
                ) : (
                  <>
                    <ModelSection modelIndex={index} className="w-full md:w-1/2" />
                    <FormSection 
                      section={section} 
                      onComplete={(value) => handleFormSubmit(section.field, value)} 
                      className="w-full md:w-1/2 mt-4 sm:mt-6 md:mt-0"
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