import React from 'react';
import { Produto } from '../../types/api';
import {
  Card,
  Image,
  Title,
  Description,
  PrimaryButton
} from './styles';

type Props = {
  p: Produto;
  onAdd: (p: Produto) => void; // Apenas chama onAdd
  onDetails: (p: Produto) => void;
};

export default function ProductCard({ p, onAdd, onDetails }: Props) {
  const getShortDescription = (text: string) => {
    if (text.length > 95) {
      return text.slice(0, 92) + '...';
    }
    return text;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd(p); // Apenas chama a função, o App.jsx vai lidar com a confirmação
  };

  return (
    <Card onClick={() => onDetails(p)}>
      <Image src={p.foto} alt={p.nome} />
      <Title>{p.nome}</Title>
      <Description>{getShortDescription(p.descricao)}</Description>
      <PrimaryButton onClick={handleAddToCart}>
        Adicionar ao carrinho
      </PrimaryButton>
    </Card>
  );
}