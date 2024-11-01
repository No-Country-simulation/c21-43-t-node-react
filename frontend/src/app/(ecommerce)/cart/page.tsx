"use client";

import { useEffect, useState } from "react";
import { ProductCart } from "@/components/Products/ProductCart";
import { useStore } from "@/store/Store";
import axios from "axios";
import { Cart } from "@/interfaces";

const Page = () => {
    const { getUserId } = useStore();
    const useruiid = getUserId();
    const [products, setProducts] = useState<Cart[]>([]);
    const [cartData, setCartData] = useState<{ products: Cart[], cartId: string | null }>({ products: [], cartId: null });

    useEffect(() => {

        const fetchCartDetails = async () => {

            try {

                console.log(useruiid)

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart/cartDetail/${useruiid}`);

                setCartData({
                    products: response.data.products || [],
                    cartId: response.data.cartId.id || '',
                });

            } catch (error) {
                console.error("Error al obtener productos del carrito:", error);
            }

        };

        fetchCartDetails();

    }, [useruiid]);

    return <ProductCart products={cartData.products} cartId={cartData.cartId} />;
};

export default Page;
