import React from 'react';
import Navbar from './Navbar';

const Header: React.FC = () => {
    return (
        <header className="bg-[#dd6b19] p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    Tierra y alma
                </div>
                <Navbar />
            </div>
            
        </header>
    );
};

export default Header;
