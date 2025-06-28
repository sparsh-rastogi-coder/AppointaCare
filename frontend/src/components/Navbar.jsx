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
    <div className='flex items-center justify-between text-base py-5 px-4 md:px-10 mb-8 bg-surface shadow-sm rounded-2xl mt-4'>
      <img onClick={() => navigate('/')} className='w-40 cursor-pointer select-none' src={assets.logo} alt="AppointaCare Logo" />
      <ul className='md:flex items-center gap-8 font-semibold tracking-wide hidden'>
        <NavLink to='/' className={({ isActive }) => isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-text-secondary hover:text-primary transition'}>
          <li>HOME</li>
        </NavLink>
        <NavLink to='/doctors' className={({ isActive }) => isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-text-secondary hover:text-primary transition'}>
          <li>ALL DOCTORS</li>
        </NavLink>
        <NavLink to='/ai-doctor' className={({ isActive }) => isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-text-secondary hover:text-primary transition'}>
          <li>AI DOCTOR</li>
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-text-secondary hover:text-primary transition'}>
          <li>ABOUT</li>
        </NavLink>
        <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-text-secondary hover:text-primary transition'}>
          <li>CONTACT</li>
        </NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {
          token && userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-9 h-9 rounded-full border-2 border-accent shadow' src={userData.image} alt="Profile" />
              <img className='w-3' src={assets.dropdown_icon} alt="Dropdown" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-text-secondary z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-surface rounded-xl shadow-lg flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-primary cursor-pointer transition'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-primary cursor-pointer transition'>My Appointments</p>
                  <p onClick={() => navigate('/health-tracker')} className='hover:text-primary cursor-pointer transition'>Health Tracker</p>
                  <p onClick={() => navigate('/ai-doctor')} className='hover:text-primary cursor-pointer transition'>AI Doctor</p>
                  <p onClick={logout} className='hover:text-error cursor-pointer transition'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-secondary transition hidden md:block'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-7 md:hidden cursor-pointer' src={assets.menu_icon} alt="Menu" />

        {/* ---- Mobile Drawer Menu ---- */}
        {showMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300" onClick={() => setShowMenu(false)}></div>
        )}
        <div className={`fixed top-0 right-0 h-full w-72 max-w-full bg-surface z-40 shadow-2xl transform transition-transform duration-300 ease-in-out ${showMenu ? 'translate-x-0' : 'translate-x-full'} md:hidden rounded-l-2xl`} tabIndex={-1} aria-modal="true" role="dialog">
          <div className='flex items-center justify-between px-6 py-7 border-b'>
            <img src={assets.logo} className='w-32' alt="AppointaCare Logo" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-8 cursor-pointer' alt="Close" />
          </div>
          <ul className='flex flex-col gap-2 mt-7 px-6 text-lg font-semibold'>
            <NavLink onClick={() => setShowMenu(false)} to='/' className={({ isActive }) => isActive ? 'text-primary' : 'text-text-secondary hover:text-primary transition'}><p className='px-4 py-3 rounded hover:bg-background transition'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' className={({ isActive }) => isActive ? 'text-primary' : 'text-text-secondary hover:text-primary transition'}><p className='px-4 py-3 rounded hover:bg-background transition'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/ai-doctor' className={({ isActive }) => isActive ? 'text-primary' : 'text-text-secondary hover:text-primary transition'}><p className='px-4 py-3 rounded hover:bg-background transition'>AI DOCTOR</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' className={({ isActive }) => isActive ? 'text-primary' : 'text-text-secondary hover:text-primary transition'}><p className='px-4 py-3 rounded hover:bg-background transition'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' className={({ isActive }) => isActive ? 'text-primary' : 'text-text-secondary hover:text-primary transition'}><p className='px-4 py-3 rounded hover:bg-background transition'>CONTACT</p></NavLink>
            {token && userData && <>
              <div className="border-t my-3" />
              <p onClick={() => { setShowMenu(false); navigate('/my-profile'); }} className='px-4 py-3 rounded hover:bg-background transition cursor-pointer'>My Profile</p>
              <p onClick={() => { setShowMenu(false); navigate('/my-appointments'); }} className='px-4 py-3 rounded hover:bg-background transition cursor-pointer'>My Appointments</p>
              <p onClick={() => { setShowMenu(false); navigate('/health-tracker'); }} className='px-4 py-3 rounded hover:bg-background transition cursor-pointer'>Health Tracker</p>
              <p onClick={() => { setShowMenu(false); navigate('/ai-doctor'); }} className='px-4 py-3 rounded hover:bg-background transition cursor-pointer'>AI Doctor</p>
              <p onClick={() => { setShowMenu(false); logout(); }} className='px-4 py-3 rounded hover:bg-error hover:text-white transition cursor-pointer'>Logout</p>
            </>}
            {!token && <button onClick={() => { setShowMenu(false); navigate('/login'); }} className='bg-primary text-white px-8 py-3 rounded-full font-semibold mt-4 shadow-md hover:bg-secondary transition'>Create account</button>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar