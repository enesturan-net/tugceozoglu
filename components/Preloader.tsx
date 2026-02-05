"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Intro duration
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[999999] bg-black flex items-center justify-center pointer-events-none"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-widest mix-blend-difference">
                            TUĞÇE ÖZOĞLU
                        </h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 100 }}
                            transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                            className="h-[1px] bg-white mt-4"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
