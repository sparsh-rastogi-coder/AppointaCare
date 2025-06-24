import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import Verify from './pages/Verify'
import HealthTracker from './pages/HealthTracker'

const App = () => {
  return (
    <>
      <div className="svg-bg-blobs" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 400 300" to="360 400 300" dur="30s" repeatCount="indefinite"/>
            <path fill="#a5b4fc" d="M613.5 320.5Q613 391 547.5 414.5Q482 438 419.5 470.5Q357 503 295.5 470.5Q234 438 181.5 394Q129 350 144.5 280Q160 210 210.5 168Q261 126 325.5 98.5Q390 71 453.5 98.5Q517 126 570.5 168Q624 210 613.5 320.5Z">
              <animate attributeName="d" dur="10s" repeatCount="indefinite"
                values="M613.5 320.5Q613 391 547.5 414.5Q482 438 419.5 470.5Q357 503 295.5 470.5Q234 438 181.5 394Q129 350 144.5 280Q160 210 210.5 168Q261 126 325.5 98.5Q390 71 453.5 98.5Q517 126 570.5 168Q624 210 613.5 320.5Z;
                M600 320Q600 400 520 420Q440 440 380 470Q320 500 260 470Q200 440 150 390Q100 340 120 270Q140 200 200 160Q260 120 330 90Q400 60 470 90Q540 120 600 160Q660 200 650 320Q640 440 600 320Z;
                M613.5 320.5Q613 391 547.5 414.5Q482 438 419.5 470.5Q357 503 295.5 470.5Q234 438 181.5 394Q129 350 144.5 280Q160 210 210.5 168Q261 126 325.5 98.5Q390 71 453.5 98.5Q517 126 570.5 168Q624 210 613.5 320.5Z"/>
            </path>
            <path fill="#f472b6" opacity="0.5" d="M700 350Q700 450 600 470Q500 490 400 520Q300 550 200 520Q100 490 80 400Q60 310 120 250Q180 190 260 140Q340 90 420 120Q500 150 580 200Q660 250 700 350Z">
              <animate attributeName="d" dur="12s" repeatCount="indefinite"
                values="M700 350Q700 450 600 470Q500 490 400 520Q300 550 200 520Q100 490 80 400Q60 310 120 250Q180 190 260 140Q340 90 420 120Q500 150 580 200Q660 250 700 350Z;
                M720 340Q720 440 620 460Q520 480 420 510Q320 540 220 510Q120 480 100 390Q80 300 140 240Q200 180 280 130Q360 80 440 110Q520 140 600 190Q680 240 720 340Z;
                M700 350Q700 450 600 470Q500 490 400 520Q300 550 200 520Q100 490 80 400Q60 310 120 250Q180 190 260 140Q340 90 420 120Q500 150 580 200Q660 250 700 350Z"/>
            </path>
            <path fill="#9333ea" opacity="0.3" d="M650 300Q650 370 590 400Q530 430 470 460Q410 490 350 460Q290 430 230 400Q170 370 170 300Q170 230 230 200Q290 170 350 140Q410 110 470 140Q530 170 590 200Q650 230 650 300Z">
              <animate attributeName="d" dur="14s" repeatCount="indefinite"
                values="M650 300Q650 370 590 400Q530 430 470 460Q410 490 350 460Q290 430 230 400Q170 370 170 300Q170 230 230 200Q290 170 350 140Q410 110 470 140Q530 170 590 200Q650 230 650 300Z;
                M670 310Q670 380 610 410Q550 440 490 470Q430 500 370 470Q310 440 250 410Q190 380 190 310Q190 240 250 210Q310 180 370 150Q430 120 490 150Q550 180 610 210Q670 240 670 310Z;
                M650 300Q650 370 590 400Q530 430 470 460Q410 490 350 460Q290 430 230 400Q170 370 170 300Q170 230 230 200Q290 170 350 140Q410 110 470 140Q530 170 590 200Q650 230 650 300Z"/>
            </path>
          </g>
        </svg>
      </div>
      <div className='mx-4 sm:mx-[10%]'>
        <Toaster position="top-right" />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/health-tracker' element={<HealthTracker />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
