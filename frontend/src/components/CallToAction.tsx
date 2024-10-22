import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CallToAction = () => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
            <h1 className="text-white text-4xl lg:text-6xl xl:text-5xl font-bold text-balance">
                Compra Productos Artesanales Hechos a Mano
            </h1>
            <p className="text-white mt-6 sm:mt-4 mb-2 max-w-[700px] text-base sm:text-xl lg:text-2xl">
                Cada artículo está cuidadosamente hecho a mano, utilizando materiales sostenibles y técnicas tradicionales.
            </p>
            <div className="mt-4 sm:mt-8 sm:flex sm:flex-row space-y-3 sm:space-y-0 sm:space-x-5">
                <Button size="xl" className="text-black bg-white w-full hover:bg-gray-400">
                    Explorar Más
                </Button>
                <Link href="/product">
                    <Button size="xl" className="w-full">
                        Haz tu Pedido
                    </Button>
                </Link>
            </div>
        </div>
    )
}
