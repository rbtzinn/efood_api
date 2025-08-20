import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('efood:cart')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('efood:cart', JSON.stringify(items))
  }, [items])

  const add = (product, qty = 1) => {
    setItems(prev => {
      const found = prev.find(i => i.id === product.id)
      if (found) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { ...product, qty }]
    })
  }
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const inc = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i))
  const dec = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
  const clear = () => setItems([])
  const total = useMemo(() => items.reduce((t, i) => t + i.price * i.qty, 0), [items])

  const value = { items, add, remove, inc, dec, clear, total }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
