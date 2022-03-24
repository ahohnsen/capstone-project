import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RequestForm from './RequestForm';

describe('RequestForm', () => {
  it('renders a form with three input fields, a textarea and a button to submit the form', () => {
    render(
      <MemoryRouter>
        <RequestForm buttonName="POST" />
      </MemoryRouter>
    );

    const destinationInput = screen.getByLabelText(/destination/i);
    const descriptionTextarea = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: 'POST' });

    expect(destinationInput).toBeInTheDocument();
    expect(descriptionTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('renders a form to add a new request with the name "Add a request for a buddy"', () => {
    render(
      <MemoryRouter>
        <RequestForm formName={'Add a request for a buddy'} />
      </MemoryRouter>
    );

    const form = screen.getByRole('form', {
      name: 'Add a request for a buddy',
    });
    expect(form).toBeInTheDocument();
  });

  it('renders a form to add a new request, that has empty input fields and a button with the name "Post"', () => {
    render(
      <MemoryRouter>
        <RequestForm formName="Add a request for a buddy" buttonName="POST" />
      </MemoryRouter>
    );
    const inputFields = screen.getAllByDisplayValue('');
    const submitButton = screen.getByRole('button', { name: 'POST' });

    expect(inputFields).toHaveLength(4);
    expect(submitButton).toBeInTheDocument();
  });

  it('renders a form to edit an existing post with the name "Edit your post"', () => {
    render(
      <MemoryRouter>
        <RequestForm formName={'Edit your post'} />
      </MemoryRouter>
    );

    const form = screen.getByRole('form', {
      name: 'Edit your post',
    });
    expect(form).toBeInTheDocument();
  });

  it('renders a form to edit a post, that shows the existing data in both input fields and a button with the name "Save changes"', () => {
    render(
      <MemoryRouter>
        <RequestForm
          formName={'Edit your post'}
          buttonName={'SAVE CHANGES'}
          preloadedValues={{
            destination: 'Maldives',
            description:
              'It was so beautiful, I wanna go again as soon as possible!',
          }}
        />
      </MemoryRouter>
    );
    const destinationInput = screen.getByDisplayValue('Maldives');
    const descriptionTextarea = screen.getByDisplayValue(
      'It was so beautiful, I wanna go again as soon as possible!'
    );
    const submitButton = screen.getByRole('button', { name: 'SAVE CHANGES' });

    expect(destinationInput).toBeInTheDocument();
    expect(descriptionTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
