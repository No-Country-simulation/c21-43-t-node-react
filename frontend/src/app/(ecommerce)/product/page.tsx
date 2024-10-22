import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {

    const products = [
        { id: 1, name: "Producto 1", description: "Descripcion 1" },
        { id: 2, name: "Producto 2", description: "Descripcion 2" },
        { id: 3, name: "Producto 3", description: "Descripcion 3" },
        { id: 4, name: "Producto 4", description: "Descripcion 4" }
    ];

    return (
        <div className="flex flex-col container p-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <h3 className="text-3xl mb-3 md:mb-0">Listar Productos</h3>
                <Link href="/products/create" className="w-full md:w-auto">
                    <Button className="w-full md:w-auto">Crear Producto</Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center mb-10">
                {products.map((product) => (
                    <Card key={product.id} className="w-full">
                        <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                            <CardDescription>{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Informacion Adicional.</p>
                        </CardContent>
                        <CardFooter>
                            <Link href={`/products/${product.id}/update`}>
                                <Button variant="default">Editar</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default page;