import { userEvent } from '@storybook/testing-library';
import { render, screen } from '@testing-library/react';
import DeleteDialog from './DeleteDialog';

describe('DeleteDialog', () => {
  it('renders a dialog with a message, a delete-button and keep-button', () => {
    render(<DeleteDialog />);

    const message = screen.getByText(
      'Do you really want to delete this item from your wishlist?'
    );
    const buttonKeep = screen.getByRole('button', { name: /keep/i });
    const buttonDelete = screen.getByRole('button', { name: /delete/i });

    expect(message).toBeInTheDocument();
    expect(buttonKeep).toBeInTheDocument();
    expect(buttonDelete).toBeInTheDocument();
  });

  it('clicking the delete-button calls the function to delete the item', () => {
    const handleDelete = jest.fn();
    render(<DeleteDialog handleDelete={handleDelete} />);

    const buttonDelete = screen.getByRole('button', { name: /delete/i });

    userEvent.click(buttonDelete);
    expect(handleDelete).toHaveBeenCalled();
  });

  it('clicking the keep-button calls the function to keep the item', () => {
    const handleKeep = jest.fn();
    render(<DeleteDialog handleKeep={handleKeep} />);

    const buttonKeep = screen.getByRole('button', { name: /keep/i });

    userEvent.click(buttonKeep);
    expect(handleKeep).toHaveBeenCalled();
  });
});
