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
} from "./styles";
import starIcon from "../../assets/image/star.png";

// Descrição completa como vista na imagem para o card "La Dolce Vita Trattoria"
const fullDescription =
  "A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!";

export default function RestaurantCard({ r, onOpen }) {
  return (
    <Card>
      {/* A imagem agora é renderizada no nível raiz do Card */}
      <Image src={r.capa} alt={r.titulo} />

      {/* As tags são colocadas em um container separado para posicionamento absoluto */}
      <TagsContainer>
        {r.destacado && <Tag>Destaque da semana</Tag>}
        <Tag>{r.tipo}</Tag>
      </TagsContainer>

      <Content>
        {/* Título e Nota agora estão dentro de uma TopRow para alinhamento */}
        <TopRow>
          <Title>{r.titulo}</Title>
          <Rating>
            <span>{r.avaliacao?.toFixed?.(1) ?? r.avaliacao}</span>
            <img src={starIcon} alt="Estrela" />
          </Rating>
        </TopRow>
        
        {/* Usamos a descrição completa para bater com a imagem */}
        <Description>{fullDescription}</Description>

        {/* O botão foi renomeado e não precisa mais de um wrapper */}
        <ReadMoreButton onClick={() => onOpen(r)}>Saiba mais</ReadMoreButton>
      </Content>
    </Card>
  );
}