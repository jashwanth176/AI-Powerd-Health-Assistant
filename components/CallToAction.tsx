import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const CallToAction = () => {
  const router = useRouter()

  return (
    <section className="py-20 bg-teal-600">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6 text-white"
        >
          Ready to Transform Your Health?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl mb-8 text-gray-100"
        >
          Join thousands of users who have already improved their lifestyle with our personalized health assistant.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={() => router.push('/onboarding')}
          className="bg-white text-teal-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-teal-100 transition duration-300"
        >
          Get Started Now
        </motion.button>
      </div>
    </section>
  )
}

export default CallToAction

