export interface Cart {
    id: number
    name: string
    price: number
    quantity: number
}

export interface ProductCartProps {
    products: Cart[];
}
