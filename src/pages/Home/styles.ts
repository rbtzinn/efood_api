import styled from 'styled-components'

export const RestaurantListContainer = styled.section`
  padding: 80px 0; // Adiciona um bom espaçamento do header e do footer
`

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; // Cria a grade de 2 colunas
  gap: 48px 80px; // Define o espaçamento: 48px vertical, 80px horizontal

  // Adaptação para telas menores (celular)
  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Fica com 1 coluna em telas pequenas
    gap: 48px;
  }
`
