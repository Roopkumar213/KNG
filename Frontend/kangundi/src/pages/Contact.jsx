import React, { useState } from 'react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { api } from '../services/api';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        api.submitInquiry(formData).then((res) => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        });
    };

    return (
        <div className="bg-heritage-cream min-h-screen">
            <Section className="pt-32 pb-12 text-center">
                <h1 className="text-5xl font-serif text-heritage-charcoal mb-4">Get in Touch</h1>
                <p className="text-heritage-bark">Plan your visit, book a guide, or just say hello.</p>
            </Section>

            <Section className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-heritage-sand">
                {status === 'success' ? (
                    <div className="text-center py-12">
                        <h3 className="text-2xl font-serif text-heritage-earth mb-4">Message Sent</h3>
                        <p className="text-heritage-bark mb-8">Thank you for writing to us. We will get back to you shortly.</p>
                        <button onClick={() => setStatus('idle')} className="text-sm font-bold uppercase underline text-heritage-charcoal">Send Another</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-heritage-earth mb-2">Name</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-heritage-cream border border-heritage-sand p-4 rounded focus:outline-none focus:border-heritage-earth transition-colors"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-heritage-earth mb-2">Email</label>
                            <input
                                required
                                type="email"
                                className="w-full bg-heritage-cream border border-heritage-sand p-4 rounded focus:outline-none focus:border-heritage-earth transition-colors"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-heritage-earth mb-2">Message</label>
                            <textarea
                                required
                                rows={5}
                                className="w-full bg-heritage-cream border border-heritage-sand p-4 rounded focus:outline-none focus:border-heritage-earth transition-colors"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>
                        <Button disabled={status === 'submitting'} type="submit" className="w-full justify-center">
                            {status === 'submitting' ? 'Sending...' : 'Send Message'}
                        </Button>
                    </form>
                )}
            </Section>
        </div>
    );
}
