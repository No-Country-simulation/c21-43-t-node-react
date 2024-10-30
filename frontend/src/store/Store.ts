import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Usuario {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
}

interface Store {
    token: string;
    usuario: Usuario | null;
    setToken: (value: string) => void;
    setUsuario: (datosUsuario: Usuario) => void;
    limpiarUsuario: () => void;
}

export const useStore = create<Store>()(
    persist(// esto sirve para que el dato se guarde en el Local Storage y no se pierda
        (set) => ({
            token: '',
            usuario: null,
            setToken: (value) => set({ token: value }),
            setUsuario: (datosUsuario) => set({ usuario: datosUsuario }),
            limpiarUsuario: () => set({ usuario: null })
        }),
        { name: 'Store' }
    )
)
