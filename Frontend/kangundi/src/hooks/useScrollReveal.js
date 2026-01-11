import { useEffect, useRef, useState } from 'react';

export default function useScrollReveal(options = {}) {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        direction = 'up',
        distance = 60,
        delay = 0,
    } = options;

    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold, rootMargin }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, rootMargin]);

    const getTransform = () => {
        if (!isVisible) {
            switch (direction) {
                case 'up':
                    return `translateY(${distance}px)`;
                case 'down':
                    return `translateY(-${distance}px)`;
                case 'left':
                    return `translateX(${distance}px)`;
                case 'right':
                    return `translateX(-${distance}px)`;
                default:
                    return `translateY(${distance}px)`;
            }
        }
        return 'translateY(0) translateX(0)';
    };

    return {
        ref,
        isVisible,
        style: {
            opacity: isVisible ? 1 : 0,
            transform: getTransform(),
            transition: `opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${delay}s, transform 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${delay}s`,
        },
    };
}