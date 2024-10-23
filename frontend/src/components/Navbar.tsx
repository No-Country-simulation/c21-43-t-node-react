import { ShoppingCart, CircleUserRound } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from 'next/link';

const Navbar: React.FC = () => {

    return (
        <nav className="flex flex-row justify-center items-center gap-2">
            <ShoppingCart className='w-8 h-8 text-white'/>
                <div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <button>
                            <CircleUserRound className='w-8 h-8 text-white'/>
                            </button>
                        </SheetTrigger>
                        <SheetContent>
                            <Link href="/login" className='block px-4 py-2 '>
                            Iniciar sesión
                            </Link>
                            <Link href="/signup" className='block px-4 py-2'>
                            Registrarse</Link>
                        </SheetContent>
                    </Sheet>
                </div>
                    
        </nav>
    );
};

export default Navbar;
