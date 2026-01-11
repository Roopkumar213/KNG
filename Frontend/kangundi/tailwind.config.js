/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            colors: {
                // NATURE PALETTE (New Visual Core)
                nature: {
                    forest: '#0F2C23', // Deep, authoritative green (Primary Text/Bg)
                    moss: '#3E6D4E',   // Vibrant living green (Accents)
                    clay: '#C27856',   // Terracotta/Sunrise (Warmth)
                    earth: '#8F7E66',  // Stone/Soil (Subtle Text)
                    sand: '#ECEEE8',   // PALE MOSS/GREEN TINT (Distinct from white)
                    sky: '#DDE7F0',    // Muted morning blue
                    sunrise: '#FBE6D3' // Pale orange glow
                },

                // Heritage Theme (Mapped to Nature)
                heritage: {
                    cream: '#F5F2EB',    // Mapped to Nature Sand
                    sand: '#E3DDD3',     // Slightly darker sand
                    clay: '#C27856',     // Mapped to Nature Clay
                    earth: '#8F7E66',    // Mapped to Nature Earth
                    bark: '#2F3E35',     // Deep Greenish Gray
                    charcoal: '#0F2C23', // Mapped to Nature Forest
                    gold: '#C27856'      // Replacing Gold with Clay for warmth
                },

                // Bouldering Theme (Rugged, Technical - Kept distinct but compatible)
                stone: {
                    100: '#F5F5F5',
                    200: '#E5E5E5',
                    300: '#D4D4D4',
                    400: '#A3A3A3',
                    500: '#737373',
                    800: '#262626',
                    900: '#171717',
                },
                moss: {
                    light: '#84A98C',
                    DEFAULT: '#3E6D4E',
                    dark: '#354F52',
                    deep: '#2F3E46',
                },
                rust: {
                    light: '#E76F51',
                    DEFAULT: '#C27856', // Syncing Rust with Clay for consistency
                    dark: '#A0553C'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
                display: ['"Playfair Display"', 'serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards',
                'fade-in': 'fadeIn 1s cubic-bezier(0.19, 1, 0.22, 1) forwards',
                'slide-up': 'slideUp 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards',
                'reveal-up': 'revealUp 1s cubic-bezier(0.19, 1, 0.22, 1) forwards',
                'scale-in': 'scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px) scale(0.98)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                revealUp: {
                    '0%': { opacity: '0', transform: 'translateY(60px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                }
            },
            perspective: {
                '1000': '1000px',
                '1500': '1500px',
                '2000': '2000px',
            },
            backdropBlur: {
                xs: '2px',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'nature-overlay': 'linear-gradient(to bottom, transparent, rgba(15, 44, 35, 0.05))',
            }
        },
    },
    plugins: [],
}
