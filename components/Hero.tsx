"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Elements (Biomorphic/Cyber) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-900 rounded-full mix-blend-difference filter blur-3xl opacity-30 animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-zinc-800 rounded-full mix-blend-difference filter blur-[100px] opacity-20" />
            </div>

            <div className="relative z-10 text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-bold tracking-tighter text-accent mix-blend-difference"
                >
                    TUĞÇE
                    <br />
                    ÖZOĞLU
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-8 h-[1px] w-24 bg-metal mx-auto"
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="text-sm md:text-base tracking-[0.3em] uppercase text-zinc-400"
                >
                    Graphic Designer
                </motion.p>
            </div>
        </section>
    );
}
