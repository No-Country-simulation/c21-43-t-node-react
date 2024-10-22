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
    categoryId:string
}