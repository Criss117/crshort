import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CreateLink } from '../create-link';

describe('CreateLink form with tags (LT-001)', () => {
  it('should render trigger button', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CreateLink />
      </QueryClientProvider>,
    );

    expect(screen.getByText('Crear Enlace')).toBeInTheDocument();
  });

  it('should render tags input field when dialog opens', async () => {
    const user = userEvent.setup();
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CreateLink />
      </QueryClientProvider>,
    );

    // Click the trigger button to open the dialog
    await user.click(screen.getByText('Crear Enlace'));

    // Wait for the dialog content to appear
    const tagsInput = screen.getByPlaceholderText(
      'trabajo, React, Producción',
    );
    expect(tagsInput).toBeInTheDocument();
  });
});
