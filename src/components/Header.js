import styled from 'styled-components';

export default function Header({ children }) {
  return (
    <StyledHeader>
      <Heading>{children}</Heading>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  width: 100vw;
  padding: 10px 0;
  background-color: var(--bg-color-header);
`;
const Heading = styled.h1`
  position: relative;
  width: 100vw;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  color: var(--font-color-header);
  font-size: 1.3rem;
  font-weight: 400;
`;
