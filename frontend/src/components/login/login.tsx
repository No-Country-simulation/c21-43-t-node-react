'use client'
import { useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // aca action para mandar
        console.log("Email:", email, "Password:", password);
    };

    return (
        <div className="relative flex items-center justify-center h-screen">
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


