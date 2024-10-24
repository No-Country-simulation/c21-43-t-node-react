"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, ShoppingCart} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Asegúrate de tener el path correcto para shadcn components
import SignIn from './SingIn';

const Navbar: React.FC = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Icono del menú en dispositivos móviles */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button>
                                <Menu className="text-gray-300 hover:text-white" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="p-4">
                            <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Inicio
                            </Link>
                            <button onClick={toggleDropdown} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Productos 
                            </button>
                            {isDropdownOpen && (
                                <div className="ml-4">
                                    <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                        Jabones Naturales
                                    </Link>
                                    <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                        Velas
                                    </Link>
                                    <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                        Aromaterapia
                                    </Link>
                                </div>
                            )}
                            <Link href="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Info útil
                            </Link>
                            <Link href="/contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Contacto
                            </Link>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Navbar para pantallas grandes */}
                <div className="hidden md:flex space-x-4">
                    <Link href="/" className="text-gray-300 hover:text-white">
                        Inicio
                    </Link>
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="text-gray-300 hover:text-white"
                        >
                            Productos ↴
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute mt-2 bg-white rounded shadow-lg z-10">
                                <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    Jabones Naturales
                                </Link>
                                <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    Velas
                                </Link>
                                <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    Aromaterapia
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link href="/about" className="text-gray-300 hover:text-white">
                        Info útil
                    </Link>
                    <Link href="/contact" className="text-gray-300 hover:text-white">
                        Contacto
                    </Link>
                </div>

                <div className="hidden md:flex items-center">
                    <SignIn />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
