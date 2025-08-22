import { useCart } from '../context/CartContext'

export default function Header({ onOpenCart }) {
  const { items } = useCart()
  const count = items.reduce((t, i) => t + i.qty, 0)

  return (
    <header className="bg-brand-500 text-white">
      <div className="container flex items-center justify-between py-5">
        <a href="#" className="text-2xl font-extrabold tracking-tight">efood</a>
        <button onClick={onOpenCart} className="btn btn-outline bg-white/10 hover:bg-white/20">
          {count} produto(s) no carrinho
        </button>
      </div>
    </header>
  )
}
