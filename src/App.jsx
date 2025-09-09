import { useEffect, useState } from "react";
import HeaderHome from "./components/HeaderHome";
import Footer from "./components/Footer";
import HeaderRestaurant from "./components/HeaderRestaurant";
import RestaurantCard from "./components/RestaurantCard";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import ConfirmationModal from "./components/ConfirmationModal";
import Checkout from "./components/Checkout";
import { CartProvider, useCart } from "./context/CartContext";
import dataMock from "./data/restaurantes.json";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://ebac-fake-api.vercel.app/api/efood/restaurantes";

function useRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const json = await res.json();
        // Tenta normalizar possíveis formatos da API
        const normalized = Array.isArray(json) ? json : json.restaurantes || [];
        if (!cancelled) setRestaurants(normalized.map(normalizeRestaurant));
      } catch (err) {
        // Fallback para o mock local em caso de erro
        console.warn("Falha ao buscar API, usando mock local:", err?.message);
        if (!cancelled)
          setRestaurants(dataMock.restaurantes.map(normalizeRestaurant));
        if (!cancelled)
          setError(
            "Não foi possível carregar a API remota, usando dados locais."
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { restaurants, loading, error };
}

function normalizeRestaurant(r) {
  // Mapeia nomes de campos comuns para um formato padrão
  return {
    id: r.id,
    titulo: r.titulo || r.title || r.nome || r.name,
    tipo: r.tipo || r.categoria || r.type || "Restaurante",
    avaliacao: r.avaliacao || r.rating || 0,
    descricao: r.descricao || r.description || "",
    capa: r.capa || r.imagem || r.image || r.banner || "",
    cardapio: (r.cardapio || r.menu || r.itens || []).map((p) => ({
      id: p.id,
      nome: p.nome || p.name || p.titulo || p.title,
      descricao_curta: p.descricao_curta || p.shortDescription,
      descricao: p.descricao || p.description,
      preco: Number(p.preco ?? p.price ?? 0),
      porcao: p.porcao || p.serving || "",
      foto: p.foto || p.image || "",
    })),
  };
}

function Home({ onOpenRestaurant }) {
  const { restaurants, loading, error } = useRestaurants();
  return (
    <>
      <main className="container py-8">
        {error && (
          <div className="mb-4 rounded-xl bg-yellow-50 border border-yellow-200 p-3 text-yellow-800">
            {error}
          </div>
        )}
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
            {restaurants.map((r) => (
              <RestaurantCard key={r.id} r={r} onOpen={onOpenRestaurant} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

function RestaurantView({ restaurant, onBack, onOpenProduct, onAddProduct }) {
  return (
    <div>
      <section className="relative">
        <img
          src={restaurant.capa}
          alt={restaurant.titulo}
          className="h-56 w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container absolute inset-x-0 bottom-4 text-white flex items-end justify-between">
          <div>
            <span className="badge bg-white/20 text-white">
              {restaurant.tipo}
            </span>
            <h2 className="text-3xl font-bold mt-2">{restaurant.titulo}</h2>
            <p className="text-white/90 max-w-2xl">{restaurant.descricao}</p>
          </div>
          <button className="btn btn-outline bg-white/20" onClick={onBack}>
            Voltar
          </button>
        </div>
      </section>
      <main className="container py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {restaurant.cardapio.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
              onDetails={onOpenProduct}
              onAdd={onAddProduct}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function AppInner() {
  const [openCart, setOpenCart] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const { add, items } = useCart();
  const [confirmationProduct, setConfirmationProduct] = useState(null);

  const handleAddProduct = (product, qty = 1) => {
    const itemInCart = items.find((item) => item.id === product.id);
    if (itemInCart) {
      setConfirmationProduct(product);
    } else {
      add({ id: product.id, name: product.nome, price: product.preco, image: product.foto }, qty);
    }
  };

  const handleConfirmAdd = () => {
    if (confirmationProduct) {
      add({
        id: confirmationProduct.id,
        name: confirmationProduct.nome,
        price: confirmationProduct.preco,
        image: confirmationProduct.foto,
      }, 1);
    }
    setConfirmationProduct(null);
  };

  const handleCancelAdd = () => {
    setConfirmationProduct(null);
  };
  
  const handleOpenCart = () => {
    setOpenCheckout(false);
    setOpenCart(true);
  }

  const handleOpenCheckout = () => {
    setOpenCart(false);
    setOpenCheckout(true);
  }
  
  const handleCloseCheckout = () => {
    setOpenCheckout(false);
  }

  return (
    <div className="min-h-screen bg-rose-50">
      {!restaurant ? (
        <>
          <HeaderHome onOpenCart={handleOpenCart} />
          <Home onOpenRestaurant={setRestaurant} />
        </>
      ) : (
        <>
          <HeaderRestaurant
            onOpenCart={handleOpenCart}
            background={restaurant.capa}
          />
          <RestaurantView
            restaurant={restaurant}
            onBack={() => setRestaurant(null)}
            onOpenProduct={setModalProduct}
            onAddProduct={handleAddProduct}
          />
        </>
      )}
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAdd={handleAddProduct}
      />
      <CartDrawer 
        open={openCart} 
        onClose={() => setOpenCart(false)} 
        onCheckout={handleOpenCheckout}
      />
      <Checkout 
        open={openCheckout}
        onClose={handleCloseCheckout}
      />
      <Footer />
      <ConfirmationModal
        open={!!confirmationProduct}
        productName={confirmationProduct?.nome || ''}
        currentQuantity={
          items.find((item) => item.id === confirmationProduct?.id)?.qty || 0
        }
        onConfirm={handleConfirmAdd}
        onCancel={handleCancelAdd}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}

