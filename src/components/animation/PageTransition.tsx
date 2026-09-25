import { motion } from "framer-motion"

interface PageTransitionProps {
  children: React.ReactNode;
}

function PageTransition({children}: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.50,
        ease: "easeOut",
      }}
    >
      { children }
    </motion.div>
  )
}

export default PageTransition;