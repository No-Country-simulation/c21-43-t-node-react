import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'

interface Usuario {
    user: {
        id: string;
        name: string;
        lastName: string;
        email: string;
        registrationType: string | null;

    }
}

interface Store {
    token: string;
    usuario: Usuario | null;
    setToken: (value: string) => void;
    setUsuario: (datosUsuario: Usuario) => void;
    limpiarUsuario: () => void;
    getUserId: () => string | null;
}

interface DecodedToken {
    id: string;
}

export const useStore = create<Store>()(
    persist(
        (set, get) => ({
            token: '',

            usuario: null,
            setToken: (value) => set({ token: value }),
            setUsuario: (datosUsuario) => set({ usuario: datosUsuario }),
            limpiarUsuario: () => set({ usuario: null }),
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
