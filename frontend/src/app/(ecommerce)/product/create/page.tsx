'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, DollarSign, Package } from 'lucide-react';
//import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
//import { Toast, ToastProvider, ToastTitle, ToastDescription } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

import { Product } from '@/interfaces';
import axios from 'axios'

const uploadToCloudinary = async (file: File): Promise<string> => {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "product_images");

    const response = await axios.post("https://api.cloudinary.com/v1_1/djnpocgwl/image/upload", formData);

    return response.data.secure_url;

}

export default function page() {

    const [product, setProduct] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        image: '',
        stock: 0,
        categoryId: ''
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    //const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const { toast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProduct(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (value: string) => {
        setProduct(prev => ({ ...prev, categoryId: value }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()

        if (!imageFile) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Por favor, sube una imagen',
            })
            return;
        }

        try {

            const uploadedImageUrl = await uploadToCloudinary(imageFile);

            const newProduct: Product = {
                ...product,
                price: parseFloat(product.price.toString()),
                stock: parseInt(product.stock.toString()),
                image: uploadedImageUrl
            };

            await axios.post('http://localhost:3001/product', newProduct);

            setProduct({
                name: '',
                description: '',
                price: 0,
                categoryId: '',
                stock: 0,
                image: ''
            });

            setImageFile(null);
            setPreviewUrl(null);

            //setAlert({ type: 'success', message: 'Producto creado con éxito' });

            toast({
                variant: 'default',
                title: 'Éxito',
                description: 'Producto creado con éxito',
            });

        } catch (error) {

            console.error('Error:', error);

            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Error al crear el producto',
            });

        }

    }

    return (
        <div className="container p-4 max-w-7xl mx-auto mb-10">
            <h1 className="text-3xl mb-6">Crear Nuevo Producto</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className='grid md:grid-cols-2 gap-4'>
                    <div className="grid md:grid-cols-1 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Información Básica</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre del Producto</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={product.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Descripción</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={product.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Detalles del Producto</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="price">Precio</Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <Input
                                                id="price"
                                                name="price"
                                                type="number"
                                                value={product.price}
                                                onChange={handleChange}
                                                required
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="stock">Stock</Label>
                                        <div className="relative">
                                            <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <Input
                                                id="stock"
                                                name="stock"
                                                type="number"
                                                value={product.stock}
                                                onChange={handleChange}
                                                required
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Categoría</Label>
                                    <Select onValueChange={handleSelectChange} value={product.categoryId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ba917f9e-97b2-4d14-927a-a49fea729b0b">Natural</SelectItem>
                                            <SelectItem value="clothing">Ropa</SelectItem>
                                            <SelectItem value="books">Libros</SelectItem>
                                            <SelectItem value="home">Hogar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className='grid grid-cols-1 grid-rows-6 gap-4'>
                        <Card className='row-span-6 flex flex-col'>
                            <CardHeader>
                                <CardTitle>Imágenes del Producto</CardTitle>
                            </CardHeader>
                            <CardContent className='flex-grow flex flex-col'>
                                <div className="flex flex-col h-full">
                                    <div className='mb-4'>
                                        <Button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            variant="outline"
                                            className="w-full h-32 border-dashed"
                                        >
                                            <Upload className="mr-2 h-4 w-4" />
                                            Subir Imágenes
                                        </Button>
                                        <Input
                                            id="images"
                                            name="images"
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                        />
                                    </div>
                                    {previewUrl && (
                                        <div className="flex-grow flex items-center justify-center">

                                            <Image
                                                src={previewUrl}
                                                alt={`Vista previa`}
                                                width={200}
                                                height={200}
                                                className="rounded-md object-cover"
                                            />

                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <Button type="submit" className="row-start-7 w-full bg-[#f27405d8] hover:bg-[#595302] mt-auto">Crear Producto</Button>
                    </div>
                </div>         
            </form>
        </div>
    )
}