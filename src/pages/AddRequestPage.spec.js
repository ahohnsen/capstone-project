import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AddRequestPage from './AddRequestPage.js';

describe('AddRequestPage', () => {
  it('renders a form with the name "Add a request for a buddy" as well as a header with the heading "Looking for a buddy?"', () => {
    render(
      <MemoryRouter>
        <AddRequestPage />
      </MemoryRouter>
    );

    const form = screen.getByRole('form', {
      name: 'Add a request for a buddy',
    });
    const heading = screen.getByText('Looking for a buddy?');

    expect(form).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
