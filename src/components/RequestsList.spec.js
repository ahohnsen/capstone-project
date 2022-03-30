import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext.js';

import RequestsList from './RequestsList';

jest.mock('firebase/compat/auth');
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn().mockImplementation(callback => callback()),
    }),
  }),
}));

describe('RequestsList', () => {
  const posts = [
    { _id: '1', destination: 'Maldives', author: { fullname: 'John Doe' } },
    { _id: '2', destination: 'Lanzarote', author: { fullname: 'Jane Doe' } },
  ];

  it('renders two user requests', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <RequestsList posts={posts} searchValue="" />
        </AuthProvider>
      </MemoryRouter>
    );

    const post1 = screen.getByText('Maldives');
    const post2 = screen.getByText('Lanzarote');

    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();
  });
});
