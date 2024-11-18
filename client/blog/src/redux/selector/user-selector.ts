import { RootState } from "@/redux/store";

export const userSelector = (state: RootState) => state.user.user

export const accessTokenSelector = (state: RootState) => state.user.access_token

export const triggerSelector = (state: RootState) => state.user.trigger

export const isFetchingSelector = (state: RootState) => state.user.isFetching