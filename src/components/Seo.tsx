// src/components/Seo.tsx
import React from "react";
import { Helmet } from "react-helmet";

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
}

const Seo: React.FC<SeoProps> = ({ title, description, canonical }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {canonical && <link rel="canonical" href={canonical} />}

    {/* Open Graph */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {canonical && <meta property="og:url" content={canonical} />}
    <meta property="og:type" content="website" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </Helmet>
);

export default Seo;
