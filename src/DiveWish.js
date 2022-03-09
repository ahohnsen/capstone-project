import styled from 'styled-components';
import Button from './Button.js';
import DeleteIcon from './images/DeleteIcon.svg';

export default function DiveWish({ destination, notes, showDeleteDialog }) {
  return (
    <Wrapper>
      <Heading>{destination}</Heading>
      <Notes>{notes}</Notes>
      <DeleteButton onClick={showDeleteDialog}>
        <img src={DeleteIcon} alt="Delete" />
      </DeleteButton>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: var(--bg-color-section);
  padding: 10px 15px 15px;
  position: relative;
`;

const Heading = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--font-color-heading);
`;

const Notes = styled.p`
  padding-top: 10px;
  color: var(--font-color-content);
`;

const DeleteButton = styled.button`
  border: none;
  background-color: var(--bg-color-section);
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
