import { User } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
const initialState: {user: User | null, access_token: string | null, trigger: number, isFetching: boolean} = {
  user: null,
  access_token: null,
  trigger: 1,
  isFetching: true,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>)=>{
      state.access_token = action.payload
    },
    setUser: (state, action: PayloadAction<User>)=>{
      state.user = action.payload
    },
    clearUser:(state)=>{
      state.user = null
      state.access_token = null
    },
    trigger:(state)=>{
      state.trigger++
    },
    setIsFetching:(state, action: PayloadAction<boolean>) =>{
      state.isFetching = action.payload
    }
  }
})


export const {setAccessToken, setUser, clearUser, trigger, setIsFetching} = userSlice.actions

export const user = userSlice.reducer