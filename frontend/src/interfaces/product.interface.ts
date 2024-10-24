export interface Product {
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
}
 
export interface ProductDetailProps  {
    product: Product
}