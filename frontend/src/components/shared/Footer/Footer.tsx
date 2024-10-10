import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-green-800 to-green-900 text-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold mb-2 text-green-100">NaturEssence</h2>
            <p className="text-xs text-center md:text-left text-green-200 max-w-xs">
              Llevando las bondades de la naturaleza a tu vida diaria.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-2 text-green-100">Contáctanos</h3>
            <div className="flex items-center mb-1 text-green-200 hover:text-green-100 transition-colors duration-300">
              <FaPhone className="mr-2 text-sm" />
              <span className="text-sm">(+54) 123-4567</span>
            </div>
            <div className="flex items-center text-green-200 hover:text-green-100 transition-colors duration-300">
              <FaMapMarkerAlt className="mr-2 text-sm" />
              <span className="text-sm">Calle 1234, Argentina</span>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-2 text-green-100">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-green-200 hover:text-green-100 transition-colors duration-300">
                <span className="sr-only">Facebook</span>
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-green-200 hover:text-green-100 transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-green-200 hover:text-green-100 transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-green-700 text-center text-xs text-green-300">
          <p>&copy; 2024 NaturEssence. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}