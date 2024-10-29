import { ShoppingCart, Settings } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface NavbarProps {
    className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {

    return (
        <nav className={`flex flex-row justify-end items-center gap-2 ${className}`}>
            <ShoppingCart className='w-8 h-8 text-white' />
            <div className='flex items-center justify-center'>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className='bg-transparent hover:bg-[#260A03] hover:text-white'>Iniciar sesión</Button>
                    </SheetTrigger>
                    <SheetContent className='flex flex-col justify-between h-full'>
                        <div>
                        <Link href="/login" className='block px-4 py-2 hover:text-[#260A03]'>
                            Iniciar sesión
                        </Link>
                        <Link href="/signup" className='block px-4 py-2 hover:text-[#260A03]'>
                            Registrarse</Link>
                        </div>

                        <div className="flex items-center mt-4 pt-4 border-t border-gray-300">
                            <Link href="">
                            <Settings className="ml-2 text-gray-500" />
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};

export default Navbar;
