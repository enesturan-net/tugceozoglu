"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import { motion } from "framer-motion";
import SecretDragonTrigger from "./SecretDragonTrigger";

interface Settings {
    footerText: string;
    socialLinks: { platform: string; url: string }[];
}

export default function Footer() {
    const [settings, setSettings] = useState<Settings | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const data = await client.fetch(`*[_type == "settings"][0]`);
            setSettings(data);
        };
        fetchSettings();
    }, []);

    return (
        <>
            <footer id="contact" className="relative z-10 w-full bg-zinc-950 py-16 px-4 border-t border-zinc-800 mt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* Copyright / Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-zinc-500 text-xs tracking-[0.2em] uppercase font-light"
                    >
                        {settings?.footerText || "© 2026 Tuğçe Özoğlu. All Rights Reserved."}
                    </motion.div>

                    {/* Social Links */}
                    <div className="flex gap-8">
                        {settings?.socialLinks?.map((link, i) => (
                            <motion.a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-white text-xs tracking-widest uppercase hover:text-accent transition-colors duration-300 relative group"
                            >
                                {link.platform}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                            </motion.a>
                        ))}
                        {!settings?.socialLinks && (
                            <span className="text-zinc-600 text-xs">[Social Links Not Set]</span>
                        )}
                    </div>
                </div>
            </footer>
            <SecretDragonTrigger />
        </>
    );
}
