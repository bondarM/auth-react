import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import app from "../firebaseConfig.js";
let initialState = {
    isAuth: false
}
export const TOKEN = 'token'

export const asyncAuth = createAsyncThunk(
    'AUTH/ASYNC-AUTH',
    async (_, thunkAPI) => {
        const token = Cookies.get(TOKEN)
        if (token) {
            return { isAuth: true }
        }
        return { isAuth: false }
    })

export const signIn = createAsyncThunk(
    'AUTH/SIGN-IN',
    async ({ email, password }, thunkAPI) => {
        const res = await app.auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                Cookies.set(TOKEN, res.user.refreshToken)
                return true
            })
        return { isAuth: res }
    })

export const signUp = createAsyncThunk(
    'AUTH/SIGN-UP',
    async ({ email, password }, thunkAPI) => {
        await app.auth().createUserWithEmailAndPassword(email, password)
        await thunkAPI.dispatch(signIn({ email, password }))
    })

export const logOut = createAsyncThunk(
    'AUTH/LOGOUT',
    async () => {
        const res = await app.auth().signOut()
            .then((_) => {
                Cookies.remove(TOKEN)
                return false
            })
        return { isAuth: res }
    })

const authSlice = createSlice({
    name: 'AUTH',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase((signIn.fulfilled), (state, action) => {
            state.isAuth = action.payload.isAuth
        })
        builder.addCase((logOut.fulfilled), (state, action) => {
            state.isAuth = action.payload.isAuth
        })
        builder.addCase((asyncAuth.fulfilled), (state, action) => {
            state.isAuth = action.payload.isAuth
        })
    }
})



export const authReducer = authSlice.reducer
