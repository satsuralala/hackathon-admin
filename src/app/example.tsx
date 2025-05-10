"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
export default function Page() {
  const hi = async () => {
    await fetch("api");
  };
  useEffect(() => {
    hi();
  }, []);
  return (
    <main>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="p-6 bg-blue-500 text-white rounded-xl shadow-md"
      >
        <h1 className="text-xl font-bold">Сайн байна уу!</h1>
        <p>Би зүүн талаас урсаж гарч ирлээ.</p>
      </motion.div>
    </main>
  );
}
