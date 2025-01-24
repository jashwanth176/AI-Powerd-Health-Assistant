"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface ImageUploadProps {
  onImageUpload?: (imageData: string) => void
}

export const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {

  const [image, setImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
      if (onImageUpload) {
        onImageUpload(e.target?.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <motion.div
      className={`w-full max-w-md mx-auto p-6 rounded-lg text-center ${
        isDragging ? "bg-slate-700" : "bg-slate-800"
      } border-2 border-dashed border-gray-300 transition-colors duration-300`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {image ? (
        <div className="relative w-full h-64">
          <Image src={image || "/placeholder.svg"} alt="Uploaded workout" layout="fill" objectFit="contain" />
        </div>
      ) : (
        <>
          <p className="text-white mb-4">Drop your workout image here or click to upload</p>
          <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" id="fileInput" />
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Select Image
          </label>
        </>
      )}
    </motion.div>
  )
}

