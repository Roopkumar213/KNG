import React, { useRef } from 'react';
import SEO from '../components/common/SEO';
import { motion, useScroll, useTransform } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.19, 1, 0.22, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export default function Home() {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="overflow-x-hidden">
      <SEO
        title="Home"
        description="Discover Kangundhi, an 11th-century fortress village. Experience heritage tourism, ancient temples, and world-class bouldering in Andhra Pradesh."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Kangundhi Tourism",
          "url": "https://kangundhiboulder.com"
        }}
      />
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000">
        {/* Background with parallax */}
        <motion.div
          style={{ y: parallaxY }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/hero/Kangundi-Inselberg-Shivling-1-1536x691-Picsart-AiImageEnhancer.jpeg"
            alt="Panoramic view of Kangundhi Inselberg and landscape"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: 'scale(1.1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/10"></div>
          <div className="absolute inset-0 bg-gradient-radial from-heritage-charcoal/30 via-transparent to-transparent"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ opacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.span
            variants={fadeInUp}
            className="block text-heritage-sand text-sm md:text-base tracking-[0.3em] uppercase mb-8 font-medium"
          >
            Discover the Undiscovered
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-9xl font-serif text-heritage-cream mb-10 leading-[0.95] tracking-tight"
            style={{ textShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
          >
            Kangundhi
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-3xl text-heritage-sand/90 font-light mb-16 max-w-3xl mx-auto leading-relaxed"
          >
            {t('home.subtitle')}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <Button to="/heritage" variant="white">{t('home.cta_heritage')}</Button>
            <Button to="/bouldering" variant="outline" className="text-heritage-cream border-heritage-cream/80 hover:bg-heritage-cream hover:text-heritage-charcoal">
              {t('home.cta_bouldering')}
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* INTRO SECTION */}
      <Section className="text-center" separator>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-12 text-heritage-bark leading-tight tracking-tight">
            Less, but Better.
          </h2>
          <p className="max-w-4xl mx-auto text-xl md:text-2xl text-heritage-charcoal/80 leading-relaxed font-light">
            Kangundhi isn't about rushing. It's about presence. Experience the calm of
            monolithic rocks formed over millions of years, and the quiet dignity of a
            culture deeply rooted in this landscape.
          </p>
        </motion.div>
      </Section>

      {/* DUAL PATHWAYS */}
      <Section fullWidth noPadding className="grid md:grid-cols-2 min-h-[90vh] relative">
        {/* Culture Path */}
        <motion.div
          className="relative group overflow-hidden bg-heritage-sand flex items-center justify-center p-12 md:p-16"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-heritage-earth/5 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-heritage-earth/0 group-hover:bg-heritage-earth/10 transition-all duration-700"></div>
          <motion.div
            className="relative z-10 text-center max-w-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-5xl md:text-6xl font-serif mb-6 text-heritage-charcoal leading-tight">Heritage</h3>
            <p className="mb-12 text-heritage-charcoal/80 text-lg md:text-xl leading-relaxed">Temples, forts, and stories of the Zameendars.</p>
            <Button to="/heritage" variant="outline">Discover Culture</Button>
          </motion.div>
        </motion.div>

        {/* Adventure Path */}
        <motion.div
          className="relative group overflow-hidden bg-stone-900 flex items-center justify-center p-12 md:p-16 text-stone-100"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-rust/5 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-700"></div>
          <motion.div
            className="relative z-10 text-center max-w-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-5xl md:text-6xl font-serif mb-6 text-stone-100 leading-tight">Bouldering</h3>
            <p className="mb-12 text-stone-300 text-lg md:text-xl leading-relaxed">Technical problems on pristine granite tors.</p>
            <Button to="/bouldering" variant="rust">Start Climbing</Button>
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
}
