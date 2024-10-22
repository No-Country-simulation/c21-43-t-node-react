"use client"

import { useParams } from "next/navigation";

const page = () => {

    const { id } = useParams();

    return (
        <div className="h-screen">
            <h3 className="text-3xl m-10">Update Product {id}</h3>
        </div>
    );

};

export default page;