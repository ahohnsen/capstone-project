import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import DiveWish from './DiveWish';

describe('ListItem', () => {
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

  it('clicking the delete button calls the function to open the delete dialog', () => {
    const callback = jest.fn();
    render(
      <DiveWish
        destination="Maldives"
        notes="I want to go there for my next diving holiday"
        showDeleteDialog={callback}
      />
    );

    const buttonDelete = screen.getByRole('button', { name: /delete/i });
    userEvent.click(buttonDelete);

    expect(callback).toHaveBeenCalled();
  });

  it('clicking the bookmark button calls the function to toggle the bookmark', () => {
    const callback = jest.fn();
    render(
      <DiveWish
        destination="Maldives"
        notes="I want to go there for my next diving holiday"
        toggleBookmark={callback}
      />
    );

    const buttonBookmark = screen.getByRole('button', { name: /bookmark/i });
    userEvent.click(buttonBookmark);

    expect(callback).toHaveBeenCalled();
  });
});
