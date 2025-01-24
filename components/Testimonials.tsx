import { motion, useScroll, useTransform } from "framer-motion"

const testimonials = [
  {
    name: "Prannneth",
    text: "This app has completely transformed my approach to health and fitness. The personalized workouts and nutrition advice are spot-on!",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Prudhvi",
    text: "I've tried many health apps, but this one stands out. The mental wellness features have been particularly helpful in managing my stress levels.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Kamal",
    text: "The tailored approach of this app makes it feel like I have a personal health coach in my pocket. Highly recommended!",
    image: "/placeholder.svg?height=80&width=80",
  },
]

const TestimonialCard = ({ name, text }: { name: string; text: string }) => (
  <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
    <p className="text-lg mb-4 text-gray-300">{text}</p>
    <div className="flex items-center">
      <span className="font-semibold text-white">{name}</span>
    </div>
  </div>
)

const Testimonials = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section className="py-20 relative overflow-hidden">
      <motion.div style={{ y }} className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Testimonials

