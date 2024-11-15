import { User } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: {user: User | null, access_token: string | null} = {
  user: null,
  access_token: null,
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
    }
  }
})


export const {setAccessToken, setUser, clearUser} = userSlice.actions

export const user = userSlice.reducer