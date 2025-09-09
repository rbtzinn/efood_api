import styled from 'styled-components'

// Cores do Design System
const cores = {
  rosa: '#E66767',
  creme: '#FFEBD9'
}

// O Card agora tem a cor de fundo rosa e é um container flex
export const Card = styled.div`
  background-color: ${cores.rosa};
  color: ${cores.creme};
  padding: 8px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: scale(1.02); /* Efeito opcional para melhorar a interatividade */
    transition: transform 0.2s ease-in-out;
  }
`

// A imagem permanece quase igual, apenas ajustamos o border-radius
export const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
`

// O título agora não precisa de margem superior, o container pai cuida disso
export const Title = styled.h4`
  margin-top: 8px;
  font-weight: 900; /* Mais forte para destacar */
  font-size: 1rem; /* 16px */
`

// A descrição também ajustada para o novo layout
export const Description = styled.p`
  font-size: 0.875rem; /* 14px */
  line-height: 22px;
  margin-top: 8px;
  margin-bottom: 8px;
  flex-grow: 1; /* Faz a descrição ocupar o espaço disponível, empurrando o botão para baixo */
`

// O componente Actions foi removido, pois teremos apenas um botão

// O OutlineButton foi removido

// O PrimaryButton foi completamente reestilizado para ser o botão principal
export const PrimaryButton = styled.button`
  background-color: ${cores.creme};
  color: ${cores.rosa};
  padding: 4px;
  border-radius: 8px;
  font-weight: bold;
  width: 100%;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #fcf3eb;
  }
`