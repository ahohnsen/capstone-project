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
            src={pathname === '/favorites' ? BookmarkActive : BookmarkInactive}
            alt="Favorites"
          />
          <Caption>Favorites</Caption>
        </figure>
      </StyledLink>
      <StyledLink to="/add-request">
        <figure>
          <img
            src={pathname === '/add-request' ? RequestActive : RequestInactive}
            alt="Request"
          />
          <Caption>Request</Caption>
        </figure>
      </StyledLink>
      <StyledLink to="/profile/own-profile">
        <figure>
          <img
            src={
              pathname === '/profile/own-profile'
                ? ProfileActive
                : ProfileInactive
            }
            alt="Profile"
          />
          <Caption>Profile</Caption>
        </figure>
      </StyledLink>
    </Nav>
  );
}

const Nav = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  background-color: var(--bg-color-section);
  box-shadow: 0 -1px 4px var(--color-boxshadow);
  z-index: 1;
`;

const StyledLink = styled(NavLink)`
  padding: 3px 0;
  width: 100%;
  border-bottom: 3px solid var(--bg-color-section);
  text-align: center;
  text-decoration: none;
`;

const Caption = styled.figcaption`
  line-height: 1;
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-active);
`;
