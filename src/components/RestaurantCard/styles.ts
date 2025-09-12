import styled from 'styled-components'
import { Link } from 'react-router-dom'

const cores = {
  rosa: '#E66767',
  creme: '#FFEBD9'
}

export const Card = styled.div`
  background-color: #fff;
  position: relative;
  color: ${cores.rosa};
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const TagsContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`

export const Tag = styled.span`
  background-color: ${cores.rosa};
  color: ${cores.creme};
  font-size: 12px;
  font-weight: bold;
  padding: 6px 10px;
  display: inline-block;
`

export const Image = styled.img`
  width: 100%;
  height: 217px;
  object-fit: cover;
  display: block;
`

export const Content = styled.div`
  padding: 8px;
  border-left: 1px solid ${cores.rosa};
  border-right: 1px solid ${cores.rosa};
  border-bottom: 1px solid ${cores.rosa};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: ${cores.rosa};
`

export const Rating = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  gap: 8px;

  img {
    width: 20px;
    height: 20px;
  }
`

export const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
  flex-grow: 1;
  color: ${cores.rosa};
`

export const ReadMoreButton = styled(Link)`
  background-color: ${cores.rosa};
  color: ${cores.creme};
  border: none;
  padding: 4px 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  width: max-content;
  text-decoration: none; // 3. Adicione isso para remover o sublinhado padrão do link
`

