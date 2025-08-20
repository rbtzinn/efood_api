import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import CartDrawer from './components/CartDrawer'
import { CartProvider, useCart } from './context/CartContext'
import dataMock from './data/restaurantes.json'

const API_URL = import.meta.env.VITE_API_URL || 'https://ebac-fake-api.vercel.app/api/efood/restaurantes'

function useRestaurants() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(API_URL, { headers: { 'Accept': 'application/json' } })
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const json = await res.json()
        // Try to normalize possible formats
        const normalized = Array.isArray(json) ? json : (json.restaurantes || [])
        if (!cancelled) setRestaurants(normalized.map(normalizeRestaurant))
      } catch (err) {
        // fallback to local mock
        console.warn('Falha ao buscar API, usando mock local:', err?.message)
        if (!cancelled) setRestaurants(dataMock.restaurantes.map(normalizeRestaurant))
        if (!cancelled) setError('Não foi possível carregar a API remota, usando dados locais.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return { restaurants, loading, error }
}

function normalizeRestaurant(r) {
  // try to map common field names
  return {
    id: r.id,
    titulo: r.titulo || r.title || r.nome || r.name,
    tipo: r.tipo || r.categoria || r.type || 'Restaurante',
    avaliacao: r.avaliacao || r.rating || 0,
    descricao: r.descricao || r.description || '',
    capa: r.capa || r.imagem || r.image || r.banner || '',
    cardapio: (r.cardapio || r.menu || r.itens || []).map(p => ({
      id: p.id,
      nome: p.nome || p.name || p.titulo || p.title,
      descricao_curta: p.descricao_curta || p.shortDescription,
      descricao: p.descricao || p.description,
      preco: Number(p.preco ?? p.price ?? 0),
      porcao: p.porcao || p.serving || '',
      foto: p.foto || p.image || ''
    }))
  }
}

function Hero() {
  return (
    <section className="bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
      <div className="bg-black/50">
        <div className="container py-16 text-center text-white">
          <h1 className="title">Viva experiências gastronômicas<br className="hidden md:inline" /> no conforto da sua casa</h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">Escolha seu restaurante favorito e faça o pedido com poucos cliques.</p>
        </div>
      </div>
    </section>
  )
}

function Home({ onOpenRestaurant }) {
  const { restaurants, loading, error } = useRestaurants()
  return (
    <>
      <Hero />
      <main className="container py-8">
        {error && <div className="mb-4 rounded-xl bg-yellow-50 border border-yellow-200 p-3 text-yellow-800">{error}</div>}
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {restaurants.map(r => (
              <RestaurantCard key={r.id} r={r} onOpen={onOpenRestaurant} />
            ))}
          </div>
        )}
        <p className="text-xs text-gray-500 mt-8">A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega e qualidade dos produtos é do estabelecimento contratado.</p>
      </main>
    </>
  )
}

function RestaurantView({ restaurant, onBack, onOpenProduct, onAddProduct }) {
  return (
    <div>
      <section className="relative">
        <img src={restaurant.capa} alt={restaurant.titulo} className="h-56 w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container absolute inset-x-0 bottom-4 text-white flex items-end justify-between">
          <div>
            <span className="badge bg-white/20 text-white">{restaurant.tipo}</span>
            <h2 className="text-3xl font-bold mt-2">{restaurant.titulo}</h2>
            <p className="text-white/90 max-w-2xl">{restaurant.descricao}</p>
          </div>
          <button className="btn btn-outline bg-white/20" onClick={onBack}>Voltar</button>
        </div>
      </section>
      <main className="container py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {restaurant.cardapio.map(p => (
            <ProductCard key={p.id} p={p} onDetails={onOpenProduct} onAdd={onAddProduct} />
          ))}
        </div>
      </main>
    </div>
  )
}

function AppInner() {
  const [openCart, setOpenCart] = useState(false)
  const [restaurant, setRestaurant] = useState(null)
  const [modalProduct, setModalProduct] = useState(null)
  const { add } = useCart()

  return (
    <div className="min-h-screen bg-rose-50">
      <Header onOpenCart={() => setOpenCart(true)} />
      {!restaurant ? (
        <Home onOpenRestaurant={setRestaurant} />
      ) : (
        <RestaurantView
          restaurant={restaurant}
          onBack={() => setRestaurant(null)}
          onOpenProduct={setModalProduct}
          onAddProduct={(p) => add({ id: p.id, name: p.nome, price: p.preco, image: p.foto }, 1)}
        />
      )}
      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  )
}
