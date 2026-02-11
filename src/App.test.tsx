import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { server } from './mocks/server';
import { API_CONFIG } from './config/constants';
import App from './App';

// Setup helper
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const renderWithClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
      ),
  };
};

describe('App Integration', () => {
  it('Scenario A: Happy Path - User fills form, MSW returns ideas, ideas are displayed', async () => {
    renderWithClient(<App />);
    const user = userEvent.setup();

    // 1. Verify initial state
    const input = screen.getByLabelText(/tipo de negocio/i);
    const submitButton = screen.getByRole('button', { name: /generar ideas/i });

    expect(input).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // 2. User interactions
    await user.type(input, 'Marketing Digital');
    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    // 3. Verify Success
    await waitFor(() => {
      expect(screen.getByText(/5 Tips para crecer en Instagram/i)).toBeInTheDocument();
      expect(screen.getByText(/Cómo cerrar más ventas/i)).toBeInTheDocument();
    });
  });

  it('Scenario B: Chaos Engineering - API returns 500, App handles error and recovers', async () => {
    // Construct URL exactly as the app does
    const getUrl = () => {
        const baseUrl = API_CONFIG.BASE_URL;
        const endpoint = API_CONFIG.ENDPOINTS.GENERATE_IDEAS;
        const cleanBase = baseUrl.replace(/\/$/, '');
        const cleanEndpoint = endpoint.replace(/^\//, '');
        return `${cleanBase}/${cleanEndpoint}`;
    };

    // Override handler to return 500
    server.use(
      http.post(getUrl(), () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithClient(<App />);
    const user = userEvent.setup();

    const input = screen.getByLabelText(/tipo de negocio/i);
    const submitButton = screen.getByRole('button', { name: /generar ideas/i });

    await user.type(input, 'Chaos Test');
    await user.click(submitButton);

    // 1. Verify Error State
    await waitFor(() => {
      expect(screen.getByText(/Error del servidor: 500/i)).toBeInTheDocument();
    });

    // 2. Verify Recovery (Button is enabled again)
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveTextContent(/Generar Ideas/i);
  });
});
