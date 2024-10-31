import React from 'react'
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className="bg-[#ff8e42] text-[#260A03]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="flex flex-col items-center md:items-start">
            <Image src="/Logo_Horizontal_Negro@3x.png" alt='Logo' width="120" height="90" />
            <p className="text-xs text-center md:text-left text-[#260A03] max-w-xs">
              Llevando las bondades de la naturaleza a tu vida diaria.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-2 text-[#260A03]">Contáctanos</h3>
            <div className="flex items-center mb-1 text-[#260A03] hover:text-orange-100 transition-colors duration-300">
              <FaPhone className="mr-2 text-sm" />
              <span className="text-sm">(+54) 123-4567</span>
            </div>
            <div className="flex items-center text-[#260A03] hover:text-orange-100 transition-colors duration-300">
              <FaMapMarkerAlt className="mr-2 text-sm" />
              <span className="text-sm">Calle 1234, Argentina</span>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-2 text-[#260A03]">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-[#260A03] hover:text-orange-100 transition-colors duration-300">
                <span className="sr-only">Facebook</span>
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-[#260A03] hover:text-orange-100 transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-[#260A03] hover:text-orange-100 transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-[#260A03] text-center text-xs">
          <p>&copy; 2024 Tierra y Alma. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}