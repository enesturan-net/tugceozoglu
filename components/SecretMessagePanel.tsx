'use client';

import { useEffect, useState } from 'react';
import { createClient } from 'next-sanity';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scroll, Flame } from 'lucide-react';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
});

interface Message {
    _id: string;
    text: string;
    timestamp: string;
}

interface SecretMessagePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SecretMessagePanel({ isOpen, onClose }: SecretMessagePanelProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            client
                .fetch(`*[_type == "secretMessage" && isVisible == true] | order(timestamp desc)`)
                .then((data) => {
                    setMessages(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                >
                    {/* Main Parchment Container */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotateX: 10 }}
                        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="relative w-full max-w-2xl h-[80vh] bg-[#d4c6a9] rounded-sm shadow-[0_0_50px_rgba(255,100,0,0.2)] overflow-hidden flex flex-col"
                        style={{
                            backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
                            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5), 0 0 30px rgba(200, 100, 0, 0.3)'
                        }}
                    >
                        {/* Decorative Corner Borders */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-red-900/50 rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-red-900/50 rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-red-900/50 rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-red-900/50 rounded-br-lg" />

                        {/* Header */}
                        <div className="relative z-10 p-6 border-b-2 border-red-900/20 flex justify-between items-center bg-red-950/5">
                            <div className="flex items-center gap-3">
                                <Flame className="w-6 h-6 text-red-800 animate-pulse" />
                                <h2 className="text-3xl font-serif font-black tracking-widest text-red-950 uppercase opacity-80" style={{ fontFamily: 'serif' }}>
                                    Dragon's Whisper
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-red-900/20 rounded-full transition-colors group"
                            >
                                <X className="w-8 h-8 text-red-900 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                            {loading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="w-12 h-12 border-4 border-red-900/30 border-t-red-800 rounded-full animate-spin" />
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="text-center text-red-900/50 mt-20 italic text-xl font-serif">
                                    "The dragon sleeps. No whispers yet..."
                                </div>
                            ) : (
                                messages.map((msg, index) => (
                                    <motion.div
                                        key={msg._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative pl-8 border-l-2 border-red-900/30 py-2"
                                    >
                                        {/* Message Bullet/Icon */}
                                        <div className="absolute -left-[9px] top-3 w-4 h-4 bg-red-900/20 rounded-full border border-red-900/50" />

                                        <p className="font-serif text-xl leading-relaxed text-red-950/90 whitespace-pre-wrap">
                                            {msg.text}
                                        </p>
                                        <span className="block mt-2 text-sm font-sans text-red-900/40 uppercase tracking-wider">
                                            {new Date(msg.timestamp).toLocaleDateString('tr-TR', {
                                                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </span>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer Decoration */}
                        <div className="p-4 bg-red-950/10 text-center text-red-900/40 text-xs font-serif border-t border-red-900/10">
                            Secrets from the abyss
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
