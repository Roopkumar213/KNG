import React from 'react';
import { cn } from '../../utils/cn';

export default function Section({
    children,
    className,
    id,
    dark = false,
    fullWidth = false,
    noPadding = false,
    separator = false
}) {
    return (
        <section
            id={id}
            className={cn(
                "relative",
                dark ? "bg-heritage-charcoal text-heritage-cream" : "bg-heritage-cream text-heritage-charcoal",
                !noPadding && "py-24 md:py-32 lg:py-40",
                separator && "section-separator",
                className
            )}
        >
            {separator && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-heritage-earth/20 to-transparent" />
            )}
            <div className="relative z-10">
                <div className={cn(
                    "mx-auto px-6 md:px-12",
                    !fullWidth && "container max-w-7xl"
                )}>
                    {children}
                </div>
            </div>
        </section>
    );
}
