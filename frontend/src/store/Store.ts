import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'

interface Store {
    token: string;
    setToken: (value: string) => void;
    getUserId: () => string | null;
}

interface DecodedToken {
    id: string;
}

export const useStore = create<Store>()(
    persist(
        (set, get) => ({
            token: '',
            setToken: (value) => set({ token: value }),
            getUserId: () => {
                const token = get().token;
                if (!token) return null;
                try {
                    const decoded: DecodedToken = jwtDecode(token);
                    return decoded.id;
                } catch (error) {
                    console.error("Error decoding token", error);
                    return null;
                }
            },
        }),
        { name: 'Store' }
    )
)
