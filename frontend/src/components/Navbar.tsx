"use client"

import { useState } from 'react';
import { ShoppingCart, CircleUserRound } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from 'next/link';

interface NavbarProps {
    className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {

    const [isOpen, setIsOpen] = useState(false);

    const closeSheet = () => setIsOpen(false);

    return (
        <nav className={`flex flex-row justify-end items-center gap-2 ${className}`}>
            <ShoppingCart className='w-8 h-8 text-white' />
            <div className='flex items-center justify-center'>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <button>
                            <CircleUserRound className='w-8 h-8 text-white' />
                        </button>
                    </SheetTrigger>
                    <SheetContent>
                        <Link href="/login" className='block px-4 py-2 ' onClick={closeSheet}>
                            Iniciar sesión
                        </Link>
                        <Link href="/signup" className='block px-4 py-2' onClick={closeSheet}>
                            Registrarse</Link>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};

export default Navbar;
