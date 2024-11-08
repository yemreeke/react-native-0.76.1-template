import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type IUser = {
    id: number
    name: string
    surname: string
}
export type IAuthStore = {
    user?: IUser
    token: string

}

const initialState: IAuthStore = {
    user: undefined,
    token: "",
}

const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        logout: (state) => {
            state.user = undefined
            state.token = ""
        },
    }
})

export const { setUser, setToken, logout } = authReducer.actions
export default authReducer.reducer