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

    const { toast } = useToast();

    const fetchProducts = async () => {

        try {

            const response = await axios.get("https://c21-43-t-node-react-production-227f.up.railway.app/products");
            // const response = await axios.get("http://localhost:3000/products");

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
            const response = await axios.get(`http://localhost:3000/products/search?name=${name}`);
            setProducts(response.data.data.rows);
        } catch (error) {
            console.error("Error fetching products by name:", error);
        }
    };

    const fetchProductsByPriceRange = async (min: string, max: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/products/byPriceRange?minPrice=${min}&maxPrice=${max}`);
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products by price range:", error);
        }
    };

    const fetchProductsByCategory = async (categoryId: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/products/byCategory?categoryId=${categoryId}`);
            console.log(response);
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products by category:", error);
        }
    };

    const deleteProducts = async (id: string) => {

        try {

            //await axios.delete(`https://c21-43-t-node-react-production-227f.up.railway.app/products/${id}`);
            await axios.delete(`http://localhost:3000/products/${id}`);

            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));

        } catch (error) {

            console.log("error");

        }

    }

    useEffect(() => {
        fetchProducts();
    }, [])

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const response = await axios.get('https://c21-43-t-node-react-production-227f.up.railway.app/category');
                // const response = await axios.get('http://localhost:3000/category');
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

    useEffect(() => {
        if (nameFilter) {
            fetchProductsByName(nameFilter);
        } else {
            fetchProducts();
        }
    }, [nameFilter]);

    useEffect(() => {
        if (minPrice && maxPrice) {
            fetchProductsByPriceRange(minPrice, maxPrice);
        } else {
            fetchProducts();
        }
    }, [minPrice, maxPrice]);

    useEffect(() => {
        if (categoryFilter) {
            fetchProductsByCategory(categoryFilter);
        } else {
            fetchProducts();
        }
    }, [categoryFilter]);

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
                <Link href="/product/create">
                    <Button className="bg-[#f27405d8] w-full md:w-auto hover:bg-[#595302]">Crear Producto</Button>
                </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <aside className="sm:w-1/4">
                    <div className="flex flex-row items-center justify-between mb-4">
                        <h4 className="text-xl font-semibold text-gray-700">Filtrar Productos</h4>
                        <button
                            className="ml-2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Clear filters"
                            onClick={clearFilters}
                        >
                            <X size={20} />
                        </button>
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
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>
                </aside>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 flex-grow">
                    {products?.map((product) => (
                        <Card key={product.id} className="w-full">
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
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;


// "use client"

// import { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import axios from "axios";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { useToast } from "@/hooks/use-toast";

// interface Product {
//     id: string;
//     name: string;
//     description: string;
//     price: string;
//     image: string;
//     stock: number;
// }

// const Page = () => {

//     const { toast } = useToast();
//     const [products, setProducts] = useState<Product[]>([]);
//     const [name, setName] = useState<string>("");
//     const [minPrice, setMinPrice] = useState<string>("");
//     const [maxPrice, setMaxPrice] = useState<string>("");
//     const [categoryId, setCategoryId] = useState<string>("");

// const fetchProducts = async () => {

//     try {

//         //const response = await axios.get("https://c21-43-t-node-react-production-227f.up.railway.app/products");
//         const response = await axios.get("http://localhost:3000/products");

//         console.log(response)
//         setProducts(response.data.products);

//     } catch (error) {

//         toast({
//             title: "Error",
//             description: "Error Obteniendo Productos",
//             variant: "destructive",
//         });

//     }
// };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const handleFilter = async () => {

//         try {

//             let filteredProducts: Product[] = [];

//             if (name) {

//                 const response = await axios.get(`http://localhost:3000/products/search`, {
//                     params: { name },
//                 });

//                 console.log(response)

//                 filteredProducts = response.data.data.rows;

//             } else if (minPrice && maxPrice) {

//                 const response = await axios.get(`http://localhost:3000/products/byPriceRange`, {
//                     params: { minPrice, maxPrice },
//                 });

//                 console.log(response);

//                 filteredProducts = response.data.data;

//             } else if (categoryId) {

//                 const response = await axios.get(`http://localhost:3000/products/byCategory`, {
//                     params: { categoryId },
//                 });

//                 console.log(response);

//                 filteredProducts = response.data.data;

//             } else {

//                 await fetchProducts();
//                 return;

//             }

//             setProducts(filteredProducts);

//         } catch (error) {

//             toast({
//                 title: "Error",
//                 description: "Error aplicando filtros",
//                 variant: "destructive",
//             });

//             console.error("Error aplicando filtros:", error);

//         }

//     };

// const deleteProducts = async (id: string) => {

//     try {

//         //await axios.delete(`https://c21-43-t-node-react-production-227f.up.railway.app/products/${id}`);
//         await axios.delete(`http://localhost:3000/products/${id}`);

//         setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));

//     } catch (error) {

//         console.log("error");

//     }

// }

//     return (
//         <div className="flex flex-col md:flex-row container p-4 mx-auto">
//             {/* Sidebar de filtros */}
//             <div className="w-1/4 p-4">
//                 <h4 className="text-xl font-semibold mb-4">Filtrar productos</h4>
//                 <div className="flex flex-col space-y-4">
//                     <input
//                         type="text"
//                         placeholder="Buscar por nombre"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="p-2 border rounded"
//                     />
//                     <div className="flex flex-col gap-2">
//                         <input
//                             type="number"
//                             placeholder="Precio mínimo"
//                             value={minPrice}
//                             onChange={(e) => setMinPrice(e.target.value)}
//                             className="p-2 border rounded"
//                         />
//                         <input
//                             type="number"
//                             placeholder="Precio máximo"
//                             value={maxPrice}
//                             onChange={(e) => setMaxPrice(e.target.value)}
//                             className="p-2 border rounded"
//                         />
//                     </div>
//                     <input
//                         type="text"
//                         placeholder="Categoría ID"
//                         value={categoryId}
//                         onChange={(e) => setCategoryId(e.target.value)}
//                         className="p-2 border rounded"
//                     />
//                     <Button onClick={handleFilter} className="bg-[#f27405d8] hover:bg-[#595302]">Aplicar Filtros</Button>
//                 </div>
//             </div>

//             {/* Grid de productos */}
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-3/4">
//                 {products.map((product) => (
//                     <Card key={product.id} className="w-full cursor-pointer transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg">
//                         <CardHeader>
//                             <CardTitle>{product.name}</CardTitle>
//                         </CardHeader>
//                         <Link href={`/product/${product.id}/detail`}>
//                             <CardContent>
//                                 <img
//                                     src={product.image}
//                                     alt={product.name}
//                                     width={200}
//                                     height={200}
//                                     className="mb-4 rounded-md mx-auto"
//                                 />
//                                 <CardDescription>{product.description}</CardDescription>
//                                 <div className="flex flex-row items-center justify-between">
//                                     <p className="text-lg font-semibold mt-2">Precio: ${product.price}</p>
//                                     <p className="text-md mt-1">Stock: {product.stock}</p>
//                                 </div>
//                             </CardContent>
//                         </Link>
//                         <CardFooter className="flex flex-row items-center justify-between">
//                             <Link href={`/product/${product.id}/update`}>
//                                 <Button variant="default">Editar</Button>
//                             </Link>
//                             <AlertDialog>
//                                 <AlertDialogTrigger>
//                                     <Button variant="destructive">Eliminar</Button>
//                                 </AlertDialogTrigger>
//                                 <AlertDialogContent>
//                                     <AlertDialogHeader>
//                                         <AlertDialogTitle>¿Estás seguro de eliminar este producto?</AlertDialogTitle>
//                                         <AlertDialogDescription>
//                                             Una vez borrado, el producto ya no estará en la tienda.
//                                         </AlertDialogDescription>
//                                     </AlertDialogHeader>
//                                     <AlertDialogFooter>
//                                         <AlertDialogCancel>Cancelar</AlertDialogCancel>
//                                         <AlertDialogAction onClick={() => deleteProducts(product.id)}>Continuar</AlertDialogAction>
//                                     </AlertDialogFooter>
//                                 </AlertDialogContent>
//                             </AlertDialog>
//                         </CardFooter>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Page;