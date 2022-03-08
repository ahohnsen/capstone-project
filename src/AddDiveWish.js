import styled from 'styled-components';
import Button from './Button.js';

export default function AddDiveWish({ onAddDiveWish }) {
  return (
    <Form
      aria-label="Add a dive destination to your wishlist"
      onSubmit={handleSubmit}
    >
      <Container>
        <Label htmlFor="destination">DESTINATION </Label>
        <Input id="destination" name="destination" maxlength="25" required />
      </Container>
      <Container>
        <Label htmlFor="notes">NOTES</Label>
        <Textarea id="notes" name="notes" required />
      </Container>
      <Button type="submit">Add to list</Button>
    </Form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const { destination, notes } = form.elements;
    onAddDiveWish({ destination: destination.value, notes: notes.value });
    destination.value = '';
    notes.value = '';
  }
}

const Form = styled.form`
  display: grid;
  gap: 20px;
  margin: 30px 0 20px;
`;

const Label = styled.label`
  position: absolute;
  top: -13px;
  left: 15px;
  color: var(--font-color-label);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 2px;
  border: 0;
`;
const Container = styled.div`
  position: relative;
  padding: 10px;
  background-color: var(--bg-color-section);
  box-shadow: 1px 1px 4px var(--color-boxshadow);
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 2px;
  border: 0;
`;
