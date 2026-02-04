"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function DragonCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Heavy mass for the "5s delay" feeling requested
    const springConfig = { damping: 100, stiffness: 20, mass: 15 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Use pageX/Y instead of clientX/Y so it stays absolute to the document
            // This ensures it scrolls away, then flies back when mouse moves
            mouseX.set(e.pageX);
            mouseY.set(e.pageY);
            setIsVisible(true);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <motion.div
            style={{
                position: "absolute", // Changed from fixed to absolute
                left: x,
                top: y,
                zIndex: 9999,
                pointerEvents: "none",
            }}
            className="absolute top-0 left-0 pointer-events-none z-50 will-change-transform"
        >
            <motion.div
                animate={{
                    y: [0, -10, 0], // Gentle hovering
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ rotate: 90 }} // Rotate to face direction roughly
            >
                <div className="relative">
                    {/* Glow halo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-500/20 rounded-full blur-md" />

                    {/* Dragon SVG */}
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]"
                    >
                        {/* Body */}
                        <path
                            d="M12 2C12 2 14 5 14 9C14 13 12 18 10 20C8 22 5 22 5 22C5 22 7 18 8 15C9 12 8 8 7 6"
                            stroke="#FACC15"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />

                        {/* Left Wing - Animated */}
                        <motion.path
                            d="M14 9L20 4L16 12"
                            stroke="#FACC15"
                            strokeWidth="1"
                            fill="rgba(250, 204, 21, 0.3)"
                            animate={{
                                scaleY: [1, 0.5, 1],
                                skewX: [0, -10, 0]
                            }}
                            transition={{
                                duration: 0.2, // Fast flapping
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />

                        {/* Right Wing - Animated */}
                        <motion.path
                            d="M14 9L20 16L16 14"
                            stroke="#FACC15"
                            strokeWidth="1"
                            fill="rgba(250, 204, 21, 0.3)"
                            animate={{
                                scaleY: [1, 0.5, 1],
                                skewX: [0, 10, 0]
                            }}
                            transition={{
                                duration: 0.2,
                                repeat: Infinity,
                                ease: "linear",
                                delay: 0.1
                            }}
                        />

                        {/* Tail */}
                        <path d="M10 20C9 22 7 23 4 23" stroke="#FACC15" strokeWidth="1" />
                    </svg>
                </div>
            </motion.div>
        </motion.div>
    );
}
