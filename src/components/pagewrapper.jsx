'use client';
import { motion } from 'framer-motion';

export default function PageWrapper({ children, ...props }) {
  return (
    <motion.div
      {...props}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{ opacity: 0, y: 20 }}
    >
      {children}
    </motion.div>
  );
}
