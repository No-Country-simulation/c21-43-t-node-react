'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Slider = dynamic(() => import('react-slick'), { ssr: false })

export const Carrousel = () => {
  const products = [
    {
      id: 1,
      name: 'Aromatizante Rosa',
      href: '#',
      imageSrc: '/carrouselImages/aromatizante.jpg',
      imageAlt: "aromatizanteRosa.",
      price: '$35',
    },
    {
      id: 2,
      name: 'Aromatizante Limon y Romero',
      href: '#',
      imageSrc: '/carrouselImages/aromatizante2.jpg',
      imageAlt: "Front of men's Graphic Tee in gray.",
      price: '$40',
    },
    {
      id: 3,
      name: 'Aromatizante con Varillas',
      href: '#',
      imageSrc: '/carrouselImages/aromatizante3.jpg',
      imageAlt: "Front of men's Hoodie in blue.",
      price: '$45',
    },
    {
      id: 4,
      name: 'Aromatizante Canela y Naranja',
      href: '#',
      imageSrc: '/carrouselImages/aromatizante4.jpg',
      imageAlt: "Front of men's Sweatshirt in green.",
      price: '$50',
    },
    {
      id: 5,
      name: 'Aromatizante de Frasco',
      href: '#',
      imageSrc: '/carrouselImages/aromatizante5.jpg',
      imageAlt: "Front of men's Polo Shirt in red.",
      price: '$38',
    },
    {
      id: 6,
      name: 'Velas Naturales',
      href: '#',
      imageSrc: '/carrouselImages/incienso.jpg',
      imageAlt: "Front of men's Tank Top in white.",
      price: '$30',
    },
  ]

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }

  return (
    <div className="bg-[#ffe3cad8]  p-4 max-w-7xl mx-auto my-20 py-10 rounded-md">
      <h2 className="text-3xl text-center font-bold text-gray-900 mb-6">Productos Destacados</h2>
      <Slider {...settings} >
        {products.map((product) => (
          <div key={product.id} className="px-2 mb-6">
            <div className="relative w-full" style={{ paddingBottom: '100%' }}>
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="absolute inset-0 w-full h-full object-cover object-center rounded-md"
              />
            </div>
            <div className="mt-4 flex flex-col">
              <h3 className="text-sm font-medium text-gray-700">
                <a href={product.href} className="hover:underline">
                  {product.name}
                </a>
              </h3>
              <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}