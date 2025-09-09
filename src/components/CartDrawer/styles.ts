import styled from "styled-components";

// Adicionando um objeto de cores para facilitar a manutenção
const cores = {
  rosa: '#E66767',
  creme: '#FFEBD9',
  brancofundo: '#FFF8F2'
}

export const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0,0,0,0.8); // Fundo mais escuro para dar destaque
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity 0.3s;
  display: flex;
  justify-content: flex-end;
`;

export const Aside = styled.aside<{ open: boolean }>`
  height: 100%;
  width: 100%;
  max-width: 360px; // Largura um pouco menor, como no design
  background: ${cores.rosa}; // Fundo principal do carrinho agora é rosa
  color: ${cores.creme}; // Cor padrão do texto é creme
  box-shadow: -2px 0 8px rgba(0,0,0,0.1);
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  padding: 32px 8px;
`;

// HeaderBar e Title não são mais necessários com o novo design
// O CloseButton será posicionado de forma absoluta

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const Footer = styled.footer`
  background: ${cores.rosa};
`;

export const EmptyText = styled.p`
  color: ${cores.creme};
  text-align: center;
`;

// Itens do carrinho com o novo estilo
export const CartItem = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  background: ${cores.creme}; // Fundo do item na cor creme
  color: ${cores.rosa}; 
  padding: 8px;
  margin-bottom: 16px;
  position: relative;
`;

export const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
`;

export const CartItemInfo = styled.div`
  flex: 1;
  h3 {
    font-weight: 900;
    font-size: 18px;
    margin-bottom: 4px; // Diminuído o espaçamento
  }

  p {
    font-size: 14px;
    margin-bottom: 8px; // Adicionado espaçamento
  }
`;

export const QuantityControl = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${cores.rosa};
  border-radius: 4px;
  
  button {
    background-color: transparent;
    border: none;
    color: ${cores.rosa};
    font-weight: bold;
    cursor: pointer;
    padding: 2px 8px;
    font-size: 16px;
  }

  span {
    padding: 0 8px;
    font-size: 14px;
    font-weight: bold;
  }
`;

// O lixo (RemoveButton) será posicionado de forma absoluta
export const RemoveButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }
`;

// Botões com o novo estilo
export const PrimaryButton = styled.button<{ disabled?: boolean }>`
  width: 100%; // Ocupa a largura total
  padding: 4px 0;
  border-radius: 4px;
  background: ${cores.creme};
  color: ${cores.rosa};
  font-weight: bold;
  border: none;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  &:hover {
    background: #fdf7f0;
  }
`;

// Novo componente para a linha do valor total
export const TotalValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${cores.creme};
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 16px;
`;

// Estilos para os formulários de entrega e pagamento
export const InputGroup = styled.div`
  margin-bottom: 8px;

  label {
    font-size: 14px;
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
  }

  input {
    background-color: ${cores.creme};
    border: 1px solid ${cores.creme};
    height: 32px;
    padding: 0 8px;
    width: 100%;
    
    &.error {
      border: 1px solid red;
    }
  }
`

export const Row = styled.div`
  display: flex;
  gap: 34px;
`

export const ButtonGroup = styled.div`
  margin-top: 24px;
`