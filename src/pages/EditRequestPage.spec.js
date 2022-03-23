import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditRequestPage from './EditRequestPage.js';

describe('EditRequestPage', () => {
  it('renders a form with the name "Edit your buddy request" as well as a header with the heading "Edit your post"', () => {
    render(
      <MemoryRouter>
        <EditRequestPage />
      </MemoryRouter>
    );

    const form = screen.getByRole('form', {
      name: 'Edit your buddy request',
    });
    const heading = screen.getByText('Edit your post');

    expect(form).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
