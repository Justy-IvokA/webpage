import React from 'react';
const iconProps = {
    className: "w-8 h-8",
    strokeWidth: 1.5,
};

export const CpuChipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps}>
        {/* Pines superiores */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v2M12 4.5v2M15 4.5v2" />
        {/* Pines inferiores */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.5v2M12 17.5v2M15 17.5v2" />
        {/* Pines izquierdos */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9h2M4.5 12h2M4.5 15h2" />
        {/* Pines derechos */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 9h2M17.5 12h2M17.5 15h2" />
        {/* Cuerpo del chip */}
        <rect x="6.5" y="6.5" width="11" height="11" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Núcleo interno */}
        <rect x="9.5" y="9.5" width="5" height="5" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

export const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);