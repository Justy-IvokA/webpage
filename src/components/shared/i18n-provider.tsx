'use client';

import { useEffect } from 'react';
import '@/lib/i18n';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize i18n on client side
    // The i18n instance is already configured in the lib/i18n.ts file
  }, []);

  return <>{children}</>;
}