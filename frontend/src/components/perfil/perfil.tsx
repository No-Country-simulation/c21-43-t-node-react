'use client'
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
    console.log(usuario)


    if (!usuario) {
        return <p>Cargando datos del usuario...</p>;
    }

    return (
        <div className=' h-[80vh] my-0 bg-no-repeat bg-center bg-cover flex items-center justify-center' style={{
            backgroundImage: `url('/fondoPerfil1.avif')`,
        }}>

            <div className="max-w-4xl mx-auto p-8   bg-[#f27405d8] text-orange-200 flex justify-center content-center">
                <div className="p-10 rounded-lg shadow-md  mb-6">
                    <h2 className="text-xl font-bold mb-2">Perfil de Usuario</h2>
                    <p><strong>Nombre:</strong> {usuario.user.name}</p>
                    <p><strong>Apellido:</strong> {usuario.user.lastName}</p>
                    <p><strong>Email:</strong> {usuario.user.email}</p>
                </div>
            </div>
        </div>
    );
};


