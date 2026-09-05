'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.6, 0.05, 0.15, 1] }}
        className="pointer-events-none fixed inset-0 z-[999] bg-forest"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.05, ease: [0.6, 0.05, 0.15, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}