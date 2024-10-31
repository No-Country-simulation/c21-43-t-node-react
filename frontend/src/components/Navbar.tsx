"use client"

import { useState } from 'react';
import { ShoppingCart, CircleUserRound, Settings } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from 'next/link';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/Store';

interface NavbarProps {
    className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {

    const [isOpen, setIsOpen] = useState(false);

    const closeSheet = () => setIsOpen(false);
    const token = useStore((state) => state.token)
    const limpiarUsuario = useStore((state) => state.limpiarUsuario);
    const setToken = useStore((state) => state.setToken);

    const handleLogout = () => {
        limpiarUsuario();  // Restablece el usuario
        setToken('');      // Restablece el token
    };

    return (
        <nav className={`flex flex-row justify-end items-center gap-2 ${className}`}>
            <Link href="/cart">
                <ShoppingCart className="w-8 h-8 color-[#260A03] cursor-pointer" />
            </Link>
            <div className='flex items-center justify-center  bg-opacity-50'>
                <Sheet open={isOpen} onOpenChange={setIsOpen}  >
                    <SheetTrigger asChild>
                        <button>
                            <CircleUserRound className='w-8 h-8 ' />
                        </button>
                    </SheetTrigger>
                    <SheetContent className='flex flex-col justify-between h-full'>
                        {
                            token.length === 0 ?

                                <div className='flex flex-row justify-between mt-20'>
                                    <Link href="/login" className='block px-4 py-2 w-40 rounded-md bg-[#FF8E42]  text-[#260A03] font-bold hover:bg-[#F2CB05] transition-colors duration-200' onClick={closeSheet}>
                                        Iniciar sesión
                                    </Link>
                                    <Link href="/signup" className='block px-4 py-2 w-40 rounded-md bg-[#FF8E42]  text-[#260A03]  font-bold hover:bg-[#F2CB05] transition-colors duration-200' onClick={closeSheet}>
                                        Registrarse</Link>
                                </div>
                                :
                                <div className='flex flex-row justify-between mt-20'>
                                    <Link href="/perfil" className=' bg-[#FF8E42] rounded-md  text-[#260A03] font-bold py-2 px-4  hover:bg-[#F2CB05] transition-colors' onClick={closeSheet}>
                                        Ir a mi perfil</Link>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-[#FF8E42]  text-[#260A03] rounded-md font-bold py-2 px-4  hover:bg-[#F2CB05] transition-colors w-fit"
                                    >
                                        Salir
                                    </button>
                                </div>
                        }

                        <div className="flex items-center mt-4 pt-4 border-t border-[#260A03] ">
                            <ContextMenu>
                                <ContextMenuTrigger>
                                    <Button className="bg-[#FF8E42] hover:bg-[#F2CB05] ">
                                        <Settings className='text-[#260A03] font-bold' />
                                    </Button>
                                    <ContextMenuContent>
                                        <ContextMenuItem>Perfil</ContextMenuItem>
                                        <ContextMenuItem>Términos y condiciones</ContextMenuItem>
                                        <ContextMenuItem>Subscripción</ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenuTrigger>

                            </ContextMenu>

                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};

export default Navbar;
