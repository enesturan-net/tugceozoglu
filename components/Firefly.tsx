"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Firefly() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Ultra-slow catch-up (Heavy mass for 5s feel)
    const springConfig = { damping: 100, stiffness: 20, mass: 15 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsHovering(true);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    if (!isHovering) return null;

    return (
        <motion.div
            style={{
                position: "fixed",
                left: x,
                top: y,
                zIndex: 9999,
                pointerEvents: "none",
            }}
            className="fixed top-0 left-0 pointer-events-none z-50"
        >
            <motion.div
                animate={{
                    x: [0, 30, -30, 15, -15, 0],
                    y: [0, -30, 30, -15, 15, 0],
                }}
                transition={{
                    duration: 10, // Much slower movement
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                }}
            >
                <div className="relative">
                    {/* Core - Smaller */}
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_15px_2px_rgba(250,204,21,0.5)]" />

                    {/* Glow halo - Smaller */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400/10 rounded-full blur-sm" />
                </div>
            </motion.div>
        </motion.div>
    );
}
