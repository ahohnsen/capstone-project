import { render, screen } from '@testing-library/react';
import DiveWish from './DiveWish';

describe('ListItem', () => {
  it('renders a destination and notes and a delete button', () => {
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
    const buttonDelete = screen.getByRole('button', { name: /delete/i });

    expect(destination).toBeInTheDocument();
    expect(notes).toBeInTheDocument();
    expect(buttonDelete).toBeInTheDocument();
  });
});
