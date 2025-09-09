import styled from "styled-components";
import bgPattern from "../../assets/image/bg-pattern.png";

// O HeaderWrapper agora tem a cor de fundo e a imagem de pattern repetida.
// O padding foi ajustado para dar mais espaço vertical.
export const HeaderWrapper = styled.header`
  background-color: #fff8f2;
  background-image: url(${bgPattern});
  text-align: center;
  padding: 40px 0;
`;

// O Container foi removido, pois `text-align: center` no HeaderWrapper
// já centraliza o logo. Adicionamos um componente LogoWrapper para criar
// a caixa com borda ao redor da imagem.
export const LogoWrapper = styled.div`
  display: inline-block;
  padding: 8px;
`;

// O componente Logo (a tag <img>) agora não precisa de um container
// flex para ser centralizado. Ajustamos sua altura.
export const Logo = styled.img`
  height: 58px;
  display: block;
`;

// O HeroContent tem sua margem superior drasticamente aumentada
// para criar o espaçamento vertical visto na imagem.
export const HeroContent = styled.div`
  margin-top: 138.5px;
`;

// O h1 foi estilizado para ter o tamanho, peso da fonte e cor exatos.
// Adicionamos um `max-width` para forçar a quebra de linha no lugar certo
// e margens automáticas para mantê-lo centralizado.
export const Title = styled.h1`
  font-size: 36px;
  font-weight: 900; 
  color: #e66767;
  max-width: 580px;
  margin: 0 auto;
  line-height: 42px;
`;