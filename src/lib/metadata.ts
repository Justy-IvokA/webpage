import type { Metadata, ResolvingMetadata } from 'next';

interface PageMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

const defaultMetadata = {
  title: 'Moderno - Experiencias Digitales Innovadoras',
  description: 'Creamos soluciones digitales excepcionales con tecnología de vanguardia y diseño innovador. Transformamos ideas en realidades digitales extraordinarias.',
  keywords: ['diseño digital', 'desarrollo web', 'UX/UI', 'tecnología', 'innovación', 'Next.js', 'TypeScript'],
  image: '/og-image.jpg',
  url: 'https://ejemplo.com',
  type: 'website' as const,
};

export function createPageMetadata(props: PageMetadataProps = {}): Metadata {
  const {
    title = defaultMetadata.title,
    description = defaultMetadata.description,
    keywords = defaultMetadata.keywords,
    image = defaultMetadata.image,
    url = defaultMetadata.url,
    type = defaultMetadata.type,
    noIndex = false,
  } = props;

  const fullUrl = url.startsWith('http') ? url : `https://ejemplo.com${url}`;
  const imageUrl = image.startsWith('http') ? image : `https://ejemplo.com${image}`;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Equipo Moderno' }],
    creator: 'Moderno',
    publisher: 'Moderno',
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Moderno',
      type,
      locale: 'es_ES',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@moderno',
      site: '@moderno',
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'es-ES': fullUrl,
      },
    },
    other: {
      'twitter:image': imageUrl,
      'twitter:image:alt': title,
      'theme-color': '#0062FF',
    },
  };

  return metadata;
}

// Specific page metadata configurations
export const pageMetadata = {
  home: createPageMetadata({
    title: 'Moderno - Experiencias Digitales Innovadoras',
    description: 'Creamos soluciones digitales excepcionales con tecnología de vanguardia y diseño innovador. Transformamos ideas en realidades digitales extraordinarias.',
    keywords: ['diseño digital', 'desarrollo web', 'UX/UI', 'tecnología', 'innovación', 'Next.js', 'TypeScript', 'transformación digital'],
  }),
  
  manifesto: createPageMetadata({
    title: 'Manifiesto - Nuestra Filosofía | Moderno',
    description: 'Conoce nuestros principios, valores y visión. Descubre la filosofía que guía cada proyecto y decisión en nuestro camino hacia la innovación digital.',
    keywords: ['manifiesto', 'filosofía', 'valores', 'visión', 'misión', 'principios', 'innovación digital'],
    url: '/manifiesto',
  }),
  
  gallery: createPageMetadata({
    title: 'Galería - Proyectos Destacados | Moderno',
    description: 'Explora nuestra colección de proyectos destacados y diseños innovadores. Descubre cómo transformamos ideas en experiencias digitales excepcionales.',
    keywords: ['galería', 'portafolio', 'proyectos', 'diseño', 'desarrollo web', 'casos de éxito'],
    url: '/galeria',
  }),
  
  registration: createPageMetadata({
    title: 'Registro - Únete a Nuestra Comunidad | Moderno',
    description: 'Regístrate para recibir las últimas actualizaciones y contenido exclusivo. Únete a miles de clientes satisfechos en nuestra comunidad digital.',
    keywords: ['registro', 'suscripción', 'newsletter', 'comunidad', 'actualizaciones', 'contenido exclusivo'],
    url: '/registro',
  }),
  
  analytics: createPageMetadata({
    title: 'Analytics - Métricas y Rendimiento | Moderno',
    description: 'Visualiza el rendimiento y el crecimiento de tu negocio en tiempo real. Analiza métricas clave y toma decisiones informadas con nuestras herramientas de analytics.',
    keywords: ['analytics', 'métricas', 'rendimiento', 'datos', 'estadísticas', 'business intelligence', 'dashboard'],
    url: '/analytics',
  }),
};

// Structured data utilities
export function createOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Moderno',
    description: 'Creamos soluciones digitales excepcionales con tecnología de vanguardia y diseño innovador.',
    url: 'https://ejemplo.com',
    logo: 'https://ejemplo.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-234-567-890',
      contactType: 'customer service',
      email: 'contacto@empresa.com',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Calle Principal',
      addressLocality: 'Ciudad',
      addressRegion: 'Estado',
      postalCode: '12345',
      addressCountry: 'ES',
    },
    sameAs: [
      'https://facebook.com/moderno',
      'https://twitter.com/moderno',
      'https://linkedin.com/company/moderno',
      'https://instagram.com/moderno',
    ],
  };
}

export function createWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Moderno',
    description: 'Creamos soluciones digitales excepcionales con tecnología de vanguardia y diseño innovador.',
    url: 'https://ejemplo.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ejemplo.com/buscar?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function createBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  const itemListElements = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemListElements,
  };
}

// Performance optimization utilities
export const performanceOptimizations = {
  // Preload critical resources
  preloadResources: (resources: string[]) => {
    if (typeof document === 'undefined') return;
    
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.css') ? 'style' : 'script';
      document.head.appendChild(link);
    });
  },

  // Preconnect to external domains
  preconnectDomains: (domains: string[]) => {
    if (typeof document === 'undefined') return;
    
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });
  },

  // DNS prefetch for external domains
  dnsPrefetchDomains: (domains: string[]) => {
    if (typeof document === 'undefined') return;
    
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  },
};