import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import Request from './Request';

describe('Request', () => {
  const author = { fullname: 'John Doe', _id: 'john@doe.com' };
  const currentUserData = { _id: 'john@doe.com' };

  it('renders a post with the name of the author, date the post was created, a destination, description and travel start and end dates', () => {
    render(
      <Request
        destination="Maldives"
        description="I want to go there for my next diving holiday"
        author={{ ...author }}
        startDate="2022-03-23T00:00:00.000Z"
        endDate="2022-03-29T00:00:00.000Z"
        createdDate="2022-02-02T00:00:00.000Z"
      />
    );

    const nameAuthor = screen.getByText('John Doe');
    const createdDate = screen.getByText(/Feb 2, 2022/);
    const destination = screen.getByText('Maldives');
    const description = screen.getByText(
      'I want to go there for my next diving holiday'
    );
    const startDate = screen.getByText(/Mar 23, 2022/);
    const endDate = screen.getByText(/Mar 29, 2022/);

    expect(nameAuthor).toBeInTheDocument();
    expect(createdDate).toBeInTheDocument();
    expect(destination).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
  });

  it('renders an edit, delete and checkmark button if the current user is the author of the post', () => {
    render(
      <Request
        currentUserData={{ ...currentUserData }}
        author={{ ...author }}
      />
    );

    const buttonCheckmark = screen.getByRole('button', { name: /archived/i });
    const buttonEdit = screen.getByRole('button', { name: /edit/i });
    const buttonDelete = screen.getByRole('button', { name: /delete/i });

    expect(buttonCheckmark).toBeInTheDocument();
    expect(buttonEdit).toBeInTheDocument();
    expect(buttonDelete).toBeInTheDocument();
  });

  it('renders a bookmark button and an email icon if the current user is not the author of the post', () => {
    render(
      <Request
        currentUserData={{ _id: 'jane@doe.com' }}
        author={{ ...author }}
      />
    );

    const buttonBookmark = screen.getByRole('button', {
      name: 'not bookmarked',
    });
    const buttonEmail = screen.getByRole('img', { name: 'send email' });

    expect(buttonBookmark).toBeInTheDocument();
    expect(buttonEmail).toBeInTheDocument();
  });

  it('calls the function to toggle the checkmark when the check button is clicked', () => {
    const toggleCheckmark = jest.fn();
    render(
      <Request
        onToggleCheckmark={toggleCheckmark}
        author={{ ...author }}
        currentUserData={{ ...currentUserData }}
      />
    );

    const buttonCheckmark = screen.getByRole('button', { name: /archive/i });
    userEvent.click(buttonCheckmark);

    expect(toggleCheckmark).toHaveBeenCalled();
  });

  it('calls the function to toggle the bookmark when the bookmark button is clicked', () => {
    const toggleBookmark = jest.fn();
    render(
      <Request
        onToggleBookmark={toggleBookmark}
        author={{ ...author }}
        currentUserData={{ _id: 'jane@doe.com' }}
      />
    );

    const buttonBookmark = screen.getByRole('button', { name: /bookmark/i });
    userEvent.click(buttonBookmark);

    expect(toggleBookmark).toHaveBeenCalled();
  });

  it('calls the function to edit the request when the edit button is clicked', () => {
    const editPost = jest.fn();
    render(
      <Request
        onEditPost={editPost}
        author={{ ...author }}
        currentUserData={{ ...currentUserData }}
      />
    );

    const buttonEdit = screen.getByRole('button', { name: /edit/i });
    userEvent.click(buttonEdit);

    expect(editPost).toBeCalled();
  });

  it('calls the function to show the delete confirmation dialog when the delete button is clicked', () => {
    render(
      <Request
        author={{ ...author }}
        currentUserData={{ ...currentUserData }}
      />
    );

    const buttonDelete = screen.getByRole('button', { name: /delete/i });
    userEvent.click(buttonDelete);

    const buttonConfirmDelete = screen.getByRole('button', {
      name: 'Yes, delete',
    });
    expect(buttonConfirmDelete).toBeInTheDocument();
  });

  it('calls the function to delete the request when the delete button in the confirmation dialog is clicked', () => {
    const deletePost = jest.fn();
    render(
      <Request
        onDeletePost={deletePost}
        author={{ ...author }}
        currentUserData={{ ...currentUserData }}
      />
    );

    const buttonDelete = screen.getByRole('button', { name: /delete/i });
    userEvent.click(buttonDelete);

    const buttonConfirmDelete = screen.getByRole('button', {
      name: 'Yes, delete',
    });
    userEvent.click(buttonConfirmDelete);
    expect(deletePost).toBeCalled();
  });

  it('closes the dialog when the cancel button in the confirmation dialog is clicked', () => {
    render(
      <Request
        author={{ ...author }}
        currentUserData={{ ...currentUserData }}
      />
    );

    const buttonDelete = screen.getByRole('button', { name: /delete/i });
    userEvent.click(buttonDelete);

    const buttonCancelDelete = screen.getByRole('button', {
      name: 'Cancel',
    });
    userEvent.click(buttonCancelDelete);

    expect(buttonCancelDelete).not.toBeInTheDocument();
  });
});
