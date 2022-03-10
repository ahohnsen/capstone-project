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

  it('clicking the bookmark button calls the function to toggle the bookmark', () => {
    const toggleBookmark = jest.fn();
    render(
      <DiveWish
        destination="Maldives"
        notes="I want to go there for my next diving holiday"
        onToggleBookmark={toggleBookmark}
      />
    );

    const buttonBookmark = screen.getByRole('button', { name: /bookmark/i });
    userEvent.click(buttonBookmark);

    expect(toggleBookmark).toHaveBeenCalled();
  });

  // it('clicking the delete button calls the function to show the delete confirmation dialog', () => {
  //   const showDialog = jest.fn();
  //   render(
  //     <DiveWish
  //       destination="Maldives"
  //       notes="I want to go there for my next diving holiday"
  //       onDeleteDiveWish={showDialog}
  //     />
  //   );

  //   const buttonDelete = screen.getByRole('button', { name: /delete/i });
  //   userEvent.click(buttonDelete);

  //   expect(showDialog).toHaveBeenCalled();
  // });
});
