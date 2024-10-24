export interface Product {
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    categoryId: string
}
 
export interface ProductDetailProps  {
    product: Product
}