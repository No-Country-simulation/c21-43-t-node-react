import { ShoppingCart, CircleUserRound } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
                        <button>
                            <CircleUserRound className='w-8 h-8 text-white' />
                        </button>
                    </SheetTrigger>
                    <SheetContent className='flex flex-col justify-between h-full'>
                        <div>
                            <Link href="/login" className='block px-4 py-2 w-40 text-[#260A03] hover:bg-gray-200 transition-colors duration-200'>
                                Iniciar sesión
                            </Link>
                            <Link href="/signup" className='block px-4 py-2 w-40 text-[#260A03] hover:bg-gray-200 transition-colors duration-200'>
                                Registrarse</Link>
                        </div>

                        <div className="flex items-center mt-4 pt-4 border-t border-[#260A03]">
                            <ContextMenu>
                                <ContextMenuTrigger>
                                    <Button className="bg-transparent hover:bg-gray-200">
                                        <Settings className='text-[#260A03]' />
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
