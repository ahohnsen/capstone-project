import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AddDiveWish from './AddWishPage.js';

describe('AddWishPage', () => {
  it('renders a form with the name "Add a new dive destination to your wishlist" as well as a header with the heading "Where do you want to dive?"', () => {
    render(
      <MemoryRouter>
        <AddDiveWish />
      </MemoryRouter>
    );

    const form = screen.getByRole('form', {
      name: 'Add a new dive destination to your wishlist',
    });
    const heading = screen.getByText('Where do you want to dive?');

    expect(form).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
