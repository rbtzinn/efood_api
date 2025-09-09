import React from 'react';
import { money } from '../../utils';
import { Produto } from '../../types/api';
import closeIcon from '../../assets/image/close.png';

import {
  Overlay,
  ModalWrapper,
  ProductImage,
  Content,
  Title,
  Description,
  Portion,
  AddButton,
  CloseButton
} from './styles';

type Props = {
  product: Produto | null;
  onClose: () => void;
  onAdd: (product: Produto, qty?: number) => void; // Recebe onAdd do pai
};

export default function ProductModal({ product, onClose, onAdd }: Props) {
  if (!product) return null;

  const handleAddToCart = () => {
    onAdd(product, 1); // Chama onAdd com o produto, o App.jsx vai lidar com a confirmação
    onClose();
  };

  return (
    <Overlay>
      <div className="backdrop" onClick={onClose} />
      <ModalWrapper>
        <CloseButton onClick={onClose}>
          <img src={closeIcon} alt="Fechar" />
        </CloseButton>
        <ProductImage src={product.foto} alt={product.nome} />
        <Content>
          <Title>{product.nome}</Title>
          <Description>{product.descricao}</Description>
          {product.porcao && <Portion>Serve: {product.porcao}</Portion>}
          <AddButton onClick={handleAddToCart}>
            Adicionar ao carrinho - {money(product.preco)}
          </AddButton>
        </Content>
      </ModalWrapper>
    </Overlay>
  );
}