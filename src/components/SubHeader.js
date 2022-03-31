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
  background-color: var(--bg-color-section);
`;

const SearchCategory = styled.button`
  padding: 10px 5px;
  width: 50%;
  border: none;
  border-bottom: ${props =>
    props.isActive ? '1px solid var(--color-inactive)' : '1px solid white'};
  background-color: transparent;
  font-size: 1rem;
  color: ${props => (props.isActive ? '#011F26' : '#848588')};
  cursor: pointer;
`;
