import styled from 'styled-components';

export default function Button({ handleClick, children }) {
  return <StyledButton onClick={handleClick}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  width: 90%;
  margin: auto;
  padding: 10px;
  background-color: var(--bg-color-button);
  color: var(--font-color-action);
  border: none;
  border-radius: 6px;
  box-shadow: 2px 2px 4px var(--color-boxshadow);
  font-weight: 500;
  font-size: 1rem;
`;
