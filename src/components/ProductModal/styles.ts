import styled from "styled-components";

// Cores do Design System
const cores = {
  rosa: '#E66767',
  creme: '#FFEBD9'
}

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;

  .backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.8); // Escureci um pouco o fundo
  }
`;

// O ModalWrapper agora é branco e um container grid
export const ModalWrapper = styled.div`
  position: relative;
  background: ${cores.rosa};
  max-width: 1024px;
  width: 100%;
  margin: 0 16px;
  z-index: 1;

  display: grid;
  grid-template-columns: 280px auto; // Coluna da imagem com tamanho fixo
  gap: 24px;
  padding: 32px;
`;

// Botão de fechar agora fica no canto do modal branco
export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
  
  img {
    width: 16px;
    height: 16px;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
`;

// O Content agora é o painel rosa
export const Content = styled.div`
  color: ${cores.creme}; // Cor do texto padrão é creme
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 1.125rem; // 18px
  font-weight: 900;
`;

export const Description = styled.p`
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 0.875rem; // 14px
  line-height: 22px;
  flex-grow: 1; // Empurra o conteúdo para baixo
`;

export const Portion = styled.p`
  margin-top: 16px;
  font-size: 0.875rem; // 14px
`;

// Removido o QuantityWrapper pois o controle será mais simples
// e não precisa de um container extra

export const AddButton = styled.button`
  background: ${cores.creme};
  color: ${cores.rosa};
  font-weight: bold;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  width: auto; /* Largura automática */
  display: inline-block; /* Para ter largura automática */
  margin-top: 16px;

  &:hover {
    background: #fcf3eb;
  }
`;