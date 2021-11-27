import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authReducer } from './authReducer'

export const store = configureStore({
    reducer: {
        authReducer
    }
})

export const useAppDispatch = () => useDispatch()
