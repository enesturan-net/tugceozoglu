"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";

interface Author {
    name: string;
    bio: any;
    image: any;
}

export default function About() {
    const [author, setAuthor] = useState<Author | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const data = await client.fetch(`*[_type == "author"][0]`);
                setAuthor(data);
            } catch (error) {
                console.error("Error fetching author:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAuthor();
    }, []);

    if (loading) return null;

    return (
        <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-20 relative z-10 bg-background/50 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-center max-w-5xl w-full">
                {/* Image Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative aspect-[3/4] w-full mx-auto"
                >
                    <div className="absolute inset-0 border border-metal/30 translate-x-3 translate-y-3 z-0" />
                    <div className="relative h-full w-full overflow-hidden z-10 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out">
                        {author?.image ? (
                            <img
                                src={urlFor(author.image).width(400).auto('format').fit('max').quality(80).url()}
                                alt={author.name || "Author"}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700">
                                <span className="text-xs uppercase tracking-widest">[ No Image ]</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Text Side */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="space-y-6 text-center md:text-left"
                >
                    <h2 className="text-4xl md:text-5xl font-serif">
                        {author?.name ? `Hakkımda` : "Hakkımda"}
                    </h2>
                    <div className="space-y-4 text-metal text-base md:text-lg font-light leading-relaxed prose prose-invert max-w-none">
                        {author?.bio ? (
                            <PortableText value={author.bio} />
                        ) : (
                            <p className="text-zinc-500 italic">
                                (Henüz CMS üzerinden içerik girilmedi.)
                            </p>
                        )}
                    </div>

                    <div className="pt-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 border border-metal text-metal hover:bg-white hover:text-black hover:border-white transition-colors duration-300 uppercase tracking-widest text-xs"
                        >
                            İletişime Geç
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
