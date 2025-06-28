import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)

    // Getting Doctors using API
    const getDoctosData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    // Getting User Profile using API
    const loadUserProfileData = async () => {

        try {
            console.log('Loading user profile with token:', !!token);
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

            console.log('User profile response:', data);

            if (data.success) {
                setUserData(data.userData)
                console.log('User data set successfully:', data.userData);
            } else {
                console.log('Failed to load user profile:', data.message);
                toast.error(data.message)
            }

        } catch (error) {
            console.log('Error loading user profile:', error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        getDoctosData()
    }, [])

    useEffect(() => {
        console.log('Token changed:', !!token);
        if (token) {
            loadUserProfileData()
        } else {
            console.log('No token, setting userData to false');
            setUserData(false)
        }
    }, [token])

    const value = {
        doctors, getDoctosData,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData, loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider
