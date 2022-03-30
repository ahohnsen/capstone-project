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
`;
const SearchIcon = styled.img`
  position: absolute;
  top: 7px;
  left: 20px;
`;

const Input = styled.input`
  width: 90%;
  margin: 0 20px;
  padding: 0 2px 2px 30px;
  font-size: 1.2rem;
  font-weight: 300;
  border: none;
  border-bottom: 1px solid white;
  background-color: transparent;
  color: var(--font-color-action);

  ::placeholder {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;
