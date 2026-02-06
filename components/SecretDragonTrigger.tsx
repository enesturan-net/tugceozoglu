'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import SecretMessagePanel from './SecretMessagePanel';

export default function SecretDragonTrigger() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHolding, setIsHolding] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const startHold = () => {
        setIsHolding(true);
        timeoutRef.current = setTimeout(() => {
            setIsOpen(true);
            setIsHolding(false);
        }, 3000); // 3 seconds hold required
    };

    const endHold = () => {
        setIsHolding(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    return (
        <>
            {/* Invisible Trigger Area - Full width at bottom but extremely subtle */}
            <div
                className="relative w-full h-32 flex items-end justify-center pb-8 select-none"
                onMouseDown={startHold}
                onMouseUp={endHold}
                onMouseLeave={endHold}
                onTouchStart={startHold}
                onTouchEnd={endHold}
            >
                {/* Visual Feedback during HOLD only */}
                <AnimatePresence>
                    {isHolding && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1.2 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 3, ease: "easeIn" }} // Match timeout duration
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-red-900/20 blur-xl rounded-full animate-pulse" />
                            <Eye className="w-12 h-12 text-red-900/40 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "100%" }}
                                transition={{ duration: 3, ease: "linear" }}
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 bg-red-600/50"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Hidden Hint - Only visible if you know where to look (very faint) */}
                {!isHolding && !isOpen && (
                    <div className="w-2 h-2 rounded-full bg-zinc-900/10 opacity-5" />
                )}

            </div>

            <SecretMessagePanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
