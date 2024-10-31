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

    useEffect(() => {

        const fetchCartDetails = async () => {

            try {
                const response = await axios.get(`http://localhost:3000/cart/cartDetail/${useruiid}`);
                setProducts(response.data.products || []);
            } catch (error) {
                console.error("Error al obtener productos del carrito:", error);
            }

        };

        fetchCartDetails();

    }, [useruiid]);

	if(products) console.log(products)

    return <ProductCart products={products} />;
};

export default Page;
