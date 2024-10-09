import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-700 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link href="/" className="text-gray-300 hover:text-white">
                        Inicio
                    </Link>
                    <Link href="/products" className="text-gray-300 hover:text-white">
                        Productos
                    </Link>
                    <Link href="/about" className="text-gray-300 hover:text-white">
                        Info útil
                    </Link>
                    <Link href="/contact" className="text-gray-300 hover:text-white">
                        Contacto
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
