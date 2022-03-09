import styled from 'styled-components';
import Button from './Button.js';

export default function DiveWish({ destination, notes, showDeleteDialog }) {
  return (
    <Wrapper>
      <Heading>{destination}</Heading>
      <Notes>{notes}</Notes>
      <Button onClick={showDeleteDialog}>Delete</Button>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: var(--bg-color-section);
  padding: 10px 15px 15px;
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
