"use client"

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Category } from '@/interfaces';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from 'axios';
import { Pencil, Trash2 } from "lucide-react"

export const CategoriesAdmin = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleCreateCategory = async (e: React.FormEvent) => {

        e.preventDefault()
        setIsLoading(true)

        const name = newCategoryName;

        try {

            const response = await axios.post('http://localhost:3000/category', { name });

            if (response.status == 201) {
                setCategories([...categories, response.data.data]);
                setNewCategoryName("");
            }

            console.log(response.data.data)

            toast({
                title: "Categoría Creada",
                description: `La categoría "${newCategoryName}" ha sido creada exitosamente.`,
            });

        } catch (error) {

            toast({
                title: "Error",
                description: "Hubo un problema al crear la categoría.",
                variant: "destructive",
            })

            console.log(error)

        } finally {

            setIsLoading(false)

        }

    }

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                //const response = await axios.get('https://c21-43-t-node-react-production-227f.up.railway.app/category');
                const response = await axios.get('http://localhost:3000/category');
                setCategories(response.data.data || []);

            } catch (error) {

                console.error('Error al obtener las categorías:', error);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'No se pudieron cargar las categorías',
                });

            }

        };

        fetchCategories();

    }, []);

    return (
        <div className="container mx-auto p-4">
            <h3 className="text-3xl">Gestión de Categorías</h3>
            <div className="grid md:grid-cols-4 gap-6 mt-6">
                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Lista de Categorías</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[380px] w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">ID</TableHead>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.map((category, index) => (
                                        <TableRow key={category.id}>
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell>{category.name}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="mr-2"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="sr-only">Editar</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Eliminar</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </CardContent>
                </Card>
                <div className='md:col-span-1 flex flex-col'>
                    <Card className='flex-grow-0'>
                        <CardHeader>
                            <CardTitle>Crear Nueva Categoría</CardTitle>
                        </CardHeader>
                        <form onSubmit={handleCreateCategory}>
                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Nombre de la Categoría</Label>
                                        <Input
                                            id="name"
                                            placeholder="Ingrese el nombre de la categoría"
                                            value={newCategoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isLoading} className='w-full'>
                                    {isLoading ? "Creando..." : "Crear Categoría"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
}
