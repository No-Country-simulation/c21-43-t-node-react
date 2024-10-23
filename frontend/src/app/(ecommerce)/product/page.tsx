"use client"

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    stock: number;
}

// const products = [
//     { 
//         id: 1, 
//         name: "Bolso tejido de yute", 
//         description: "Descripcion 1",
//         stock: 10,
//         image: "https://res.cloudinary.com/djnpocgwl/image/upload/v1729162029/yrzcchhwkzpdb4n2eqzm.jpg",
//         price: 40
//     },
// ];

const Page = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await axios.get("http://localhost:3000/products");
                setProducts(response.data.data);

            } catch (error) {

                console.error("Error Obteniendo Productos:", error);

            }
        };

        fetchProducts();

    }, []);

    return (
        <div className="flex flex-col container p-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h3 className="text-3xl mb-3 md:mb-0">Productos</h3>
                <Link href="/product/create" className="w-full md:w-auto">
                    <Button className="bg-[#f27405d8] w-full md:w-auto hover:bg-[#595302]">Crear Producto</Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center mb-10">
                {products.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}/detail`}>
                        <Card className="w-full cursor-pointer transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                            <CardHeader>
                                <CardTitle>{product.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    width={300}
                                    height={200}
                                    className="mb-4 rounded-md mx-auto"
                                />
                                <CardDescription>{product.description}</CardDescription>
                                <div className="flex flex-row items-center justify-between">
                                    <p className="text-lg font-semibold mt-2">Precio: ${product.price}</p>
                                    <p className="text-md mt-1">Stock: {product.stock}</p>
                                </div>
                            </CardContent>
                            {/* <CardFooter>
                            <Link href={`/products/${product.id}/update`}>
                                <Button variant="default">Editar</Button>
                            </Link>
                        </CardFooter> */}
                        </Card>
                    </Link>

                ))}
            </div>
        </div>
    );
};

export default Page;