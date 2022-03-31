import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './MapboxGeocoderStyles.css';
import { DefaultButton, IconButton } from './Button.js';
import DeleteIcon from '../images/DeleteIcon.svg';

export default function RequestForm({
  formName,
  buttonName,
  preloadedValues,
  handlePost,
}) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN;

  const [geocoderDestination, setGeocoderDestination] = useState(
    preloadedValues?.destination ? preloadedValues?.destination : null
  );
  const [startDate, setStartDate] = useState(
    preloadedValues?.startDate ? preloadedValues?.startDate : ''
  );
  const [endDate, setEndDate] = useState(
    preloadedValues?.endDate ? preloadedValues?.endDate : ''
  );
  const dateToday = new Date().toISOString().substring(0, 10);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: preloadedValues
      ? {
          startDate: new Date(preloadedValues.startDate)
            .toISOString()
            .split('T')[0],
          endDate: new Date(preloadedValues.endDate)
            .toISOString()
            .split('T')[0],
          description: preloadedValues.description,
        }
      : {
          startDate: '',
          endDate: '',
          description: '',
        },
  });

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: 'country,region,place',
      limit: 5,
      clearOnBlur: true,
    });

    geocoder.addTo('#geocoderdestination');

    geocoder.on('result', e => {
      setGeocoderDestination(e.result.place_name);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Form
        aria-label={formName}
        onSubmit={handleSubmit(post => onSubmit(post))}
      >
        <RequiredNote>Please note that all fields are required.</RequiredNote>
        <Container>
          <Label htmlFor="destination">DESTINATION</Label>
          <DeleteButton
            type="button"
            onClick={() => setGeocoderDestination(null)}
            hidden={!geocoderDestination}
          >
            <img src={DeleteIcon} alt="delete destination" />
          </DeleteButton>
          {geocoderDestination && (
            <Input
              id="destination"
              readonly
              disabled
              value={geocoderDestination ? geocoderDestination : ''}
            />
          )}
          <div id={'geocoderdestination'} hidden={geocoderDestination} />
        </Container>
        <div>
          <Container>
            <Label htmlFor="startDate"> DATES - START AND END</Label>
            <DateInputStart
              id="startDate"
              {...register('startDate', {
                required: true,
              })}
              type="date"
              min={dateToday}
              onChange={event => {
                setStartDate(event.target.value);
              }}
            />
            <Label htmlFor="endDate" className="sr-only">
              END DATE
            </Label>
            <DateInputEnd
              id="endDate"
              {...register('endDate', { required: true })}
              type="date"
              min={startDate}
              onChange={event => {
                setEndDate(event.target.value);
              }}
            />
          </Container>
        </div>
        <Container>
          <Label htmlFor="description">DESCRIPTION</Label>
          <Textarea
            {...register('description', {
              required: true,
              maxLength: 500,
            })}
            id="description"
            onKeyUp={() => {
              trigger('description');
            }}
            maxLength="500"
          />
        </Container>
        <SubmitButton
          type="submit"
          disabled={
            geocoderDestination && isValid && startDate !== '' && endDate !== ''
              ? false
              : true
          }
        >
          {buttonName}
        </SubmitButton>
      </Form>
    </>
  );

  function onSubmit(post) {
    handlePost({
      destination: geocoderDestination,
      description: post.description,
      startDate: post.startDate,
      endDate: post.endDate,
    });
  }
}

const Form = styled.form`
  padding: 0 15px;
  display: grid;
  gap: 25px;
`;

const Container = styled.div`
  position: relative;
  padding: 12px 10px 8px;
  border-radius: 4px;
  background-color: var(--bg-color-section);
  box-shadow: 1px 1px 4px var(--color-boxshadow);
`;

const RequiredNote = styled.span`
  padding: 0 5px;
  font-size: 0.9rem;
`;

const Label = styled.label`
  position: absolute;
  top: -13px;
  left: 15px;
  font-weight: 500;
  color: var(--font-color-label);
`;

const Input = styled.input`
  padding: 2px 30px 2px 2px;
  border: 0;
  color: var(--font-color-label);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DeleteButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const DateInputStart = styled.input`
  background-color: var(--bg-color-section);
  padding: 2px;
  border: 0;
  width: 49%;

  &:focus {
    outline: thin dotted var(--bg-color-action);
  }
`;

const DateInputEnd = styled(DateInputStart)`
  margin-left: 2%;
`;

const Textarea = styled.textarea`
  height: 235px;
  padding: 2px;
  border: 0;

  &:focus {
    outline: thin dotted var(--bg-color-action);
  }
`;

const SubmitButton = styled(DefaultButton)`
  opacity: ${props => (props.disabled ? '0.5' : '1')};
`;
