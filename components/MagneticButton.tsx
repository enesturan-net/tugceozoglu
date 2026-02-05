"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MagneticButton({
    children,
    className = "",
    href,
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        x.set(middleX);
        y.set(middleY);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    const Component = href ? motion.a : motion.button;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            style={{ position: "relative" }}
        >
            <Component
                href={href}
                onClick={onClick}
                style={{ x: mouseX, y: mouseY }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={className}
            >
                {children}
            </Component>
        </motion.div>
    );
}
