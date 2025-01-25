import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const CallToAction = () => {
  const router = useRouter()

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-teal-600 to-teal-700">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
          >
            Ready to Transform Your Health?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto"
          >
            Join thousands of users who have already improved their lifestyle with our personalized health assistant.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <button
              onClick={() => router.push('/onboarding')}
              className="w-full sm:w-auto bg-white text-teal-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-teal-50 transition duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction