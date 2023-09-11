import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import authReducers from './authReducers'
import trackReducers from './trackReducers'
import playlistReducers from './playlistReducers'
import { useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    authReducers,
    trackReducers,
    playlistReducers,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector