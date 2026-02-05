"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function FloatingMenu() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: 100 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-full shadow-2xl flex items-center gap-8"
        >
            {["Work", "About", "Contact"].map((item, i) => (
                <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-300 relative group"
                >
                    {item}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
                </a>
            ))}
        </motion.nav>
    );
}
