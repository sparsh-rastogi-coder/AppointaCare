import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
      <ul className='md:flex items-start gap-5 font-medium hidden'>
        <NavLink to='/' >
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors' >
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about' >
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact' >
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-4 '>
        {
          token && userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={userData.image} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={() => navigate('/health-tracker')} className='hover:text-black cursor-pointer'>Health Tracker</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Drawer Menu ---- */}
        {/* Backdrop */}
        {showMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300" onClick={() => setShowMenu(false)}></div>
        )}
        {/* Drawer */}
        <div className={`fixed top-0 right-0 h-full w-72 max-w-full bg-white z-40 shadow-2xl transform transition-transform duration-300 ease-in-out ${showMenu ? 'translate-x-0' : 'translate-x-full'} md:hidden`} tabIndex={-1} aria-modal="true" role="dialog">
          <div className='flex items-center justify-between px-5 py-6 border-b'>
            <img src={assets.logo} className='w-36' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 cursor-pointer' alt="" />
          </div>
          <ul className='flex flex-col gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-3 rounded hover:bg-neutral transition'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-3 rounded hover:bg-neutral transition'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-3 rounded hover:bg-neutral transition'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-3 rounded hover:bg-neutral transition'>CONTACT</p></NavLink>
            {token && userData && <>
              <div className="border-t my-3" />
              <p onClick={() => { setShowMenu(false); navigate('/my-profile'); }} className='px-4 py-3 rounded hover:bg-neutral transition cursor-pointer'>My Profile</p>
              <p onClick={() => { setShowMenu(false); navigate('/my-appointments'); }} className='px-4 py-3 rounded hover:bg-neutral transition cursor-pointer'>My Appointments</p>
              <p onClick={() => { setShowMenu(false); navigate('/health-tracker'); }} className='px-4 py-3 rounded hover:bg-neutral transition cursor-pointer'>Health Tracker</p>
              <p onClick={() => { setShowMenu(false); logout(); }} className='px-4 py-3 rounded hover:bg-danger hover:text-white transition cursor-pointer'>Logout</p>
            </>}
            {!token && <button onClick={() => { setShowMenu(false); navigate('/login'); }} className='bg-primary text-white px-8 py-3 rounded-full font-light mt-4'>Create account</button>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar