import axios from "axios"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    role: null
}

const checkLogin = createSlice({
    name: 'checkLogin',
    initialState,
    reducers: {
        setLogin: (state) => {
            state.isLoggedIn = true
        },
        setLogout: (state) => {
            state.isLoggedIn = false,
            state.role = null; 
        },
        setLoginStatus: (state, action) => {
            state.isLoggedIn = action.payload,
            state.role = action.payload.role || null;
        }
    }
})

export const { setLogin, setLogout, setLoginStatus } = checkLogin.actions
export default checkLogin.reducer

export const checkTokenValidity = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')

        const response = await axios.get(`v1/check-auth`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('disini', response.data)
        dispatch(setLoginStatus({
            isLoggedIn: response.data.authenticated,
            role: response.data.user.role
        }));
        
    } catch (error) {
        if(error.response && error.response.status === 401) {
            localStorage.removeItem('token')
            dispatch(setLoginStatus(false))
        }
    }
}