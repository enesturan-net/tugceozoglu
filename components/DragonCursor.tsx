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
                position: "absolute",
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
            >
                {/* Raw GIF rendering without any effects/filters/glows */}
                <div className="relative flex items-center justify-center w-32 h-32">
                    <img
                        src="/dragon.gif"
                        alt="Dragon Cursor"
                        className="w-full h-full object-contain"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
