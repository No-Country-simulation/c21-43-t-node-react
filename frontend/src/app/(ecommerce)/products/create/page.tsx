'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, DollarSign, Package, Tag } from 'lucide-react'

export default function page() {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        sku: '',
        weight: '',
        dimensions: { length: '', width: '', height: '' }
    })
    const [images, setImages] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProduct(prev => ({ ...prev, [name]: value }))
    }

    const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProduct(prev => ({
            ...prev,
            dimensions: { ...prev.dimensions, [name]: value }
        }))
    }

    const handleSelectChange = (value: string) => {
        setProduct(prev => ({ ...prev, category: value }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setImages(prevImages => [...prevImages, ...files])

        const newPreviewUrls = files.map(file => URL.createObjectURL(file))
        setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls])
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí iría la lógica para enviar los datos del producto y las imágenes a su backend
        console.log('Producto a crear:', product)
        console.log('Imágenes a subir:', images)
        // Resetear el formulario después de enviar
        setProduct({
            name: '',
            description: '',
            price: '',
            category: '',
            stock: '',
            sku: '',
            weight: '',
            dimensions: { length: '', width: '', height: '' }
        })
        setImages([])
        setPreviewUrls([])
    }

    return (
        <div className="container p-4 max-w-7xl mx-auto mb-10">
            <h1 className="text-3xl mb-6">Crear Nuevo Producto</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Información Básica */}
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
                                    <Label htmlFor="category">Categoría</Label>
                                    <Select onValueChange={handleSelectChange} value={product.category}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="electronics">Electrónica</SelectItem>
                                            <SelectItem value="clothing">Ropa</SelectItem>
                                            <SelectItem value="books">Libros</SelectItem>
                                            <SelectItem value="home">Hogar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Detalles */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalles del Producto</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="sku">SKU</Label>
                                    <div className="relative">
                                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="sku"
                                            name="sku"
                                            value={product.sku}
                                            onChange={handleChange}
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
                                <Label htmlFor="weight">Peso (kg)</Label>
                                <Input
                                    id="weight"
                                    name="weight"
                                    type="number"
                                    value={product.weight}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Dimensiones (cm)</Label>
                                <div className="grid grid-cols-3 gap-4">
                                    <Input
                                        name="length"
                                        placeholder="Largo"
                                        type="number"
                                        value={product.dimensions.length}
                                        onChange={handleDimensionChange}
                                    />
                                    <Input
                                        name="width"
                                        placeholder="Ancho"
                                        type="number"
                                        value={product.dimensions.width}
                                        onChange={handleDimensionChange}
                                    />
                                    <Input
                                        name="height"
                                        placeholder="Alto"
                                        type="number"
                                        value={product.dimensions.height}
                                        onChange={handleDimensionChange}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Imágenes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Imágenes del Producto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
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
                            {previewUrls.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {previewUrls.map((url, index) => (
                                        <Image
                                            key={index}
                                            src={url}
                                            alt={`Vista previa ${index + 1}`}
                                            width={200}
                                            height={200}
                                            className="rounded-md object-cover w-full h-32"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Button type="submit" className="w-full">Crear Producto</Button>
            </form>
        </div>
    )
}