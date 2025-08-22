import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
  items: [] // {id, name, price, image, qty}
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, name, price, image, qty = 1 } = action.payload
      const existing = state.items.find(i => i.id === id)
      if (existing) {
        existing.qty += qty
      } else {
        state.items.push({ id, name, price, image, qty })
      }
    },
    removeItem: (state, action) => {
      const id = action.payload
      state.items = state.items.filter(i => i.id !== id)
    },
    increaseQty: (state, action) => {
      const id = action.payload
      const item = state.items.find(i => i.id === id)
      if (item) item.qty += 1
    },
    decreaseQty: (state, action) => {
      const id = action.payload
      const item = state.items.find(i => i.id === id)
      if (item) item.qty = Math.max(1, item.qty - 1)
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addItem, removeItem, increaseQty, decreaseQty, clearCart } = cartSlice.actions

export const selectItems = (state) => state.cart.items
export const selectCount = createSelector(selectItems, items => items.reduce((t, i) => t + i.qty, 0))
export const selectTotal = createSelector(selectItems, items => items.reduce((t, i) => t + i.price * i.qty, 0))

export default cartSlice.reducer