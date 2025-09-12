export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  porcao: string;
  foto: string;
}

export interface RestaurantType {
  id: number;
  titulo: string;
  tipo: string;
  avaliacao: number;
  descricao: string;
  capa: string;
  cardapio: Produto[];
}

// Para os itens no carrinho
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
}
