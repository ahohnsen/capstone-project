import styled from 'styled-components';

export default function SubHeader({ searchCategory, onSwitchSearchCategory }) {
  return (
    <Container>
      <SearchCategory
        isActive={searchCategory === 'destination'}
        onClick={() => onSwitchSearchCategory('destination')}
      >
        DESTINATION
      </SearchCategory>
      <SearchCategory
        isActive={searchCategory === 'buddies'}
        onClick={() => onSwitchSearchCategory('buddies')}
      >
        BUDDIES
      </SearchCategory>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: var(--bg-color-section);
  box-shadow: 0px 4px 4px var(--color-boxshadow);
  position: fixed;
  top: 55px;
  z-index: 1;
`;

const SearchCategory = styled.button`
  width: 50%;
  padding: 10px 5px;
  background-color: transparent;
  border: none;
  border-bottom: ${props =>
    props.isActive ? '1px solid var(--color-inactive)' : '1px solid white'};
  font-size: 1rem;
  color: ${props => (props.isActive ? '#011F26' : '#848588')};
  cursor: pointer;
`;
