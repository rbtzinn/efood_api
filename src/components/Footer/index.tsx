// src/components/Footer/index.tsx
import React from 'react'
import logo from '../../assets/image/logo.png'
import insta from '../../assets/image/insta.png'
import twitter from '../../assets/image/twitter.png'
import face from '../../assets/image/facebook.png'
import {
  DisclaimerText,
  FooterContainer,
  LogoImage,
  SocialLinks
} from './styles'

const Footer = () => (
  <FooterContainer>
    <LogoImage src={logo} alt="efood logo" />
    <SocialLinks>
      <a href="#" aria-label="Instagram">
        <img src={insta} alt="Instagram" />
      </a>
      <a href="#" aria-label="Facebook">
        <img src={face} alt="Facebook" />
      </a>
      <a href="#" aria-label="Twitter">
        <img src={twitter} alt="Twitter" />
      </a>
    </SocialLinks>
    <DisclaimerText>
      A efood é uma plataforma para divulgação de estabelecimentos, a
      responsabilidade pela entrega, qualidade dos produtos é toda do
      estabelecimento contratado.
    </DisclaimerText>
  </FooterContainer>
)

export default Footer