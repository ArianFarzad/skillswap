import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { vi } from 'vitest';
import Search from '../components/Search';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    BrowserRouter: actual.BrowserRouter,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
    mockNavigate.mockReset();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('fetches and displays profiles on mount', async () => {
    const profilesData = [
      {
        _id: '1',
        userId: 'user1',
        name: 'John Doe',
        skills: ['JavaScript', 'React'],
        interests: ['Coding', 'Music'],
        points: 100,
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: profilesData });

    renderWithRouter(<Search />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('skills: JavaScript, React')).toBeInTheDocument();
      expect(screen.getByText('interests: Coding, Music')).toBeInTheDocument();
      expect(screen.getByText('Points: 100')).toBeInTheDocument();
    });
  });

  test('shows error message if fetching profiles fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    renderWithRouter(<Search />);

    expect(await screen.findByText(/no_profiles_found/i)).toBeInTheDocument();
  });

  test('filters profiles based on keyword', async () => {
    const profilesData = [
      {
        _id: '1',
        userId: 'user1',
        name: 'John Doe',
        skills: ['JavaScript', 'React'],
        interests: ['Coding', 'Music'],
        points: 100,
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: profilesData });

    renderWithRouter(<Search />);

    fireEvent.change(screen.getByTestId('keyword-input'), {
      target: { value: 'John' },
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  test('filters profiles based on points', async () => {
    const profilesData = [
      {
        _id: '1',
        userId: 'user1',
        name: 'John Doe',
        skills: ['JavaScript', 'React'],
        interests: ['Coding', 'Music'],
        points: 100,
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: profilesData });

    renderWithRouter(<Search />);

    fireEvent.change(screen.getByTestId('filter-input'), {
      target: { value: '100' },
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  test('navigates to profile on name click', async () => {
    const profilesData = [
      {
        _id: '1',
        userId: 'user1',
        name: 'John Doe',
        skills: ['JavaScript', 'React'],
        interests: ['Coding', 'Music'],
        points: 100,
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: profilesData });

    renderWithRouter(<Search />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('John Doe'));

    expect(mockNavigate).toHaveBeenCalledWith('/profiles/1');
  });
});
