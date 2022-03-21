import styled from 'styled-components';
import Button from './Button.js';

export default function DeleteDialog({
  onConfirmDeleteWish,
  onCancelDeleteWish,
}) {
  return (
    <Dialog>
      Do you really want to delete this item from your wishlist?
      <Wrapper>
        <Button onClick={onConfirmDeleteWish}>Yes, delete</Button>
        <Button onClick={onCancelDeleteWish}>Cancel</Button>
      </Wrapper>
    </Dialog>
  );
}

const Dialog = styled.div`
  width: 300px;
  height: 160px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -80px;
  margin-left: -150px;
  padding: 20px;
  background-color: var(--bg-color-section);
  border-radius: 4px;
  box-shadow: 0 0 6px var(--color-boxshadow);
  text-align: center;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 15px;
  padding-top: 25px;
`;
