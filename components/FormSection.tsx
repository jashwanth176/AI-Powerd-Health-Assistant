import { useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { motion } from "framer-motion"

interface FormSectionProps {
  section: {
    field: string
    label: string
    type: string
    options?: string[]
  }
  onComplete: (value: string | string[]) => void
  className?: string
}
export default function FormSection({ section, onComplete, className }: FormSectionProps) {
  const [value, setValue] = useState<string | string[]>(section.type === "multiselect" ? [] : "")
  const isLastSection = section.field === "fitnessGoals"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      (Array.isArray(value) && value.length > 0) || 
      (!Array.isArray(value) && value)
    ) {
      onComplete(value)
    }
  }

  const handleMultiSelect = (option: string) => {
    if (Array.isArray(value)) {
      if (value.includes(option)) {
        setValue(value.filter(v => v !== option))
      } else {
        setValue([...value, option])
      }
    } else {
      setValue([option])
    }
  }
  
  const renderInput = () => {
    switch (section.type) {
      case "email":
        return (
          <Input
            type="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="text-2xl p-4 bg-white/10 border-none text-white placeholder-gray-400"
            placeholder="Enter your email"
            required
          />
        )
      case "number":
        if (section.field === "age") {
          return (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="13"
                  max="100"
                  step="1"
                  value={value || "25"}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-2xl text-white min-w-[100px]">
                  {value || "25"} years
                </span>
              </div>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="text-2xl p-4 bg-white/10 border-none text-white placeholder-gray-400"
                placeholder="Enter your age"
                step="1"
                min="13"
                max="100"
              />
            </div>
          )
        }
        case "number":
        if (section.field === "weight") {
          return (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="30"
                  max="200"
                  step="0.1"
                  value={value || "70"}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-2xl text-white min-w-[100px]">
                  {value || "70"} kg
                </span>
              </div>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="text-2xl p-4 bg-white/10 border-none text-white placeholder-gray-400"
                placeholder="Enter your weight in kg"
                step="0.1"
                min="30"
                max="200"
              />
            </div>
          )
        }
        if (section.field === "height") {
          return (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="100"
                  max="250"
                  step="0.1"
                  value={value || "170"}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-2xl text-white min-w-[100px]">
                  {value || "170"} cm
                </span>
              </div>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="text-2xl p-4 bg-white/10 border-none text-white placeholder-gray-400"
                placeholder="Enter your height in cm"
                step="0.1"
                min="100"
                max="250"
              />
            </div>
          )
        }
        return (
          <Input
            type={section.type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="text-2xl p-4 bg-white/10 border-none text-white placeholder-gray-400"
            placeholder={`Enter your ${section.field}`}
          />
        )
      case "text":
      case "password":
        return (
          <Input
            type={section.type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="text-2xl p-4 bg-white/10 border-none text-white placeholder-gray-400"
            placeholder={`Enter your ${section.field}`}
          />
        )
      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="text-2xl p-4 bg-white/10 border-none text-white placeholder-gray-400"
            placeholder={`Enter your ${section.field}`}
          />
        )
      case "select":
        return (
          <Select onValueChange={setValue} defaultValue={value as string}>
            <SelectTrigger className="text-2xl p-4 bg-white/10 border-none text-white placeholder-gray-400">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {section.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "multiselect":
        return (
          <div className="grid grid-cols-2 gap-4">
            {section.options?.map((option) => (
              <Button
                key={option}
                type="button"
                onClick={() => handleMultiSelect(option)}
                className={`p-4 ${
                  Array.isArray(value) && value.includes(option)
                    ? "bg-teal-500 hover:bg-teal-600"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {option}
              </Button>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`${className} p-4 sm:p-6 md:p-12 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl`}
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
        <Label className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          {section.label}
        </Label>
        <div className="mt-4 sm:mt-6 md:mt-8">
          {renderInput()}
        </div>
        <Button 
          type="submit" 
          className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-teal-500 to-purple-500 text-white hover:opacity-90 text-base sm:text-lg md:text-xl py-3 sm:py-4 md:py-6 px-4 sm:px-6 md:px-8 rounded-xl w-full transition-all duration-300 shadow-lg hover:shadow-teal-500/20"
          disabled={
            (Array.isArray(value) && value.length === 0) || 
            (!Array.isArray(value) && !value)
          }
        >
          {isLastSection ? "Submit" : "Continue"}
        </Button>
      </form>
    </motion.div>
  )
}
