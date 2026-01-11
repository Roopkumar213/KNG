import React from 'react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

export default function Events() {
    return (
        <div className="bg-heritage-cream min-h-screen">
            <Section className="text-center pt-32">
                <h1 className="text-6xl font-serif text-heritage-charcoal mb-6">Upcoming Events</h1>
            </Section>

            <Section className="space-y-12">
                <div className="bg-heritage-charcoal text-heritage-cream rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-2/3">
                        <span className="text-heritage-clay font-mono mb-2 block">JAN 24-26, 2026</span>
                        <h2 className="text-4xl font-serif mb-4">International Bouldering Fest</h2>
                        <p className="text-lg opacity-80 mb-8">
                            Join 200+ climbers from around the globe for three days of crushing granite, workshops by pros, and evening festivities.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="white">Register Now</Button>
                            <Button variant="outline" className="text-heritage-cream border-heritage-cream hover:bg-heritage-cream hover:text-heritage-charcoal">Download Brochure</Button>
                        </div>
                    </div>
                    <div className="md:w-1/3 w-full aspect-square rounded-xl overflow-hidden">
                        <img
                            src="/images/gallery/gallery-6.png"
                            alt="International Bouldering Fest"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>

                <div className="bg-white border border-heritage-sand rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-2/3">
                        <span className="text-heritage-earth font-mono mb-2 block">MAR 08, 2026</span>
                        <h2 className="text-4xl font-serif mb-4 text-heritage-charcoal">Maha Shivratri</h2>
                        <p className="text-lg text-heritage-bark mb-8">
                            Witness the ancient temple come alive with thousands of oil lamps, chanting, and a moonlight vigil. A photographer's dream.
                        </p>
                        <Button variant="primary">View Details</Button>
                    </div>
                    <div className="md:w-1/3 w-full aspect-square rounded-xl overflow-hidden">
                        <img
                            src="/images/gallery/gallery-5.png"
                            alt="Maha Shivratri Festival"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>
            </Section>
        </div>
    );
}
