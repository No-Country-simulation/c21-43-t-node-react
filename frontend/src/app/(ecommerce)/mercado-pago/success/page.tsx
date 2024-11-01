import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Package, Truck } from "lucide-react";
import Link from "next/link";
import axios from "axios";

interface Product {
    id: string;
    name: string;
    price: string;
}

interface CartDetail {
    id: string;
    quantity: number;
    Product: Product;
}

interface Cart {
    id: string;
    CartDetails: CartDetail[];
}

interface Order {
    id: string;
    orderDate: string;
    shippingAddress: string;
    totalAmount: string;
    Cart: Cart;
}

const page = async ({ searchParams }: { searchParams: { external_reference: string } }) => {

    const externalReference = searchParams.external_reference;

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${externalReference}`);
    const orderDetail: Order = response.data.order;
    const orderProducts: CartDetail[] = orderDetail.Cart.CartDetails;

    return (
        <div className="container mx-auto p-4">
            <h3 className="text-3xl">Estado de la Orden</h3>
            <Card className="w-full max-w-3xl mx-auto overflow-hidden mt-4 mb-4">
                <CardHeader className="bg-[#ff8e42] p-6 flex flex-col md:flex-row justify-between">
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                        <CardTitle className="text-2xl font-semibold text-[#260A03]">Pago Realizado con Éxito!</CardTitle>
                    </div>
                    <div className="flex flex-col">
                        <p className="mt-2 text-[#260A03]">Resumen de tu orden</p>
                        <p className="text-sm">#{orderDetail?.id}</p>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg text-gray-700 mb-2">Detalles de la Orden</h3>
                                <div className="bg-gray-50 rounded-lg p-2">
                                    <p className="text-gray-600">Fecha: {orderDetail?.orderDate}</p>
                                    <p className="text-gray-600 mt-4">Total: <span className="text-xl font-bold text-[#ff8e42]">${orderDetail?.totalAmount}</span></p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-gray-700 mb-2">Información de Envío</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <Truck className="mt-1 text-[#ff8e42]" />
                                    <address className="not-italic text-gray-600">
                                        {orderDetail?.shippingAddress}<br />
                                        {/* {orderDetails.shipping.city}, {orderDetails.shipping.postalCode}<br />
                                        {orderDetails.shipping.country} */}
                                    </address>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <h3 className="font-semibold text-lg text-gray-700 mb-2">Artículos</h3>
                        <ul className="space-y-2">
                            {orderProducts.map((item, index) => (
                                <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                    <span className="flex items-center">
                                        <Package className="h-4 w-4 mr-2 text-[#ff8e42]" />
                                        {item.Product.name} <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                    </span>
                                    <span className="font-medium">${(parseFloat(item.Product.price) * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                            {/* {orderProducts.map((product, index) => (
                                <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                    <span className="flex items-center">
                                        <Package className="h-4 w-4 mr-2 text-[#ff8e42]" />
                                        {product.name} <span className="text-gray-500 ml-2">x{product.quantity}</span>
                                    </span>
                                    <span className="font-medium">€{(product.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))} */}
                        </ul>
                    </div>
                </CardContent>
                <Separator />
                <CardFooter className="p-6">
                    <Button asChild className="w-full">
                        <Link href="/">Volver a la Página Principal</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default page;

