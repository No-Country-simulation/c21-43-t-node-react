import { ShoppingCart, Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reviews, ProductDetailProps } from "@/interfaces";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import Link from "next/link";

const reviewData: Reviews = {
    review: [
        {
            id: 1,
            author: "Juan Pérez",
            content: "XD",
            rating: 5,
            date: "2023-05-15"
        },
        {
            id: 2,
            author: "María García",
            content: "XD",
            rating: 4,
            date: "2023-06-02"
        }
    ]
};

export const ProductDetail = ({ product }: ProductDetailProps) => {

    const price = parseFloat(product.price.toString());
    const reviews = reviewData.review;

    return (
        <div className="container mx-auto px-5 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-20 md:mb-16 pt-12">
                <div className="flex justify-center md:justify-start items-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-3/4 h-auto object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="mb-6">{product.description}</p>
                    <div className="flex flex-row justify-between items-center mb-6">
                        <span className="text-2xl font-semibold">${price.toFixed(2)}</span>
                        <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? `STOCK: ${product.stock}` : 'Agotado'}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 mb-6 mt-14">
                        <label htmlFor="quantity" className="font-medium">Cantidad:</label>
                        <Select>
                            <SelectTrigger className="w-26">
                                <SelectValue placeholder="Cantidad" />
                            </SelectTrigger>
                            <SelectContent>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Button className="flex-1" disabled={product.stock === 0}>
                            <Link href="/cart" className="flex items-center">
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                {product.stock > 0 ? 'Añadir al carrito' : 'Agotado'}
                            </Link>
                        </Button>

                        <Button className="flex-1" disabled={product.stock === 0}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            {product.stock > 0 ? 'Comprar Ahora' : 'Agotado'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-12 mb-10">
                <div className="">
                    <h2 className="text-xl font-semibold mb-6">Comentarios de usuarios</h2>
                    <div className="space-y-6 mb-8">
                        {reviews.map((review) => (
                            <div key={review.id} className="border-b pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold">{review.author}</h3>
                                        <p className="text-sm text-gray-500">{review.date}</p>
                                    </div>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p>{review.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="">
                    <h3 className="text-xl font-semibold mb-6">Deja tu comentario</h3>
                    <form className="space-y-4 mb-5">
                        <Input
                            placeholder="Tu nombre"

                            required
                        />
                        <Textarea
                            placeholder="Tu comentario"
                            required
                        />
                    </form>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-row w-full justify-between md:justify-start items-center gap-2">
                            <label htmlFor="rating" className="font-medium">Calificación:</label>
                            <Select>
                                <SelectTrigger className="w-26">
                                    <SelectValue placeholder="Calificación" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="w-full md:w-auto">
                            <Send className="mr-2 h-4 w-4" />
                            Enviar comentario
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}