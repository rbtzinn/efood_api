import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Restaurant from '../pages/Restaurant'
import { Produto } from '../types'

// As rotas recebem as funções para abrir o carrinho e o modal de produto
// para passá-las adiante para as páginas corretas.
type Props = {
  onOpenCart: () => void;
  onOpenProduct: (product: Produto) => void;
}

const Rotas = ({ onOpenCart, onOpenProduct }: Props) => (
  <Routes>
    <Route path="/" element={<Home onOpenCart={onOpenCart} />} />
    <Route
      path="/restaurante/:id"
      element={<Restaurant onOpenCart={onOpenCart} onOpenProduct={onOpenProduct} />}
    />
  </Routes>
)

export default Rotas
