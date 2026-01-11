import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs } from '../data/blogs';
import Section from '../components/ui/Section';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

export default function BlogList() {
    return (
        <div className="bg-heritage-cream min-h-screen pt-20">
            <Section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-heritage-gold font-bold tracking-widest uppercase text-sm mb-4 block">Journal</span>
                    <h1 className="text-5xl md:text-6xl font-serif text-heritage-charcoal mb-6">Stories from the Rock</h1>
                    <p className="text-xl text-heritage-charcoal/70 max-w-2xl mx-auto font-light">
                        Chronicles of heritage, adventure, and the community shaping Kangundi's future.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-heritage-sand/20"
                        >
                            <Link to={`/blog/${blog.slug}`} className="block h-full flex flex-col">
                                <div className="relative h-64 overflow-hidden bg-heritage-charcoal/10">
                                    <div className="absolute inset-0 bg-heritage-charcoal/20 group-hover:bg-transparent transition-colors z-10"></div>
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <span className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur text-heritage-charcoal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2">
                                        <Tag size={12} className="text-heritage-gold" />
                                        {blog.category}
                                    </span>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-xs text-heritage-charcoal/50 mb-3 font-mono">
                                        <Calendar size={12} />
                                        {blog.date}
                                    </div>
                                    <h3 className="text-2xl font-serif text-heritage-charcoal mb-3 leading-tight group-hover:text-heritage-gold transition-colors">
                                        {blog.title}
                                    </h3>
                                    <p className="text-heritage-charcoal/70 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                                        {blog.excerpt}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-heritage-gold font-bold text-sm tracking-wide uppercase group-hover:gap-3 transition-all">
                                        Read Story <ArrowRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
