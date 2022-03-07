import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddListItem from './AddListItem';

describe('AddListItem', () => {
  it('renders a form with the name "Add a dive destination to your wishlist"', () => {
    render(<AddListItem />);

    const form = screen.getByRole('form', {
      name: 'Add a dive destination to your wishlist',
    });
    expect(form).toBeInTheDocument();
  });

  it('renders a form with one input field, a textarea and a button to submit the form', () => {
    render(<AddListItem />);
    const destinationInput = screen.getByLabelText('DESTINATION');
    const notesTextarea = screen.getByLabelText('NOTES');
    const submitButton = screen.getByRole('button');

    expect(destinationInput).toBeInTheDocument();
    expect(notesTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('input and textarea are both required fields', () => {
    render(<AddListItem />);
    const destinationInput = screen.getByLabelText('DESTINATION');
    const notesTextarea = screen.getByLabelText('NOTES');

    expect(destinationInput).toBeRequired();
    expect(notesTextarea).toBeRequired();
  });

  it('submits form data when every field is filled out', () => {
    const callback = jest.fn();
    render(<AddListItem onAddItem={callback} />);

    const destinationInput = screen.getByLabelText('DESTINATION');
    const notesTextarea = screen.getByLabelText('NOTES');
    const submitButton = screen.getByRole('button');

    userEvent.type(destinationInput, 'Maldives');
    userEvent.type(
      notesTextarea,
      'I want to go again soon, maybe this summer!'
    );
    userEvent.click(submitButton);

    expect(callback).toHaveBeenCalledWith(
      'Maldives',
      'I want to go again soon, maybe this summer!'
    );
  });
});
