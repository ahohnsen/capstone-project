import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext.js';
import { MemoryRouter } from 'react-router-dom';
import ArchivePage from './ArchivePage';

jest.mock('firebase/compat/auth');
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn().mockImplementation(callback => callback()),
    }),
  }),
}));

describe('ArchivePage', () => {
  it('renders a page with the heading "archive" and two archived items', () => {
    const archivedPosts = [
      {
        _id: '1',
        destination: 'Maldives',
        isArchived: true,
        author: { fullname: 'John Doe', _id: 'john@doe.com' },
      },
      {
        _id: '2',
        destination: 'Galapagos Island',
        isArchived: true,
        author: { fullname: 'John Doe', _id: 'john@doe.com' },
      },
    ];

    render(
      <MemoryRouter>
        <AuthProvider>
          <ArchivePage archivedPosts={archivedPosts} />
        </AuthProvider>
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { level: 1 });
    const post1 = screen.getByText('Maldives');
    const post2 = screen.getByText('Galapagos Island');

    expect(heading).toBeInTheDocument();
    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();
  });
});
