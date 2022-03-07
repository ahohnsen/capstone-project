import { render, screen } from '@testing-library/react';
import ListItem from './ListItem';

describe('ListItem', () => {
  it('renders a destination and notes', () => {
    render(
      <ListItem
        destination="Maldives"
        notes="I want to go there for my next diving holiday"
      />
    );

    const destination = screen.getByText('Maldives');
    expect(destination).toBeInTheDocument();

    const notes = screen.getByText(
      'I want to go there for my next diving holiday'
    );
    expect(notes).toBeInTheDocument();
  });
});
