import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <StyledFooter>
      <Nav>
        <StyledLink to="/">WISHLIST</StyledLink>
        <StyledLink to="/favorites">FAVORITES</StyledLink>
        <StyledLink to="/add-wish">ADD WISH</StyledLink>
      </Nav>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100vw;
  background-color: var(--bg-color-section);
  box-shadow: 0px -1px 4px var(--color-boxshadow);
  padding-bottom: 4px;
  z-index: 1;
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  width: 360px;
  margin: 0 auto;
`;

const StyledLink = styled(NavLink)`
  width: 100%;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 0;
  color: var(--color-inactive);
  border-bottom: 3px solid var(--bg-color-section);

  &.active {
    color: var(--color-active);
    border-bottom: 3px solid var(--color-active);
  }
`;
