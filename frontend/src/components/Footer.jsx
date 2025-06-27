import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-surface text-text-primary rounded-2xl mt-24 mx-2 md:mx-10 shadow-lg border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between gap-10 px-8 py-12">
        <div className="flex-1 min-w-[220px]">
          <img className="mb-6 w-40" src={assets.logo} alt="AppointaCare Logo" />
          <p className="text-text-secondary text-base leading-7 max-w-xs opacity-90">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
          <div className="flex gap-4 mt-6">
            {/* Social icons placeholder */}
            <span className="w-9 h-9 bg-primary bg-opacity-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-20 transition"><svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="8" /></svg></span>
            <span className="w-9 h-9 bg-primary bg-opacity-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-20 transition"><svg width="20" height="20" fill="currentColor"><rect x="4" y="4" width="12" height="12" rx="3" /></svg></span>
            <span className="w-9 h-9 bg-primary bg-opacity-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-20 transition"><svg width="20" height="20" fill="currentColor"><polygon points="5,3 19,10 5,17" /></svg></span>
          </div>
        </div>
        <div className="flex-1 min-w-[180px]">
          <p className="text-xl font-bold mb-6">COMPANY</p>
          <ul className="flex flex-col gap-3 text-text-secondary text-base">
            <li><Link to="/" className="hover:text-primary transition cursor-pointer">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary transition cursor-pointer">About us</Link></li>
            <li><Link to="/delivery" className="hover:text-primary transition cursor-pointer">Delivery</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-primary transition cursor-pointer">Privacy policy</Link></li>
          </ul>
        </div>
        <div className="flex-1 min-w-[180px]">
          <p className="text-xl font-bold mb-6">GET IN TOUCH</p>
          <ul className="flex flex-col gap-3 text-text-secondary text-base">
            <li className="hover:text-primary transition cursor-pointer">+91 8433163922</li>
            <li className="hover:text-primary transition cursor-pointer">sparshrastogiclass11a@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <p className="py-6 text-center text-text-secondary text-sm opacity-80">&copy; 2025 AppointaCare.com - All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
