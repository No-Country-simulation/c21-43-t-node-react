"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/interfaces";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react";
import { useStore } from "@/store/Store";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
}

const Page = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [nameFilter, setNameFilter] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const usuario = useStore((state) => state.usuario);
    console.log('usuario product', usuario)

    const { toast } = useToast();

    const fetchProducts = async () => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);

            console.log(response)
            setProducts(response.data.products);

        } catch (error) {

            toast({
                title: "Error",
                description: "Error Obteniendo Productos",
                variant: "destructive",
            });

        }
    };

    const fetchProductsByName = async (name: string) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/search?name=${name}`);
            setProducts(response.data.data.rows);
        } catch (error) {
            console.error("Error fetching products by name:", error);
        }
    };

    const fetchProductsByPriceRange = async (min: string, max: string) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/byPriceRange?minPrice=${min}&maxPrice=${max}`);
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products by price range:", error);
        }
    };

    const fetchProductsByCategory = async (categoryId: string) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/byCategory?categoryId=${categoryId}`);
            console.log(response);
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products by category:", error);
        }
    };

    const deleteProducts = async (id: string) => {

        try {

            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);

            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));

        } catch (error) {

            console.log("error");

        }

    }

    useEffect(() => {

        const applyFilters = async () => {

            if (nameFilter) {
                await fetchProductsByName(nameFilter);
            } else if (minPrice && maxPrice) {
                await fetchProductsByPriceRange(minPrice, maxPrice);
            } else if (categoryFilter) {
                await fetchProductsByCategory(categoryFilter);
            } else {
                await fetchProducts(); 
            }

        };

        applyFilters();

    }, [nameFilter, minPrice, maxPrice, categoryFilter]);


    useEffect(() => {

        const fetchCategories = async () => {

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);
                setCategories(response.data.data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'No se pudieron cargar las categorías',
                });
            }
        };

        fetchCategories();

    }, []);

    const clearFilters = () => {
        setNameFilter("");
        setMinPrice("");
        setMaxPrice("");
        setCategoryFilter("");
        fetchProducts();
    };

    return (
        <div className="flex flex-col container p-4 mx-auto min-h-screen">
            <div className="flex flex-row justify-center items-center md:justify-between mb-5">
                <h3 className="text-3xl pb-0.5 flex-1">Productos</h3>
                {
                    usuario?.user?.registrationType === "Seller" || usuario?.user?.registrationType === "Admin" ?
                        <Link href="/product/create">
                            <Button className="bg-[#ff8e42] text-[#260A03] hover:bg-[#F2CB05] w-full md:w-auto ">Crear Producto</Button>
                        </Link>
                        :
                        <></>

                }
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <aside className="sm:w-1/4">
                    <div className="flex flex-row items-center justify-between mb-4">
                        <h4 className="text-xl font-semibold text-gray-700">Filtrar Productos</h4>
                        <span
                            className="ml-2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                            aria-label="Clear filters"
                            onClick={clearFilters}
                        >
                            <X size={20} />
                        </span>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Nombre del producto</label>
                        <Input
                            id="nameFilter"
                            name="nameFilter"
                            type="text"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Rango de precio</label>
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                name="minPrice"
                                id="minPrice"
                                placeholder="Mínimo"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="mt-1 p-2 w-1/2 rounded-md border-gray-300"
                            />
                            <Input
                                type="number"
                                name="maxPrice"
                                id="maxPrice"
                                placeholder="Máximo"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="mt-1 p-2 w-1/2 rounded-md border-gray-300"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Categoría</label>
                        <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(category => (
                                    <SelectItem key={category.id} value={String(category.id)}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>
                </aside>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 flex-grow">
                    {products?.map((product) => (
                        <Card key={product.id} className="w-full cursor-pointer transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                            <CardHeader>
                                <CardTitle>{product.name}</CardTitle>
                            </CardHeader>
                            <Link href={`/product/${product.id}/detail`}>
                                <CardContent>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="mb-4 rounded-md mx-auto"
                                    />
                                    <CardDescription>{product.description}</CardDescription>
                                    <div className="flex flex-row items-center justify-between">
                                        <p className="text-lg font-semibold mt-2">Precio: ${product.price}</p>
                                        <p className="text-md mt-1">Stock: {product.stock}</p>
                                    </div>
                                </CardContent>
                            </Link>
                            {
                                usuario?.user?.registrationType === "Seller" || usuario?.user?.registrationType === "Admin" ?


                                    <CardFooter className="flex flex-row items-center justify-between">
                                        <Link href={`/product/${product.id}/update`}>
                                            <Button variant="default">Editar</Button>
                                        </Link>
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <Button variant="destructive">Eliminar</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>¿Estás seguro de eliminar este producto?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Una vez borrado, el producto ya no estará en la tienda.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => deleteProducts(product.id)}>Continuar</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </CardFooter>
                                    :
                                    <></>
                            }
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;


