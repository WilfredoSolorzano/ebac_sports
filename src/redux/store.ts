import { configureStore } from '@reduxjs/toolkit'
import carrinhoReducer from './slices/cartSlice'
import favoritosReducer from './slices/favoritosSlice'
import produtosReducer from './slices/produtosSlice'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    carrinho: carrinhoReducer,
    favoritos: favoritosReducer,
    produtos: produtosReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
