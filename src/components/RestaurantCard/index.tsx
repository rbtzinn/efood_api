import { RestaurantType } from '../../types'
import {
  Card,
  Image,
  Content,
  Tag,
  TagsContainer,
  Rating,
  TopRow,
  Title,
  Description,
  ReadMoreButton,
} from './styles'
import starIcon from '../../assets/image/star.png'

type Props = {
  r: RestaurantType
}

const getShortDescription = (text: string) => {
  if (text.length > 200) {
    return text.slice(0, 197) + '...'
  }
  return text
}

export default function RestaurantCard({ r }: Props) {
  return (
    <Card>
      <Image src={r.capa} alt={r.titulo} />

      <TagsContainer>
        {r.destacado && <Tag>Destaque da semana</Tag>}
        <Tag>{r.tipo}</Tag>
      </TagsContainer>

      <Content>
        <TopRow>
          <Title>{r.titulo}</Title>
          <Rating>
            <span>{r.avaliacao}</span>
            <img src={starIcon} alt="Estrela" />
          </Rating>
        </TopRow>
        
        <Description>{getShortDescription(r.descricao)}</Description>
        <ReadMoreButton to={`/restaurante/${r.id}`}>
          Saiba mais
        </ReadMoreButton>
      </Content>
    </Card>
  )
}