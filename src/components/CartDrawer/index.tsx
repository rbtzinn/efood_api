import React from "react";
import { useCart } from "../../context/CartContext";
import { money } from "../../utils";
import trashIcon from '../../assets/image/trash.png'; 

import {
  Overlay,
  Aside,
  Body,
  Footer,
  EmptyText,
  CartItem,
  CartItemImage,
  CartItemInfo,
  RemoveButton,
  PrimaryButton,
  TotalValue,
  QuantityControl
} from "./styles"; // Supondo que os estilos de CartDrawer já existem

type Props = {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void; // Nova prop para iniciar o checkout
};

export default function CartDrawer({ open, onClose, onCheckout }: Props) {
  const { items, remove, total, inc, dec } = useCart();

  return (
    <Overlay open={open} onClick={onClose}>
      <Aside open={open} onClick={(e) => e.stopPropagation()}>
        <Body>
          {items.length === 0 ? (
            <EmptyText>
              O carrinho está vazio. Adicione pelo menos um produto para continuar com a compra.
            </EmptyText>
          ) : (
            items.map((i) => (
              <CartItem key={i.id}>
                <CartItemImage src={i.image} alt={i.name} />
                <CartItemInfo>
                  <h3>{i.name}</h3>
                  <p>{money(i.price)}</p>
                  <QuantityControl>
                    <button onClick={() => dec(i.id)}>-</button>
                    <span>{i.qty}</span>
                    <button onClick={() => inc(i.id)}>+</button>
                  </QuantityControl>
                </CartItemInfo>
                <RemoveButton onClick={() => remove(i.id)}>
                  <img src={trashIcon} alt="Remover" />
                </RemoveButton>
              </CartItem>
            ))
          )}
        </Body>

        {items.length > 0 && (
          <Footer>
            <TotalValue>
              <span>Valor total</span>
              <span>{money(total)}</span>
            </TotalValue>
            <PrimaryButton onClick={onCheckout}>
              Continuar com a entrega
            </PrimaryButton>
          </Footer>
        )}
      </Aside>
    </Overlay>
  );
}
