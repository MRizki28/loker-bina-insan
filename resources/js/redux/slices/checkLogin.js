import axios from "axios"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}

const checkLogin = createSlice({
    name: 'checkLogin',
    initialState,
    reducers: {
        setLogin: (state) => {
            state.isLoggedIn = true
        },
        setLogout: (state) => {
            state.isLoggedIn = false
        },
        setLoginStatus: (state, action) => {
            state.isLoggedIn = action.payload
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
        dispatch(setLoginStatus(response.data.authenticated ))
    } catch (error) {
        if(error.response && error.response.status === 401) {
            localStorage.removeItem('token')
            dispatch(setLoginStatus(false))
        }
    }
}