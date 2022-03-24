import styled from 'styled-components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button.js';

export default function RequestForm({
  formName,
  buttonName,
  preloadedValues,
  handlePost,
}) {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedValues
      ? {
          destination: preloadedValues.destination,
          description: preloadedValues.description,
        }
      : { destination: '', description: '' },
  });

  const dateToday = new Date().toISOString().substring(0, 10);
  const [startDate, setStartDate] = useState('');

  return (
    <Form aria-label={formName} onSubmit={handleSubmit(post => onSubmit(post))}>
      <Container>
        <Label htmlFor="destination">DESTINATION</Label>
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
      <div>
        <Container>
          <Label htmlFor="start-date"> DATES - START AND END</Label>
          <DateInput
            id="start-date"
            {...register('startDate', {
              required: 'A start date is required',
            })}
            type="date"
            min={dateToday}
            onChange={event => {
              setStartDate(event.target.value);
            }}
          />
          <Label htmlFor="end-date" className="sr-only">
            END DATE
          </Label>
          <DateInput
            id="end-date"
            {...register('endDate', { required: 'An end date is required' })}
            type="date"
            min={startDate}
          />
        </Container>
      </div>
      <Container>
        <Label htmlFor="description">DESCRIPTION</Label>
        <Textarea
          {...register('description', {
            required: ' A description is required.',
          })}
          id="description"
          onKeyUp={() => {
            trigger('description');
          }}
        />
      </Container>
      <Button type="submit">{buttonName}</Button>
      <ErrorMessage>
        <p>{errors.destination && errors.destination.message}</p>
        <p>{errors.description && errors.description.message}</p>
        <p>{errors.startDate && errors.startDate.message}</p>
        <p>{errors.endDate && errors.endDate.message}</p>
      </ErrorMessage>
    </Form>
  );

  function onSubmit(post) {
    handlePost({
      destination: post.destination,
      description: post.description,
      startDate: post.startDate,
      endDate: post.endDate,
    });
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

const DateInput = styled.input`
  padding: 2px;
  border: 0;
  width: 50%;
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
  font-size: 0.8rem;
`;
