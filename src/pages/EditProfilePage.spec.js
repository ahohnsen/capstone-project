import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditProfilePage from './EditProfilePage';

describe('EditProfilePage', () => {
  const currentUserData = {
    _id: 'john@doe.com',
    userId: '1',
    fullname: 'John Doe',
    location: 'Dreamland',
    license: 'Advanced Open Water Diver',
    dives: '100 - 250',
    about: 'I am an experienced diver',
  };

  it('renders a page with the heading "Edit your profile" and a button to abort the editing process', () => {
    render(
      <MemoryRouter>
        <EditProfilePage currentUserData={{ ...currentUserData }} />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { level: 1 });
    const abortButton = screen.getByRole('button', { name: /abort/i });

    expect(heading).toBeInTheDocument();
    expect(abortButton).toBeInTheDocument();
  });

  it('renders a form with 4 input fields, two comboboxes and a button to save all changes', () => {
    render(
      <MemoryRouter>
        <EditProfilePage currentUserData={{ ...currentUserData }} />
      </MemoryRouter>
    );

    const form = screen.getByRole('form', { name: /edit/i });
    const inputFields = screen.getAllByRole('textbox');
    const comboboxes = screen.getAllByRole('combobox');
    const submitButton = screen.getByRole('button', { name: /save/i });

    expect(form).toBeInTheDocument();
    expect(inputFields).toHaveLength(4);
    expect(comboboxes).toHaveLength(2);
    expect(submitButton).toBeInTheDocument();
  });

  it('prefills the user data in the input fields', () => {
    render(
      <MemoryRouter>
        <EditProfilePage currentUserData={{ ...currentUserData }} />
      </MemoryRouter>
    );

    const fullname = screen.getByDisplayValue('John Doe');
    const location = screen.getByDisplayValue('Dreamland');
    const license = screen.getByDisplayValue('Advanced Open Water Diver');
    const dives = screen.getByDisplayValue('100 - 250');
    const about = screen.getByDisplayValue('I am an experienced diver');

    expect(fullname).toBeInTheDocument();
    expect(location).toBeInTheDocument();
    expect(license).toBeInTheDocument();
    expect(dives).toBeInTheDocument();
    expect(about).toBeInTheDocument();
  });
});
