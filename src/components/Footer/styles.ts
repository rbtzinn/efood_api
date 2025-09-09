// src/components/Footer/styles.ts
import styled from 'styled-components'

export const FooterContainer = styled.footer`
  background-color: #fff8f2;
  padding: 40px 0;
  text-align: center;
`

export const LogoImage = styled.img`
  width: 125px;
  margin: 0 auto 32px;
`

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 80px;

  img {
    width: 24px;
    height: 24px;
  }
`

export const DisclaimerText = styled.p`
  color: #e66767;
  font-size: 10px;
  max-width: 480px;
  margin: 0 auto;
`