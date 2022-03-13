import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import Header from '../Header.js';
import Content from '../Content.js';
import Button from '../Button.js';
import IconButton from '../IconButton.js';
import AbortIcon from '../images/Abort.svg';

export default function AddWishPage({ onAddDiveWish, diveWishToEdit }) {
  const navigate = useNavigate();
  const { status } = useParams();
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { destination: '', notes: '' },
  });

  useEffect(() => {
    if (status === 'new') {
      reset({ destination: '', notes: '' });
    } else {
      reset(diveWishToEdit);
    }
  }, [diveWishToEdit, reset, status]);

  return (
    <>
      <Header>
        {status === 'edit' ? (
          <>
            <AbortButton onClick={() => navigate(-1)}>
              <img src={AbortIcon} alt="abort editing" />
            </AbortButton>
            Edit dive destination
          </>
        ) : (
          'Where do you want to dive?'
        )}
      </Header>

      <Content>
        <Form
          aria-label="Add a dive destination to your wishlist"
          onSubmit={handleSubmit(wish => onSubmit(wish))}
        >
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
          <Button type="submit">
            {status === 'edit' ? 'Save changes' : 'Add to list'}
          </Button>
          <ErrorMessage>
            <p>{errors.destination && errors.destination.message}</p>
            <p>{errors.notes && errors.notes.message}</p>
          </ErrorMessage>
        </Form>
      </Content>
    </>
  );

  function onSubmit(wish) {
    if (diveWishToEdit) {
      onAddDiveWish({
        id: diveWishToEdit.id,
        destination: wish.destination,
        notes: wish.notes,
      });
    } else {
      onAddDiveWish({
        id: nanoid(),
        destination: wish.destination,
        notes: wish.notes,
      });
    }
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

const AbortButton = styled(IconButton)`
  top: 10px;
  left: 20px;
`;
