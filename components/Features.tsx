import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Dumbbell, Utensils, Brain } from "lucide-react"

const features = [
  {
    icon: Dumbbell,
    title: "Personalized Workouts",
    description: "Get tailored exercise routines based on your fitness level and goals.",
  },
  {
    icon: Utensils,
    title: "Nutrition Guidance",
    description: "Receive customized meal plans and dietary advice to support your health journey.",
  },
  {
    icon: Brain,
    title: "Mental Wellness",
    description: "Access tools and resources to improve your mental health and reduce stress.",
  },
]

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-slate-800 p-6 rounded-lg shadow-lg"
    >
      <Icon className="w-12 h-12 text-teal-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">How We Help You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

