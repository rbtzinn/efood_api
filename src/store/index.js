import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cart'

// Configura a store do Redux, combinando todos os reducers da aplicação.
export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
})

// Tipagem para o estado global (RootState) e para o despachante de ações (AppDispatch).
// Isso é útil para ter autocomplete e segurança de tipos com TypeScript.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
