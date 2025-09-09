export type Produto = {
  id: number;
  nome: string;
  descricao_curta?: string;
  descricao: string;
  preco: number;
  porcao?: string;
  foto: string;
};

export type Restaurante = {
  id: number;
  titulo: string;
  tipo: string;
  avaliacao: number;
  descricao: string;
  capa: string;
  cardapio: Produto[];
};
