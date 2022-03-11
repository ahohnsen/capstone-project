import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import DiveWish from './DiveWish';

describe('DiveWish', () => {
  it('renders a destination,notes, and a delete and bookmark button', () => {
    render(
      <DiveWish
        destination="Maldives"
        notes="I want to go there for my next diving holiday"
      />
    );

    const destination = screen.getByText('Maldives');
    const notes = screen.getByText(
      'I want to go there for my next diving holiday'
    );
    const buttonBookmark = screen.getByRole('button', { name: /bookmark/i });
    const buttonDelete = screen.getByRole('button', { name: /delete/i });

    expect(destination).toBeInTheDocument();
    expect(notes).toBeInTheDocument();
    expect(buttonDelete).toBeInTheDocument();
    expect(buttonBookmark).toBeInTheDocument();
  });

  it('clicking the bookmark button calls the function to toggle the bookmark', () => {
    const toggleBookmark = jest.fn();
    render(<DiveWish onToggleBookmark={toggleBookmark} />);

    const buttonBookmark = screen.getByRole('button', { name: /bookmark/i });
    userEvent.click(buttonBookmark);

    expect(toggleBookmark).toHaveBeenCalled();
  });

  it('clicking the delete button calls the function to show the delete confirmation dialog', () => {
    render(<DiveWish />);

    const buttonDelete = screen.getByRole('button', { name: /delete/i });
    userEvent.click(buttonDelete);

    const buttonConfirmDelete = screen.getByRole('button', {
      name: 'Yes, delete',
    });
    expect(buttonConfirmDelete).toBeInTheDocument();
  });

  it('clicking the delete button in the confirmation dialog calls the function to delete the dive wish', () => {
    const deleteDiveWish = jest.fn();
    render(<DiveWish onDeleteDiveWish={deleteDiveWish} />);

    const buttonDelete = screen.getByRole('button', { name: /delete/i });
    userEvent.click(buttonDelete);

    const buttonConfirmDelete = screen.getByRole('button', {
      name: 'Yes, delete',
    });
    userEvent.click(buttonConfirmDelete);
    expect(deleteDiveWish).toBeCalled();
  });

  it('clicking the cancel button in the confirmation dialog closes the dialog', () => {
    render(<DiveWish />);

    const buttonDelete = screen.getByRole('button', { name: /delete/i });
    userEvent.click(buttonDelete);

    const buttonCancelDelete = screen.getByRole('button', {
      name: 'Cancel',
    });
    userEvent.click(buttonCancelDelete);

    expect(buttonCancelDelete).not.toBeInTheDocument();
  });
});
