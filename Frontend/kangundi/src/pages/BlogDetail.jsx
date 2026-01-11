import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs } from '../data/blogs';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import Button from '../components/ui/Button';

export default function BlogDetail() {
    const { slug } = useParams();
    const blog = blogs.find(b => b.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-heritage-cream">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-heritage-charcoal mb-4">Story Not Found</h1>
                    <Link to="/blog" className="text-heritage-gold hover:underline">Return to Journal</Link>
                </div>
            </div>
        );
    }

    return (
        <article className="bg-heritage-cream min-h-screen">
            {/* Hero Image */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-heritage-charcoal/30 z-10"></div>
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 px-6 container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-widest backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full w-fit">
                            <ArrowLeft size={16} /> Back to Journal
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-serif text-white font-bold leading-tight max-w-4xl mb-6 shadow-black/50 drop-shadow-lg">
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap gap-6 text-white/90 font-mono text-sm items-center">
                            <span className="flex items-center gap-2 bg-heritage-gold/90 text-heritage-charcoal px-3 py-1 rounded font-bold">
                                <Tag size={14} /> {blog.category}
                            </span>
                            <span className="flex items-center gap-2 backdrop-blur-md bg-black/30 px-3 py-1 rounded">
                                <Calendar size={14} /> {blog.date}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-20 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-lg prose-stone mx-auto"
                >
                    <p className="text-xl md:text-2xl leading-relaxed font-serif text-heritage-charcoal mb-12 border-l-4 border-heritage-gold pl-6 italic bg-white p-6 rounded-r-lg shadow-sm">
                        {blog.excerpt}
                    </p>

                    <div className="space-y-8 text-heritage-charcoal/80 leading-loose font-light text-lg">
                        {blog.content.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="my-12 relative h-96 rounded-xl overflow-hidden shadow-xl group">
                        <img
                            src={blog.image}
                            alt={`${blog.title} - Detail view`}
                            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                            <p className="text-white/80 italic text-sm">Visuals from Kangundhi.</p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    {blog.cta && (
                        <div className="mt-16 p-8 bg-heritage-charcoal text-heritage-cream rounded-2xl text-center shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-heritage-gold/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <h3 className="text-2xl font-serif mb-4 relative z-10">Inspired by this story?</h3>
                            <div className="flex justify-center relative z-10">
                                <Button variant="primary" className="bg-heritage-gold text-heritage-charcoal hover:bg-white border-none text-lg px-8 py-3">
                                    {blog.cta}
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="mt-12 flex justify-between items-center border-t border-heritage-charcoal/10 pt-8">
                        <span className="text-heritage-charcoal/40 text-sm">Share this story</span>
                        <div className="flex gap-4">
                            <button className="p-2 rounded-full bg-heritage-sand/20 text-heritage-charcoal hover:bg-heritage-gold/20 transition-colors">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </article>
    );
}
