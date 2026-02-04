"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Firefly() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth catch-up (3s delay-ish feeling via heavy damping/stiffness)
    const springConfig = { damping: 50, stiffness: 50, mass: 3 };
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
                    x: [0, 20, -20, 10, -10, 0],
                    y: [0, -20, 20, -10, 10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                }}
            >
                <div className="relative">
                    {/* Core */}
                    <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_15px_3px_rgba(250,204,21,0.6)]" />

                    {/* Glow halo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-400/20 rounded-full blur-md" />
                </div>
            </motion.div>
        </motion.div>
    );
}
