import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { UserList } from './UserList';
import { handlers } from '@/mocks/handlers';

const API_BASE_URL = 'http://localhost:8000/api';

const meta = {
  title: 'Modules/UserList',
  component: UserList,
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers,
    },
  },
  decorators: [
    (Story: () => React.ReactNode) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
        },
      });
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof UserList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  tags: ['!autodocs'],
  parameters: {
    msw: {
      handlers: [
        http.get(`${API_BASE_URL}/users`, async () => {
          await new Promise(() => {});
        }),
      ],
    },
  },
};

export const Error: Story = {
  tags: ['!autodocs'],
  parameters: {
    msw: {
      handlers: [
        http.get(`${API_BASE_URL}/users`, () => {
          return HttpResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
          );
        }),
      ],
    },
  },
};

export const Empty: Story = {
  tags: ['!autodocs'],
  parameters: {
    msw: {
      handlers: [
        http.get(`${API_BASE_URL}/users`, () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};
