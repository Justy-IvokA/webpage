import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createIndexedDBStorage, indexedDBHelpers, EmailRegistration, UIState, AppState } from '@/lib/indexdb-storage';

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      registrations: [],
      ui: {
        animationsEnabled: true,
        hasRegistered: false,
        theme: 'light'
      },

      addRegistration: async (registrationData) => {
        try {
          // Check if email already exists
          const emailExists = await indexedDBHelpers.emailExists(registrationData.email);
          if (emailExists) {
            throw new Error('Email already registered');
          }

          // Save to IndexedDB
          const newRegistration = await indexedDBHelpers.saveRegistration(registrationData);
          
          // Update store state
          const currentState = get();
          set({
            registrations: [...currentState.registrations, newRegistration],
            ui: { ...currentState.ui, hasRegistered: true }
          });

          // Save UI state
          await indexedDBHelpers.saveUIState({ ...currentState.ui, hasRegistered: true });
        } catch (error) {
          console.error('Error adding registration:', error);
          throw error;
        }
      },

      removeRegistration: async (id: string) => {
        try {
          // Remove from IndexedDB
          await indexedDBHelpers.removeRegistration(id);
          
          // Update store state
          const currentState = get();
          set({
            registrations: currentState.registrations.filter(reg => reg.id !== id)
          });
        } catch (error) {
          console.error('Error removing registration:', error);
          throw error;
        }
      },

      clearRegistrations: async () => {
        try {
          // Clear from IndexedDB
          await indexedDBHelpers.clearRegistrations();
          
          // Update store state
          set({ registrations: [] });
        } catch (error) {
          console.error('Error clearing registrations:', error);
          throw error;
        }
      },

      exportRegistrations: async () => {
        try {
          return await indexedDBHelpers.exportToCSV();
        } catch (error) {
          console.error('Error exporting registrations:', error);
          throw error;
        }
      },

      setAnimationsEnabled: async (enabled: boolean) => {
        try {
          const currentState = get();
          const newUIState = { ...currentState.ui, animationsEnabled: enabled };
          
          set({ ui: newUIState });
          
          // Save to IndexedDB
          await indexedDBHelpers.saveUIState(newUIState);
        } catch (error) {
          console.error('Error setting animations enabled:', error);
          throw error;
        }
      },

      setTheme: async (theme: 'light' | 'dark') => {
        try {
          const currentState = get();
          const newUIState = { ...currentState.ui, theme };
          
          set({ ui: newUIState });
          
          // Save to IndexedDB
          await indexedDBHelpers.saveUIState(newUIState);
          
          // Apply theme to document
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', theme === 'dark');
          }
        } catch (error) {
          console.error('Error setting theme:', error);
          throw error;
        }
      },

      setHasRegistered: async (registered: boolean) => {
        try {
          const currentState = get();
          const newUIState = { ...currentState.ui, hasRegistered: registered };
          
          set({ ui: newUIState });
          
          // Save to IndexedDB
          await indexedDBHelpers.saveUIState(newUIState);
        } catch (error) {
          console.error('Error setting has registered:', error);
          throw error;
        }
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => createIndexedDBStorage()),
      partialize: (state) => ({
        ui: state.ui,
        registrations: state.registrations.slice(-100), // Only persist last 100 registrations
      }),
      onRehydrateStorage: () => (state) => {
        // Initialize theme from persisted state
        if (state?.ui?.theme && typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', state.ui.theme === 'dark');
        }
      },
    }
  )
);

// Hook for checking if user prefers reduced motion
export const useReducedMotion = () => {
  return typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
};

// Hook for system theme preference
export const useSystemTheme = () => {
  return typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    : 'light';
};