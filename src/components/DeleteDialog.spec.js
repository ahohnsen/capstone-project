import { userEvent } from '@storybook/testing-library';
import { render, screen } from '@testing-library/react';
import DeleteDialog from './DeleteDialog';

describe('DeleteDialog', () => {
  it('renders a dialog with a message, a delete and cancel button', () => {
    render(<DeleteDialog />);

    const message = screen.getByText(
      'Do you really want to delete this item from your wishlist?'
    );
    const buttonCancel = screen.getByRole('button', { name: /cancel/i });
    const buttonDelete = screen.getByRole('button', { name: /delete/i });

    expect(message).toBeInTheDocument();
    expect(buttonCancel).toBeInTheDocument();
    expect(buttonDelete).toBeInTheDocument();
  });

  it('clicking the delete button calls the function to delete the item', () => {
    const confirmDeleteWish = jest.fn();
    render(<DeleteDialog onConfirmDeleteWish={confirmDeleteWish} />);

    const buttonDelete = screen.getByRole('button', { name: /delete/i });

    userEvent.click(buttonDelete);
    expect(confirmDeleteWish).toHaveBeenCalled();
  });

  it('clicking the cancel button calls the function to close the dialog', () => {
    const cancelDeleteWish = jest.fn();
    render(<DeleteDialog onCancelDeleteWish={cancelDeleteWish} />);

    const buttonCancel = screen.getByRole('button', { name: /cancel/i });

    userEvent.click(buttonCancel);
    expect(cancelDeleteWish).toHaveBeenCalled();
  });
});
