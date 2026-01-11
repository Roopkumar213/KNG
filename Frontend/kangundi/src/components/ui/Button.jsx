import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { ArrowRight } from 'lucide-react';

export default function Button({
    children,
    to,
    variant = 'primary',
    className,
    icon = true,
    ...props
}) {
    const buttonRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            button.style.setProperty('--mouse-x', `${x}px`);
            button.style.setProperty('--mouse-y', `${y}px`);
        };

        button.addEventListener('mousemove', handleMouseMove);
        return () => button.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const baseStyles = "relative inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 ease-out group overflow-hidden";

    const variants = {
        primary: "bg-nature-forest text-nature-sand hover:bg-nature-moss hover:shadow-2xl hover:shadow-nature-forest/30 hover:-translate-y-0.5 active:translate-y-0",
        outline: "border-2 border-nature-forest text-nature-forest hover:bg-nature-forest hover:text-nature-sand hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
        ghost: "text-nature-forest hover:opacity-70 padding-0 bg-transparent hover:underline",
        white: "bg-white text-nature-forest hover:bg-stone-50 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",

        // Bouldering specific
        rust: "bg-rust-DEFAULT text-white hover:bg-rust-dark hover:shadow-2xl hover:shadow-rust-DEFAULT/40 hover:-translate-y-0.5 active:translate-y-0",
        stone: "bg-stone-800 text-stone-100 hover:bg-stone-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
    };

    const Component = to ? Link : 'button';

    return (
        <Component
            ref={buttonRef}
            to={to}
            className={cn(baseStyles, variants[variant], className)}
            style={{
                '--mouse-x': '50%',
                '--mouse-y': '50%',
            }}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-3">
                {children}
                {icon && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
            </span>
            {variant !== 'ghost' && (
                <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)`
                    }}
                />
            )}
        </Component>
    );
}
