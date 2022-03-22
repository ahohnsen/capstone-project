import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ArchivePage from './ArchivePage';

describe('ArchivePage', () => {
  it('renders a page with the heading "archive" and two archived items', () => {
    const archivedPosts = [
      {
        _id: '1',
        destination: 'Maldives',
        notes: 'I want to go there for my next diving holiday',
        isArchived: true,
      },
      {
        _id: '2',
        destination: 'Galapagos Island',
        notes: 'My dream destination but first I have to win the lottery.',
        isArchived: true,
      },
    ];

    render(
      <MemoryRouter>
        <ArchivePage archivedPosts={archivedPosts} />
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
