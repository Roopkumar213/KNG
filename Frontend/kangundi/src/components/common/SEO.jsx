import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function SEO({
    title,
    description,
    image = '/images/gallery/hillview.png',
    type = 'website',
    schema
}) {
    const location = useLocation();
    const siteUrl = process.env.REACT_APP_PUBLIC_SITE_URL || 'https://kangundhiboulder.com'; // Production URL placeholder
    const currentUrl = `${siteUrl}${location.pathname}`;
    const fullTitle = `${title} | Kangundhi Tourism`;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content="Kangundhi Tourism" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
}
