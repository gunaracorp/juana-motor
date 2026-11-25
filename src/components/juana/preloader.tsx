"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0b0d]"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          onClick={() => setDone(true)}
        >
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute h-72 w-72 rounded-full bg-[#e11d2e]/20 blur-[100px] animate-glow" />

          {/* Roda berputar */}
          <div className="relative mb-8">
            <motion.div
              className="h-20 w-20 rounded-full border-4 border-[#e11d2e] border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 m-auto h-8 w-8 rounded-full border-4 border-[#f59e0b] border-b-transparent"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
            />
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl font-bold tracking-widest text-white md:text-5xl"
            >
              JUANA <span className="text-[#e11d2e]">MOTOR</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-3 text-xs uppercase tracking-[0.5em] text-white/50"
          >
            Tasikmalaya
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
            className="mt-6 h-[3px] w-56 origin-left bg-gradient-to-r from-[#e11d2e] via-[#f59e0b] to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
