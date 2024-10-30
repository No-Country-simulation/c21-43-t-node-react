import React from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { clsx } from 'clsx';

const Header: React.FC = () => {
    return (
        <header className="bg-[#f27405d8] px-4 h-20 flex items-center">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold flex-1">
                    <Link href="/">
                        <Image src="/Logo_Horizontal_Blanco@3x.png" alt='Logo' width="120" height="90"/>
                    </Link>
                </div>
                <Input className='w-96 bg-white hidden md:block flex-1'/>
                <Navbar className="flex-1" />
            </div>
        </header>
    );
};

export default Header;