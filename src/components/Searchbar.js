import styled from 'styled-components';
import MagnifyingGlass from '../images/MagnifyingGlass.svg';

export default function Searchbar({ searchValue, onHandleSearchValue }) {
  return (
    <SearchbarContainer>
      <label htmlFor="searchInput" className="sr-only">
        Search
      </label>
      <SearchIcon
        src={MagnifyingGlass}
        alt="magnifying glass"
        width="20"
        height="20"
      />
      <Input
        type="text"
        id="searchInput"
        name="searchInput"
        maxLength={25}
        placeholder="Search"
        value={searchValue}
        onChange={onHandleSearchValue}
      />
    </SearchbarContainer>
  );
}

const SearchbarContainer = styled.div`
  position: relative;
  padding: 10px 20px;
  width: 100%;
  background-color: var(--bg-color-header);
`;

const Input = styled.input`
  padding: 0 2px 2px 35px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  font-size: 1.2rem;
  font-weight: 300;
  color: var(--font-color-action);

  ::placeholder {
    color: var(--font-color-action);
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 14px;
  left: 25px;
`;
