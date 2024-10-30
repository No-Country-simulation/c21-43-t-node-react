export interface Product {
    id?: string;
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