import React from "react";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/image/logo.png";
import { HeaderWrapper, Container, Logo, Nav, CartButton } from "./styles";

type Props = { onOpenCart: () => void };

export default function HeaderRestaurant({ onOpenCart }: Props) {
  const { items } = useCart();
  const count = items.reduce((t, i) => t + i.qty, 0);

  return (
    <HeaderWrapper>
      <Container>
        <Nav>
          <a href="/">Restaurantes</a>
        </Nav>
        <Logo src={logo} alt="efood logo" />
        <CartButton onClick={onOpenCart}>
          {count} produto(s) no carrinho
        </CartButton>
      </Container>
    </HeaderWrapper>
  );
}
