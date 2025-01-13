import { render, screen } from '@testing-library/react';
import App from '../App';
import { mockI18n } from './testUtils/mocks.ts';

mockI18n();

describe('App Component', () => {
  test('renders Welcome component on default route', () => {
    render(<App />);
    expect(screen.getByTestId('welcome-headline')).toBeInTheDocument();
  });

  test('renders Register component on /register route', () => {
    window.history.pushState({}, 'Register Page', '/register');
    render(<App />);
    expect(screen.getByTestId('register-headline')).toBeInTheDocument();
  });

  test('renders Login component on /login route', () => {
    window.history.pushState({}, 'Login Page', '/login');
    render(<App />);
    expect(screen.getByTestId('login-headline')).toBeInTheDocument();
  });

  test('renders Profile component on /profile route', () => {
    window.history.pushState({}, 'Profile Page', '/profile');
    render(<App />);
    expect(screen.getByTestId('profile-headline')).toBeInTheDocument();
  });

  test('renders Settings component on /settings route', () => {
    window.history.pushState({}, 'Settings Page', '/settings');
    render(<App />);
    expect(screen.getByTestId('settings-headline')).toBeInTheDocument();
  });

  test('renders Search component on /search route', () => {
    window.history.pushState({}, 'Search Page', '/search');
    render(<App />);
    expect(screen.getByTestId('search-headline')).toBeInTheDocument();
  });

  test('renders ProfilePage component on /profiles/:profileId route', () => {
    window.history.pushState({}, 'Profile Page', '/profiles/1');
    render(<App />);
    expect(screen.getByTestId('profilePage-headline')).toBeInTheDocument();
  });

  test('renders BookAppointment component on /book-appointment route', () => {
    window.history.pushState({}, 'Book Appointment Page', '/book-appointment');
    render(<App />);
    expect(screen.getByTestId('bookAppointment-headline')).toBeInTheDocument();
  });

  test('renders Chat component on /chat/:sessionId route', () => {
    window.history.pushState({}, 'Chat Page', '/chat/1');
    render(<App />);
    expect(screen.getByText('chat_with Session 1')).toBeInTheDocument();
  });
});
