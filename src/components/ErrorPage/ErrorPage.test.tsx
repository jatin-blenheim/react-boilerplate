import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ErrorPage from '.';

describe('Error Page', () => {
  const mockFns = vi.hoisted(() => ({
    useRouteError: vi.fn(),
  }));

  beforeAll(() => {
    mockFns.useRouteError.mockReturnValue({});
    vi.mock('react-router-dom', async () => {
      const mod: Record<string, any> =
        await vi.importActual('react-router-dom');
      return {
        ...mod,
        useRouteError: mockFns.useRouteError,
      };
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should be able to click on back to home link', async () => {
    window.history.pushState({}, 'Page Title', '/notFound');
    // render
    render(<ErrorPage />, { wrapper: BrowserRouter });

    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/notFound');

    // act
    fireEvent.click(screen.getByText('Go to Home'));

    expect(window.location.pathname).toBe('/');
  });

  it('should render error page with message from useRouteError', () => {
    mockFns.useRouteError.mockReturnValue({
      message: 'Test Error Message Text',
    });
    render(<ErrorPage />, { wrapper: BrowserRouter });

    expect(screen.getByText('Test Error Message Text')).toBeInTheDocument();
  });

  it('should render error page with statusText from useRouteError', () => {
    mockFns.useRouteError.mockReturnValue({
      statusText: 'Test Error Status Text',
    });
    render(<ErrorPage />, { wrapper: BrowserRouter });

    expect(screen.getByText('Test Error Status Text')).toBeInTheDocument();
  });
});
