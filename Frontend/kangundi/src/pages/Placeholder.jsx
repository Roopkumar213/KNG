import React from 'react';

export default function PlaceholderPage({ title }) {
    return (
        <div className="min-h-screen grid place-items-center">
            <h1 className="text-4xl font-serif">{title}</h1>
        </div>
    );
}
