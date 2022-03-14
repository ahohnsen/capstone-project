import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Button from './Button.js';

export default function DiveWishForm({
  formName,
  buttonName,
  preloadedValues,
  handleDiveWish,
}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedValues
      ? preloadedValues
      : { destination: '', notes: '' },
  });

  return (
    <Form aria-label={formName} onSubmit={handleSubmit(wish => onSubmit(wish))}>
      <Container>
        <Label htmlFor="destination">DESTINATION </Label>
        <Input
          {...register('destination', {
            required: 'A destination is required.',
            maxLength: {
              value: 25,
              message: 'The name of the destination is too long.',
            },
          })}
          id="destination"
          onKeyUp={() => {
            trigger('destination');
          }}
        />
      </Container>
      <Container>
        <Label htmlFor="notes">NOTES</Label>
        <Textarea
          {...register('notes', { required: ' Notes are required.' })}
          id="notes"
          onKeyUp={() => {
            trigger('notes');
          }}
        />
      </Container>
      <Button type="submit">{buttonName}</Button>
      <ErrorMessage>
        <p>{errors.destination && errors.destination.message}</p>
        <p>{errors.notes && errors.notes.message}</p>
      </ErrorMessage>
    </Form>
  );

  function onSubmit(wish) {
    handleDiveWish({
      destination: wish.destination,
      notes: wish.notes,
    });
    navigate('/');
  }
}

const Form = styled.form`
  display: grid;
  gap: 25px;
  padding: 0 15px;
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
  border-radius: 4px;
  background-color: var(--bg-color-section);
  box-shadow: 1px 1px 4px var(--color-boxshadow);
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 2px;
  border: 0;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-size: 0.7rem;
`;
