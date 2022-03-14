import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DiveWishForm from './DiveWishForm';

describe('DiveWishForm', () => {
  it('renders a form with an input field, a textarea and a button to submit the form', () => {
    render(
      <MemoryRouter>
        <DiveWishForm buttonName={'Add to list'} />
      </MemoryRouter>
    );

    const destinationInput = screen.getByLabelText(/destination/i);
    const notesTextarea = screen.getByLabelText(/notes/i);
    const submitButton = screen.getByRole('button', { name: 'Add to list' });

    expect(destinationInput).toBeInTheDocument();
    expect(notesTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('renders a form to add a new dive wish with the name "Add a new dive destination to your wishlist"', () => {
    render(
      <MemoryRouter>
        <DiveWishForm
          formName={'Add a new dive destination to your wishlist'}
        />
      </MemoryRouter>
    );

    const form = screen.getByRole('form', {
      name: 'Add a new dive destination to your wishlist',
    });
    expect(form).toBeInTheDocument();
  });

  it('the form to add a new dive wish has empty input fields and a button with the name "Add to list"', () => {
    render(
      <MemoryRouter>
        <DiveWishForm
          formName={'Add a new dive destination to your wishlist'}
          buttonName={'Add to list'}
        />
      </MemoryRouter>
    );
    const inputFields = screen.getAllByDisplayValue('');
    const submitButton = screen.getByRole('button', { name: 'Add to list' });

    expect(inputFields).toHaveLength(2);
    expect(submitButton).toBeInTheDocument();
  });

  it('renders a form to edit an existing dive wish with the name "Edit your dive wish"', () => {
    render(
      <MemoryRouter>
        <DiveWishForm formName={'Edit your dive wish'} />
      </MemoryRouter>
    );

    const form = screen.getByRole('form', {
      name: 'Edit your dive wish',
    });
    expect(form).toBeInTheDocument();
  });

  it('the form to edit a dive wish shows the existing data in both input fields and a button with the name "Save changes"', () => {
    render(
      <MemoryRouter>
        <DiveWishForm
          formName={'Edit ypur dive wish'}
          buttonName={'Save changes'}
          preloadedValues={{
            destination: 'Maldives',
            notes: 'It was so beautiful, I wanna go again as soon as possible!',
          }}
        />
      </MemoryRouter>
    );
    const destinationInput = screen.getByDisplayValue('Maldives');
    const notesTextarea = screen.getByDisplayValue(
      'It was so beautiful, I wanna go again as soon as possible!'
    );
    const submitButton = screen.getByRole('button', { name: 'Save changes' });

    expect(destinationInput).toBeInTheDocument();
    expect(notesTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
