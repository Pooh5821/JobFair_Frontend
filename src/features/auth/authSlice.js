import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//Get user from localstorage
//const user = JSON.parse(localStorage.getItem('user'))
const token=localStorage.getItem('token')

const initialState={
    token: token ? token : null,
    isError: false,
    isSuccess:false,
    isLoading: false,
    message: ''
}

//Login user
export const login =
createAsyncThunk('auth/login',async(user,thunkAPI)=>{
    try {
        return await authService.login(user)
    } catch (error) {
        const message=(error.response && error.response.data &&
        error.response.data.message)||error.message||error.toString();
    }
    return thunkAPI.rejectWithValue(message)
})

//Logout user
export const logout =
createAsyncThunk('auth/logout',async(_,thunkAPI)=>{
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state)=> {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder)=> {
        builder
        .addCase(login.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state, action)=>{
            state.isLoading = false
            state.isSuccess=true
            state.token=action.payload
        })
        .addCase(login.rejected,(state, action)=>{
            state.isLoading = false
            state.isError=true
            state.message=action.payload
            state.user=null
        })
        .addCase(logout.fulfilled,(state, action)=>{
            state.isLoading = false
            state.isSuccess=true
            state.user=null
            state.token=null

            localStorage.removeItem('token')
        })
    },
})

export const {reset} = authSlice.actions
export default authSlice.reducer