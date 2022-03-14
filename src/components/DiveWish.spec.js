import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import DiveWish from './DiveWish';

describe('DiveWish', () => {
  it('renders a destination,notes, and an edit, delete and bookmark button', () => {
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
    const buttonEdit = screen.getByRole('button', { name: /edit/i });
    const buttonDelete = screen.getByRole('button', { name: /delete/i });

    expect(destination).toBeInTheDocument();
    expect(notes).toBeInTheDocument();
    expect(buttonEdit).toBeInTheDocument();
    expect(buttonDelete).toBeInTheDocument();
    expect(buttonBookmark).toBeInTheDocument();
  });

  it('calls the function to toggle the bookmark when the bookmark button is clicked', () => {
    const toggleBookmark = jest.fn();
    render(<DiveWish onToggleBookmark={toggleBookmark} />);

    const buttonBookmark = screen.getByRole('button', { name: /bookmark/i });
    userEvent.click(buttonBookmark);

    expect(toggleBookmark).toHaveBeenCalled();
  });

  it('clicking the edit button calls the function to edit the dive wish', () => {
    const editDiveWish = jest.fn();
    render(<DiveWish onEditDiveWish={editDiveWish} />);

    const buttonEdit = screen.getByRole('button', { name: /edit/i });
    userEvent.click(buttonEdit);

    expect(editDiveWish).toBeCalled();
  });

  it('calls the function to show the delete confirmation dialog when the delete button is clicked', () => {
    render(<DiveWish />);

    const buttonDelete = screen.getByRole('button', { name: /delete/i });
    userEvent.click(buttonDelete);

    const buttonConfirmDelete = screen.getByRole('button', {
      name: 'Yes, delete',
    });
    expect(buttonConfirmDelete).toBeInTheDocument();
  });

  it('calls the function to delete the dive wish when the delete button in the confirmation dialog is clicked', () => {
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

  it('closes the dialog when the cancel button in the confirmation dialog is clicked', () => {
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
