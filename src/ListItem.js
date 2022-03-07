import styled from 'styled-components';

export default function ListItem({ destination, notes }) {
  return (
    <Wrapper>
      <Heading>{destination}</Heading>
      <Notes>{notes}</Notes>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: var(--bg-color-section);
  padding: 10px 15px 15px 15px;
  max-width: 400px;
`;

const Heading = styled.h2`
  font-size: 1.2rem;
  color: var(--font-color-heading);
`;

const Notes = styled.p`
  padding-top: 10px;
  color: var(--font-color-content);
`;
