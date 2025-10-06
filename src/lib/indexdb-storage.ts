import { get, set, del, clear, keys } from 'idb-keyval';
import { StateStorage } from 'zustand/middleware';

export interface EmailRegistration {
  id: string;
  name: string;
  email: string;
  timestamp: number;
  consent: boolean;
}

export interface UIState {
  animationsEnabled: boolean;
  hasRegistered: boolean;
  theme: 'light' | 'dark';
}

export interface AppState {
  registrations: EmailRegistration[];
  ui: UIState;
  addRegistration: (registration: Omit<EmailRegistration, 'id' | 'timestamp'>) => void;
  removeRegistration: (id: string) => void;
  clearRegistrations: () => void;
  exportRegistrations: () => string;
  setAnimationsEnabled: (enabled: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setHasRegistered: (registered: boolean) => void;
}

// Custom IndexedDB storage implementation
export const createIndexedDBStorage = (prefix: string = 'app'): StateStorage => ({
  getItem: async (name: string): Promise<string | null> => {
    // Check if we're on the client side
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      return null;
    }
    
    try {
      const fullKey = `${prefix}_${name}`;
      const value = await get(fullKey);
      return value ? JSON.stringify(value) : null;
    } catch (error) {
      console.error('Error getting item from IndexedDB:', error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    // Check if we're on the client side
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      return;
    }
    
    try {
      const fullKey = `${prefix}_${name}`;
      await set(fullKey, JSON.parse(value));
    } catch (error) {
      console.error('Error setting item in IndexedDB:', error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    // Check if we're on the client side
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      return;
    }
    
    try {
      const fullKey = `${prefix}_${name}`;
      await del(fullKey);
    } catch (error) {
      console.error('Error removing item from IndexedDB:', error);
    }
  },
});

// Helper functions for direct IndexedDB operations
export const indexedDBHelpers = {
  // Save registration directly
  saveRegistration: async (registration: Omit<EmailRegistration, 'id' | 'timestamp'>): Promise<EmailRegistration> => {
    // Check if we're on the client side
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      throw new Error('IndexedDB is not available');
    }
    
    const newRegistration: EmailRegistration = {
      ...registration,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    
    try {
      const existing = await get<EmailRegistration[]>('registrations') || [];
      const updated = [...existing, newRegistration];
      await set('registrations', updated);
      return newRegistration;
    } catch (error) {
      console.error('Error saving registration:', error);
      throw error;
    }
  },

  // Get all registrations
  getRegistrations: async (): Promise<EmailRegistration[]> => {
    // Check if we're on the client side
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      return [];
    }
    
    try {
      return await get<EmailRegistration[]>('registrations') || [];
    } catch (error) {
      console.error('Error getting registrations:', error);
      return [];
    }
  },

  // Remove registration
  removeRegistration: async (id: string): Promise<void> => {
    // Check if we're on the client side
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      return;
    }
    
    try {
      const existing = await get<EmailRegistration[]>('registrations') || [];
      const updated = existing.filter(reg => reg.id !== id);
      await set('registrations', updated);
    } catch (error) {
      console.error('Error removing registration:', error);
      throw error;
    }
  },

  // Clear all registrations
  clearRegistrations: async (): Promise<void> => {
    // Check if we're on the client side
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      return;
    }
    
    try {
      await del('registrations');
    } catch (error) {
      console.error('Error clearing registrations:', error);
      throw error;
    }
  },

  // Export registrations as CSV
  exportToCSV: async (): Promise<string> => {
    // Check if we're on the client side
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      return '';
    }
    
    try {
      const registrations = await get<EmailRegistration[]>('registrations') || [];
      
      if (registrations.length === 0) {
        return '';
      }

      const headers = ['ID', 'Name', 'Email', 'Timestamp', 'Consent'];
      const rows = registrations.map(reg => [
        reg.id,
        `"${reg.name}"`,
        reg.email,
        new Date(reg.timestamp).toISOString(),
        reg.consent ? 'Yes' : 'No'
      ]);

      return [headers, ...rows].map(row => row.join(',')).join('\n');
    } catch (error) {
      console.error('Error exporting registrations:', error);
      throw error;
    }
  },

  // Check if email already exists
  emailExists: async (email: string): Promise<boolean> => {
    // Check if we're on the client side
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      return false;
    }
    
    try {
      const registrations = await get<EmailRegistration[]>('registrations') || [];
      return registrations.some(reg => reg.email.toLowerCase() === email.toLowerCase());
    } catch (error) {
      console.error('Error checking email existence:', error);
      return false;
    }
  },

  // Get UI state
  getUIState: async (): Promise<UIState> => {
    // Check if we're on the client side
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      return {
        animationsEnabled: true,
        hasRegistered: false,
        theme: 'light'
      };
    }
    
    try {
      return await get<UIState>('ui_state') || {
        animationsEnabled: true,
        hasRegistered: false,
        theme: 'light'
      };
    } catch (error) {
      console.error('Error getting UI state:', error);
      return {
        animationsEnabled: true,
        hasRegistered: false,
        theme: 'light'
      };
    }
  },

  // Save UI state
  saveUIState: async (uiState: UIState): Promise<void> => {
    // Check if we're on the client side
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      return;
    }
    
    try {
      await set('ui_state', uiState);
    } catch (error) {
      console.error('Error saving UI state:', error);
      throw error;
    }
  }
};