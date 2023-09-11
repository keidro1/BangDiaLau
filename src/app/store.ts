import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import authReducers from './authReducers'
import trackReducers from './trackReducers'
import searchReducers from './searchReducers'
import playlistReducers from './playlistReducers'
import appReducers from './appReducers'

import { useSelector } from 'react-redux'


export const store = configureStore({
  reducer: {
    authReducers,
    trackReducers,
    searchReducers,
    playlistReducers,
    appReducers,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector