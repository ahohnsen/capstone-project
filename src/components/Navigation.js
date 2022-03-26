import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import SearchInactive from '../images/SearchInactive.svg';
import SearchActive from '../images/SearchActive.svg';
import BookmarkActive from '../images/BookmarkActive.svg';
import BookmarkInactive from '../images/BookmarkInactive.svg';
import RequestInactive from '../images/RequestInactive.svg';
import RequestActive from '../images/RequestActive.svg';
import ProfileInactive from '../images/ProfileInactive.svg';
import ProfileActive from '../images/ProfileActive.svg';

export default function Navigation() {
  const { pathname } = useLocation();

  return (
    <StyledFooter>
      <Nav>
        <StyledLink to="/">
          <figure>
            <img
              src={pathname === '/' ? SearchActive : SearchInactive}
              alt="Search"
            />
            <Caption>Search</Caption>
          </figure>
        </StyledLink>
        <StyledLink to="/favorites">
          <figure>
            <img
              src={
                pathname === '/favorites' ? BookmarkActive : BookmarkInactive
              }
              alt="Favorites"
            />
            <Caption>Favorites</Caption>
          </figure>
        </StyledLink>
        <StyledLink to="/add-request">
          <figure>
            <img
              src={
                pathname === '/add-request' ? RequestActive : RequestInactive
              }
              alt="Request"
            />
            <Caption>Request</Caption>
          </figure>
        </StyledLink>
        <StyledLink to="/profile">
          <figure>
            <img
              src={pathname === 'profile' ? ProfileActive : ProfileInactive}
              alt="Profile"
            />
            <Caption>Profile</Caption>
          </figure>
        </StyledLink>
      </Nav>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100vw;
  background-color: var(--bg-color-section);
  box-shadow: 0 -1px 4px var(--color-boxshadow);
  z-index: 1;
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  max-width: 500px;
  margin: 0 auto;
`;

const StyledLink = styled(NavLink)`
  width: 100%;
  text-align: center;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 3px 0;
  color: var(--color-inactive);
  border-bottom: 3px solid var(--bg-color-section);
`;

const Caption = styled.figcaption`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1;
  color: var(--color-active);
`;
