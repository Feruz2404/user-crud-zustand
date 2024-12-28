import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      users: [],

      addUser: (user) => {
        if (!user || typeof user !== 'object') {
          console.error('Invalid user data');
          return;
        }
        set((state) => ({ users: [...state.users, user] }));
      },

      removeUser: (index) => {
        const { users } = get();
        if (index < 0 || index >= users.length) {
          console.error('Index out of bounds');
          return;
        }
        set((state) => ({
          users: state.users.filter((_, i) => i !== index),
        }));
      },

      updateUser: (index, updatedUser) => {
        const { users } = get();
        if (index < 0 || index >= users.length) {
          console.error('Index out of bounds');
          return;
        }
        if (!updatedUser || typeof updatedUser !== 'object') {
          console.error('Invalid updated user data');
          return;
        }
        set((state) => ({
          users: state.users.map((user, i) =>
            i === index ? { ...user, ...updatedUser } : user
          ),
        }));
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
);
