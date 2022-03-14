import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditWishPage from './EditWishPage.js';

describe('EditWishPage', () => {
  it('renders a form with the name "Edit your dive wish" as well as a header with the heading "Edit dive destination"', () => {
    render(
      <MemoryRouter>
        <EditWishPage />
      </MemoryRouter>
    );

    const form = screen.getByRole('form', {
      name: 'Edit your dive wish',
    });
    const heading = screen.getByText('Edit dive destination');

    expect(form).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
