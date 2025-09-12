import styled from 'styled-components'

// Novo componente de estilo para o banner
export const HeroBanner = styled.section`
  position: relative; // Adicionado: Essencial para o posicionamento dos filhos
  height: 280px;
  width: 100%;
  color: #fff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); // Overlay escuro
  }

  .container {
    position: absolute; // Adicionado: Para posicionar o container dos textos sobre a imagem
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 24px;
    padding-bottom: 32px;
  }

  h2 {
    font-size: 32px;
    font-weight: 900;
  }

  p {
    font-size: 32px;
    font-weight: 100;
  }
`

export const ProductListContainer = styled.main`
  padding: 56px 0;
`

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

