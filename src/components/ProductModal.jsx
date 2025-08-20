import React, { useState } from 'react'
import { money } from '../utils'
import { useCart } from '../context/CartContext'

export default function ProductModal({ product, onClose }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)

  if (!product) return null

  const addToCart = () => {
    add({ id: product.id, name: product.nome, price: product.preco, image: product.foto }, qty)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-soft max-w-2xl w-full mx-4 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <img src={product.foto} alt={product.nome} className="w-full h-64 md:h-full object-cover" />
          <div className="p-6">
            <h3 className="text-2xl font-bold">{product.nome}</h3>
            <p className="text-gray-600 mt-2 leading-relaxed">{product.descricao}</p>
            {product.porcao && <p className="mt-2 text-sm text-gray-700">{product.porcao}</p>}
            <div className="mt-4 flex items-center gap-3">
              <label className="text-sm font-medium">Quantidade</label>
              <div className="inline-flex items-center rounded-xl border">
                <button onClick={() => setQty(Math.max(1, qty-1))} className="px-3 py-2">-</button>
                <span className="px-3">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="px-3 py-2">+</button>
              </div>
            </div>
            <button className="btn btn-primary w-full mt-6" onClick={addToCart}>
              Adicionar ao carrinho - {money(product.preco * qty)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
