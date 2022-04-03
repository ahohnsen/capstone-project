import styled from 'styled-components';

export default function Message({ children }) {
  return <StyledMessage>{children}</StyledMessage>;
}

const StyledMessage = styled.span`
  display: inline-block;
  text-align: center;
  padding: 0 15px;
`;
