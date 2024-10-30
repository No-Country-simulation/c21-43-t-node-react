"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Cart } from "@/interfaces";
import Link from "next/link";

export const ProductCart = ({ products }: { products: Cart[] }) => {

    const [productos, setProductos] = useState<Cart[]>(products);

    useEffect(() => {
        setProductos(products);
    }, [products]); 

    const actualizarCantidad = (id: number, cambio: number) => {
        setProductos(productos.map(producto =>
            producto.id === id
                ? { ...producto, cantidad: Math.max(0, producto.quantity + cambio) }
                : producto
        ).filter(producto => producto.quantity > 0));
    };

    const total = productos.reduce(
        (sum, producto) => sum + (producto.price || 0) * (producto.quantity || 0),
        0
    );

    return (
        <div className="container mx-auto p-4 mb-4">
            <h1 className="text-3xl mb-5">Carrito de Compras</h1>
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Productos en el Carrito</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {productos.length === 0 ? (
                            <p className="text-center text-gray-500">Tu carrito está vacío</p>
                        ) : (
                            <ul className="space-y-4">
                                {productos.map((producto) => (
                                    <li key={producto.id} className="flex justify-between items-center border-b pb-4">
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{producto.name}</h3>
                                            <p className="text-sm text-gray-500">${ producto.price } cada uno</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => actualizarCantidad(producto.id, -1)}
                                                disabled={producto.quantity <= 1}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="w-8 text-center">{producto.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => actualizarCantidad(producto.id, 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => actualizarCantidad(producto.id, -producto.quantity)}
                                                className="ml-2"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Resumen de Compra</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {productos.map((producto) => (
                                <div key={producto.id} className="flex justify-between text-sm">
                                    <span>{producto.name} (x{producto.quantity})</span>
                                    <span>${((producto.price || 0) * (producto.quantity || 0)).toFixed(2)}</span>
                                </div>
                            ))}
                            <Separator />
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <Button className="w-full" disabled={productos.length === 0}>
                                Proceder al Pago
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Link href="/product">
                                    Seguir Comprando
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
