import React from 'react';
import { MapPin } from 'lucide-react';

export default function BoulderMap() {
    return (
        <div className="relative w-full h-[600px] bg-stone-800 rounded-lg overflow-hidden border border-stone-700 shadow-2xl">
            {/* Mock Map Background */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="absolute inset-0 flex items-center justify-center text-stone-500 font-mono text-sm">
                [ Interactive Leaflet.js Map Loading ... ]
            </div>

            {/* Mock Pinpoints */}
            <div className="absolute top-1/3 left-1/4 group cursor-pointer">
                <MapPin className="text-rust-DEFAULT hover:text-rust-light transition-colors" size={32} />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-stone-900 text-stone-100 text-xs p-2 rounded border border-stone-700 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                    <strong>Tiger Hill</strong><br />V3 - V8
                </div>
            </div>

            <div className="absolute top-1/2 left-2/3 group cursor-pointer">
                <MapPin className="text-rust-DEFAULT hover:text-rust-light transition-colors" size={32} />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-stone-900 text-stone-100 text-xs p-2 rounded border border-stone-700 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                    <strong>Elephant Rock</strong><br />V0 - V4
                </div>
            </div>
        </div>
    );
}
