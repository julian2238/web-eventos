import { create } from 'zustand'

const useAuthStore = create((set) => ({
    userData: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,

    login: (user, token, refreshToken) => set({ user, token, refreshToken, isAuthenticated: true }),
    logout: () => set({ user: null, token: null, refreshToken: null, isAuthenticated: false }),
    setTokens: (token, refreshToken) => set({ token, refreshToken }),
}))

export default useAuthStore
