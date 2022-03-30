import styled from 'styled-components';

const Button = styled.button`
  border: none;
  cursor: pointer;
`;
export default Button;

const DefaultButton = styled(Button)`
  margin: auto;
  padding: 10px;
  width: 90%;
  border-radius: 6px;
  background-color: var(--bg-color-action);
  box-shadow: 2px 2px 4px var(--color-boxshadow);
  color: var(--font-color-action);
  font-weight: 500;
  font-size: 1rem;
`;

export { DefaultButton };

const IconButton = styled(Button)`
  padding: 5px;
  background-color: transparent;
`;

export { IconButton };
