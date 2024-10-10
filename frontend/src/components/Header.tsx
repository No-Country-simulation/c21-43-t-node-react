import React from 'react';
import Navbar from './Navbar';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 px-4 h-16 flex items-center">
            <div className="container mx-auto flex justify-between items-center">
                Logo
                <div className="text-white text-2xl font-bold">
                    Nombre Marca
                </div>
                <Navbar />
            </div>
        </header>
    );
};

export default Header;
