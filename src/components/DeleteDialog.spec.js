import { userEvent } from '@storybook/testing-library';
import { render, screen } from '@testing-library/react';
import DeleteDialog from './DeleteDialog';

describe('DeleteDialog', () => {
  it('renders a dialog with a message, a delete and cancel button', () => {
    render(<DeleteDialog />);

    const message = screen.getByText('Do you really want to delete this post?');
    const buttonCancel = screen.getByRole('button', { name: /cancel/i });
    const buttonDelete = screen.getByRole('button', { name: /delete/i });

    expect(message).toBeInTheDocument();
    expect(buttonCancel).toBeInTheDocument();
    expect(buttonDelete).toBeInTheDocument();
  });

  it('clicking the delete button calls the function to delete the post', () => {
    const confirmDeletePost = jest.fn();
    render(<DeleteDialog onConfirmDeletePost={confirmDeletePost} />);

    const buttonDelete = screen.getByRole('button', { name: /delete/i });

    userEvent.click(buttonDelete);
    expect(confirmDeletePost).toHaveBeenCalled();
  });

  it('clicking the cancel button calls the function to close the dialog', () => {
    const cancelDeletePost = jest.fn();
    render(<DeleteDialog onCancelDeletePost={cancelDeletePost} />);

    const buttonCancel = screen.getByRole('button', { name: /cancel/i });

    userEvent.click(buttonCancel);
    expect(cancelDeletePost).toHaveBeenCalled();
  });
});
