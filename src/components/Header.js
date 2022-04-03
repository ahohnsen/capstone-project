import styled from 'styled-components';

export default function Header({ children }) {
  return <Heading>{children}</Heading>;
}

const Heading = styled.h1`
  position: relative;
  padding: 10px 0;
  margin: 0 auto;
  width: 100%;
  background-color: var(--bg-color-header);
  text-align: center;
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--font-color-header);
`;
