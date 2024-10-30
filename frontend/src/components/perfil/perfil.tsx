// src/components/Perfil.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStore } from '../../store/Store';

interface Producto {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
}

export const Perfil: React.FC = () => {
    const usuario = useStore((state) => state.usuario);
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        const fetchProductos = async () => {
            if (!usuario) return;

            try {
                const response = await axios.get('/api/productos', {
                    params: { usuarioId: usuario.id }
                });
                setProductos(response.data);
            } catch (error) {
                console.error('Error al cargar los productos:', error);
            }
        };

        fetchProductos();
    }, [usuario]);

    if (!usuario) {
        return <p>Cargando datos del usuario...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-2">Perfil de Usuario</h2>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Apellido:</strong> {usuario.apellido}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">Productos Publicados</h2>
                {productos.length > 0 ? (
                    <ul className="space-y-4">
                        {productos.map((producto) => (
                            <li key={producto.id} className="border p-3 rounded-md">
                                <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                                <p>{producto.descripcion}</p>
                                <p className="text-sm text-gray-500">Precio: ${producto.precio}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tienes productos publicados.</p>
                )}
            </div>
        </div>
    );
};


