
import React, { useEffect } from 'react';

interface SEOManagerProps {
  page: string;
  data?: any;
}

const SEOManager: React.FC<SEOManagerProps> = ({ page, data }) => {
  useEffect(() => {
    let title = 'YogaX Biofeedback | Ancient Wisdom meets Modern Science';
    let description = 'Experience 5,000 years of Vedic wisdom integrated with clinical biometric sensors and AI guidance.';
    let jsonLd: any = null;

    if (page === 'hardware') {
      title = 'Clinical Biofeedback Hardware | YogaX Store';
      description = 'Explore PranaFlow and Prana Shirt - clinical-grade wearables for respiratory and stress biofeedback mastery.';
    } else if (page === 'platform') {
      title = 'Unified AI Guru Platform | YogaX Biofeedback';
      description = 'Connect with 10 specialized AI Gurus for Pranayama, Asana, and Meditation, powered by real-time biometric data.';
    } else if (page === 'product-pranaflow') {
      title = 'PranaFlow Sensor | Nostril Dominance Biofeedback';
      description = 'The world\'s first clinical sensor for Svara Yoga. Track Ida and Pingala flow in real-time. Buy for $299.';
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "PranaFlow Breathing Monitor",
        "description": "Nostril-specific breathing biofeedback device for Svara Yoga mastery.",
        "image": "https://images.unsplash.com/photo-1599056377758-06686e009477?auto=format&fit=crop&q=80&w=1200",
        "brand": "YogaX",
        "sku": "YX-PRANAFLOW-01",
        "offers": {
          "@type": "Offer",
          "price": "299.00",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://yogax.ai/product/pranaflow"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1240"
        }
      };
    } else if (page === 'product-pranashirt') {
      title = 'Prana Shirt | EMG Smart Fabric Stress Sensing';
      description = 'Intelligent apparel that detects stress patterns before they impact your practice. Washable, clinical-grade EMG. $199.';
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Prana Shirt Smart Fabric",
        "description": "Intelligent smart-fabric apparel with integrated ECG/EMG sensors.",
        "image": "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1200",
        "brand": "YogaX",
        "sku": "YX-PRANASHIRT-01",
        "offers": {
          "@type": "Offer",
          "price": "199.00",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://yogax.ai/product/pranashirt"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "842"
        }
      };
    } else if (page === 'science') {
      title = 'The Science of YogaX | Neuro-Respiratory Clinical Studies';
      description = 'Explore peer-reviewed research on nasal cycle dominance, HRV coherence, and neurological synchronization with YogaX devices.';
    }

    // Update Title
    document.title = title;

    // Update Description Meta
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // Update OG Meta
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Inject JSON-LD
    const existingScript = document.getElementById('page-jsonld');
    if (existingScript) existingScript.remove();

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'page-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [page, data]);

  return null;
};

export default SEOManager;
