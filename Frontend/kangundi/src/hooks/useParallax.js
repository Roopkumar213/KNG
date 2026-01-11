import { useEffect, useRef } from 'react';

export default function useParallax(speed = 0.5) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const elementTop = rect.top + scrolled;

            const windowHeight = window.innerHeight;

            if (rect.bottom < 0 || rect.top > windowHeight) return;

            const yPos = -(scrolled - elementTop + windowHeight / 2) * speed;
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        };

        const throttledScroll = () => {
            requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', throttledScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', throttledScroll);
    }, [speed]);

    return ref;
}