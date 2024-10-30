import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Store {
    token: string;
    setToken: (value: string) => void
}

export const useStore = create<Store>()(
    persist(// esto sirve para que el dato se guarde en el Local Storage y no se pierda
        (set) => ({
            token: '',
            setToken: (value) => set({ token: value })
        }),
        { name: 'Store' }
    )
)
