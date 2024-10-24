"use client";

import { ProductDetail } from "@/components/Products";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/interfaces";

const page = () => {

    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {

        const fetchProductDetails = async () => {

            try {

                const response = await axios.get(`https://c21-43-t-node-react-production-227f.up.railway.app/products/${id}`);
                setProduct(response.data.data);
                
            } catch (error) {
                
                console.log(error);

            }

        }

        fetchProductDetails();
      
    }, [id]);


    if (!product) {
        return <p>Cargando...</p>;
    }

    return (
        <ProductDetail product={product}  />
    );
};

export default page;
