"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { X } from "lucide-react"; // Assuming lucide-react is available, or use a simple SVG

interface Project {
    _id: string;
    title: string;
    description: string;
    slug: { current: string };
    mainImage: any;
    videoFile: { asset: { _ref: string; url: string } } | null;
    categories: string[];
}

export default function Gallery() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await client.fetch(`*[_type == "project"] | order(orderRank asc) {
        _id,
        title,
        description,
        slug,
        mainImage,
        videoFile {
            asset->{
                _id,
                url
            }
        },
        categories
      }`);
            setProjects(data);
        };
        fetchProjects();
    }, []);

    // Close modal on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedProject(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <section id="work" className="min-h-screen py-20 px-4 md:px-10 bg-black relative z-10">
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
                            onClick={() => setSelectedProject(project)}
                            layoutId={`project-${project._id}`}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors duration-500">
                                {project.videoFile?.asset?.url ? (
                                    <video
                                        src={project.videoFile.asset.url}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 bg-black"
                                    />
                                ) : project.mainImage ? (
                                    <div className="w-full h-full relative">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center opacity-20 blur-xl"
                                            style={{ backgroundImage: `url(${urlFor(project.mainImage).width(200).url()})` }}
                                        />
                                        <img
                                            src={urlFor(project.mainImage).width(800).auto('format').fit('max').quality(80).url()}
                                            alt={project.title}
                                            className="relative z-10 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-700 text-sm tracking-widest uppercase">
                                        [ Görsel Yok ]
                                    </div>
                                )}

                                {/* Overlay Content (Grid View) */}
                                <div className="absolute inset-0 z-20 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                                    <h3 className="text-2xl font-serif text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                        {project.title}
                                    </h3>
                                    {project.categories && (
                                        <p className="text-xs text-zinc-400 uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                                            {project.categories.join(" / ")}
                                        </p>
                                    )}
                                    <p className="mt-4 text-xs text-accent uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                        İncele
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 overflow-hidden">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
                        />

                        {/* Modal Content */}
                        <motion.div
                            layoutId={`project-${selectedProject._id}`}
                            className="relative w-full max-w-5xl max-h-[90vh] bg-zinc-900 border border-zinc-800 shadow-2xl overflow-y-auto rounded-lg custom-scrollbar flex flex-col md:flex-row pointer-events-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedProject(null);
                                }}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/20 rounded-full transition-colors text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>

                            {/* Media Section */}
                            <div className="w-full md:w-2/3 bg-black flex items-center justify-center p-4">
                                {selectedProject.videoFile?.asset?.url ? (
                                    <video
                                        src={selectedProject.videoFile.asset.url}
                                        controls
                                        autoPlay
                                        className="w-full h-auto max-h-[80vh] object-contain"
                                    />
                                ) : selectedProject.mainImage ? (
                                    <img
                                        src={urlFor(selectedProject.mainImage).width(1200).auto('format').fit('max').quality(100).url()}
                                        alt={selectedProject.title}
                                        className="w-full h-auto max-h-[80vh] object-contain"
                                    />
                                ) : null}
                            </div>

                            {/* Info Section */}
                            <div className="w-full md:w-1/3 p-8 border-l border-zinc-800 flex flex-col justify-center">
                                {selectedProject.categories && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {selectedProject.categories.map((cat, i) => (
                                            <span key={i} className="text-xs text-accent uppercase tracking-widest border border-accent/20 px-2 py-1">
                                                {cat}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <h3 className="text-3xl md:text-4xl font-serif text-white mb-6">
                                    {selectedProject.title}
                                </h3>
                                <div className="prose prose-invert prose-sm text-zinc-400 leading-relaxed">
                                    {selectedProject.description || "Bu proje için henüz bir açıklama girilmemiş."}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
