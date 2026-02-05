"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function DragonCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Adjusted mass for a much faster feel (~0.5s delay)
    const springConfig = { damping: 30, stiffness: 80, mass: 1 };
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

    const [direction, setDirection] = useState(1); // 1 = Right, -1 = Left

    useEffect(() => {
        // Update direction based on relative position to mouse
        const unsubscribe = x.on("change", (currentX) => {
            const mouseXValue = mouseX.get();
            // If cursor is to the left (mouseX < currentX), face left (-1)
            // If cursor is to the right (mouseX > currentX), face right (1)
            if (mouseXValue < currentX) {
                setDirection(-1);
            } else {
                setDirection(1);
            }
        });
        return () => unsubscribe();
    }, [x, mouseX]);

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
                    scaleX: direction, // Flip based on direction
                }}
                transition={{
                    y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                    scaleX: {
                        duration: 0.2, // Smooth flip
                    }
                }}
            >
                {/* Dragon GIF - Smaller size & Cache busting */}
                <div className="relative flex items-center justify-center w-20 h-20">
                    <img
                        src={`/dragon.gif?v=${new Date().getTime()}`}
                        alt="Dragon Cursor"
                        className="relative w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] opacity-50"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
