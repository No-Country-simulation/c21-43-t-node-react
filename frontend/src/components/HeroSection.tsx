"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { CallToAction } from "@/components/CallToAction";

interface ImageItem {
    src: string;
    alt: string;
}

export const HeroSection = () => {

    const images: ImageItem[] = [
        { src: "/hero_section_images/hero-section-1.jpg", alt: "Hero Image 1" },
        { src: "/hero_section_images/hero-section-2.jpg", alt: "Hero Image 2" },
        { src: "/hero_section_images/hero-section-3.jpg", alt: "Hero Image 3" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <main className="relative w-full h-screen sm:h-screen overflow-hidden">
            <div className="w-full h-full overflow-hidden relative">
                <Image
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority={true}
                    loading="eager"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>

            <CallToAction />

        </main>

    )
}


