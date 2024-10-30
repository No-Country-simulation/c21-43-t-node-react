'use client'
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/Store";


export const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const setUsuario = useStore((state) => state.setUsuario);
    const setToken = useStore((state) => state.setToken)

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        }
        try {
            const response = await axios.post('https://c21-43-t-node-react-production-227f.up.railway.app/auth/login', userData);


            console.log(response.data.data)
            if (response.status === 200) {
                setToken(response.data.data.token)
                setUsuario(response.data.data)
                router.push('/product');

            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className="relative flex items-center justify-center h-[calc(100vh-5rem)] sm:h-[calc(100vh-5rem)]">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
                style={{
                    backgroundImage: `url('/fondo.jpg')`,
                }}
            ></div>
            <div className="relative bg-white p-8 rounded-md shadow-md w-full max-w-md z-10">
                <h2 className="text-2xl font-bold text-center mb-6">Ingreso</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#f27405] text-white p-2 rounded-md hover:bg-orange-700 transition"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};


