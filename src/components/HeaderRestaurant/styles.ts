import styled from "styled-components";
import bgPattern from "../../assets/image/bg-pattern.png";

export const HeaderWrapper = styled.header`
  background: url(${bgPattern}) center/cover no-repeat;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Nav = styled.nav`
  a {
    color: #e63946;
    font-weight: 600;
    text-decoration: none;
  }
`;

export const Logo = styled.img`
  height: 40px;
`;

export const CartButton = styled.button`
  background: transparent;
  font-weight: 600;
  color: #e63946;
`;
