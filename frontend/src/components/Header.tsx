import React from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from "@/components/ui/input";

const Header: React.FC = () => {
    return (
        <header className="bg-[#F27405] px-4 h-16 flex items-center">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link href="/"><Image src="/Logo_Horizontal_Blanco@3x.png" alt='Logo' width="120" height="90"/>
                    </Link>
                </div>
                <Input className='w-80 bg-white '/>
                <Navbar />
            </div>

        </header>
    );
};

export default Header;