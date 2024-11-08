import React from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { clsx } from 'clsx';

const Header: React.FC = () => {
    return (
        <header className="bg-[#ff8e42] px-4 h-20 flex items-center">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-[#260A03] text-2xl font-bold flex-1">
                    <Link href="/">
                        <Image src="/Logo_Horizontal_Negro@3x.png" alt='Logo' width="120" height="90" />
                    </Link>
                </div>
                <div className="relative w-96 md:block hidden flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#260A03]" />
                    <Input className="w-full bg-[ffff] pl-10 pr-4 py-2" placeholder="Buscar..." />
                </div>
                <Navbar className="flex-1" />
            </div>
        </header>
    );
};

export default Header;