'use client'
import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useStore } from '../../store/Store'

export const Signup = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const setUsuario = useStore((state) => state.setUsuario);
    const setToken = useStore((state) => state.setToken)

    const router = useRouter();

    async function createCart(userId: string) {

        try {

            console.log(userId);

            const response = await axios.post('http://localhost:3000/cart/create', { userId });

            if (response.data.success) {
                console.log('first');
                console.log(response.data.message);
            } else {
                console.error(response.data.message);
            }

        } catch (error) {
            console.error("Error al crear el carrito:", error);
        }

    }


    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verificar si las contraseñas coinciden
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const userData = {
            email,
            name,
            lastName,
            phoneNumber,
            password,
            registrationType: 'Client',
        };

        try {


            const response = await axios.post('https://c21-43-t-node-react-production-227f.up.railway.app/auth/register', userData);
            // const response = await axios.post('http://localhost:3000/auth/register', userData);

            if (response.status === 200) {

                setUsuario(response.data.data)
                setToken(response.data.data.token)


                await createCart(response.data.data.user.id);

                router.push('/product');

            }

        } catch (error) {
            console.error(error);
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
                <h2 className="text-2xl font-bold text-center mb-6">Registrate!</h2>
                {/* email, name, lastName, phoneNumber, password, registrationType */}
                <form onSubmit={handleSignup} className="grid grid-cols-2 gap-4">

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Apellido
                        </label>
                        <input
                            type="lastName"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Telefono
                        </label>
                        <input
                            type="phoneNumber"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
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
                        className="col-span-2 w-full bg-[#f27405] text-white p-2 rounded-md hover:bg-orange-700 transition"
                    >
                        Registrarme
                    </button>
                </form>
            </div>
        </div>
    );
};


