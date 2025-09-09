import logo from "../../assets/image/logo.png";
import { HeaderWrapper, LogoWrapper, Logo, HeroContent, Title } from "./styles";

export default function HeaderHome() {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Logo src={logo} alt="efood logo" />
      </LogoWrapper>
      <HeroContent>
        <Title>Viva experiências gastronômicas no conforto da sua casa</Title>
      </HeroContent>
    </HeaderWrapper>
  );
}