import styled from 'styled-components';
import { DefaultButton } from './Button.js';

export default function DeleteDialog({
  onConfirmDeletePost,
  onCancelDeletePost,
}) {
  return (
    <Dialog>
      Do you really want to delete this post?
      <Wrapper>
        <DefaultButton onClick={onConfirmDeletePost}>Yes, delete</DefaultButton>
        <DefaultButton onClick={onCancelDeletePost}>Cancel</DefaultButton>
      </Wrapper>
    </Dialog>
  );
}

const Dialog = styled.div`
  display: grid;
  gap: 25px;
  padding: 20px;
  width: 300px;
  height: fit-content;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  background-color: var(--bg-color-section);
  box-shadow: 0 0 6px var(--color-boxshadow);
  text-align: center;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 15px;
`;
