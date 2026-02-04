"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";

interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage: any;
    categories: string[];
}

export default function Gallery() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await client.fetch(`*[_type == "project"]{
        _id,
        title,
        slug,
        mainImage,
        categories
      }`);
            setProjects(data);
        };
        fetchProjects();
    }, []);

    return (
        <section className="min-h-screen py-20 px-4 md:px-10 bg-black relative z-10">
            <div className="max-w-[1600px] mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-serif text-center mb-16 md:mb-24"
                >
                    Seçilmiş İşler
                </motion.h2>

                {/* Grid Layout (Uniform) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors duration-500">
                                {project.mainImage ? (
                                    <img
                                        src={urlFor(project.mainImage).width(800).height(1067).auto('format').fit('crop').quality(80).url()}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-700 text-sm tracking-widest uppercase">
                                        [ Görsel Yok ]
                                    </div>
                                )}

                                {/* Overlay Content */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-6">
                                    <h3 className="text-2xl font-serif text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                        {project.title}
                                    </h3>
                                    {project.categories && (
                                        <p className="text-xs text-zinc-400 uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                                            {project.categories.join(" / ")}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
