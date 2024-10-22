'use client'
import { useState } from "react";

export const Signup = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        // Aquí puedes manejar el proceso de signup (peticiones a la API, validaciones, etc.)
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
                <h2 className="text-2xl font-bold text-center mb-6">Registrate!</h2>
                <form onSubmit={handleSignup}>
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

                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                            Confirma Contraseña
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#f27405] text-white p-2 rounded-md hover:bg-orange-700 transition"
                    >
                        Registrarme
                    </button>
                </form>
            </div>
        </div>
    );
};


