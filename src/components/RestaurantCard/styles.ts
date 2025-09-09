// styles.ts
import styled from 'styled-components'

export const Card = styled.div`
  background-color: #fff;
  position: relative;
  color: #e66767;
  // border: 1px solid #e66767; // <--- REMOVA ESTA LINHA
`

export const TagsContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`

export const Tag = styled.span`
  background-color: #e66767;
  color: #ffebd9;
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
  border-left: 1px solid #e66767; // <--- ADICIONE ESTA LINHA
  border-right: 1px solid #e66767; // <--- ADICIONE ESTA LINHA
  border-bottom: 1px solid #e66767; // <--- ADICIONE ESTA LINHA
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
`

export const ReadMoreButton = styled.button`
  background-color: #e66767;
  color: #ffebd9;
  border: none;
  padding: 4px 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`