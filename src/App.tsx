import { useState } from "react";
import Footer from "./components/Footer";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import ConfirmationModal from "./components/ConfirmationModal";
import Checkout from "./components/Checkout";
import { CartProvider, useCart } from "./context/CartContext";
import Rotas from "./routes";
import { Produto } from "./types";

// AppInner gerencia os componentes globais (modais, drawers)
function AppInner() {
  const [openCart, setOpenCart] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [modalProduct, setModalProduct] = useState<Produto | null>(null);
  const { add, items } = useCart();
  const [confirmationProduct, setConfirmationProduct] = useState<Produto | null>(null);

  const handleAddProduct = (product: Produto, qty = 1) => {
    const itemInCart = items.find((item) => item.id === product.id);
    if (itemInCart) {
      setConfirmationProduct(product);
    } else {
      add({ id: product.id, name: product.nome, price: product.preco, image: product.foto }, qty);
      setOpenCart(true);
    }
  };

  const handleConfirmAdd = () => {
    if (confirmationProduct) {
      add({ id: confirmationProduct.id, name: confirmationProduct.nome, price: confirmationProduct.preco, image: confirmationProduct.foto }, 1);
      setOpenCart(true);
    }
    setConfirmationProduct(null);
  };

  const handleCancelAdd = () => {
    setConfirmationProduct(null);
  };

  const handleOpenCart = () => {
    setOpenCheckout(false);
    setOpenCart(true);
  };

  const handleOpenCheckout = () => {
    setOpenCart(false);
    setOpenCheckout(true);
  };

  return (
    <div className="min-h-screen">
      <Rotas onOpenCart={handleOpenCart} onOpenProduct={setModalProduct} />
      
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
        onClose={() => setOpenCheckout(false)}
      />
      <Footer />
      <ConfirmationModal
        open={!!confirmationProduct}
        productName={confirmationProduct?.nome || ''}
        currentQuantity={items.find((item) => item.id === confirmationProduct?.id)?.qty || 0}
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
