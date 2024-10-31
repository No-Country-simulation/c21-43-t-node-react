export interface categoryData {
    id?:string;
    name: string;
}


export interface productData{
    id?:string,
    name:string,
    description:string,
    price:number,
    image:string,
    stock:number,
    categoryId:string[];
}



export interface orderData{
    id?:string,
    orderDate:Date,
    shippingAddress:string,
    totalAmount:number
}


export interface cartData{
    id?:string,
    status:string,
    userId?:string
}

interface CartDetailData{
    CartId: string;
    ProductId: string;
    quantity: number;
}
