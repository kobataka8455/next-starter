import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon } from './Icon';

const meta = {
  title: 'Common/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['user', 'search', 'menu', 'heart'],
    },
    size: {
      control: { type: 'range', min: 12, max: 64, step: 4 },
    },
    color: { control: 'color' },
    hoverColor: { control: 'color' },
    rotate: {
      control: { type: 'range', min: 0, max: 360, step: 15 },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'user',
    size: 24,
  },
};

export const AllIcons: Story = {
  args: { name: 'user' },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      {(['user', 'search', 'menu', 'heart'] as const).map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Icon name={name} size={32} />
          <span style={{ fontSize: '12px', color: '#666' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: { name: 'heart' },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {[16, 24, 32, 48, 64].map((size) => (
        <div
          key={size}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Icon name="heart" size={size} />
          <span style={{ fontSize: '12px', color: '#666' }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};

export const Colored: Story = {
  args: {
    name: 'heart',
    size: 32,
    color: '#ff6b6b',
  },
};

export const Spin: Story = {
  args: {
    name: 'menu',
    size: 32,
    spin: true,
  },
};

export const Rotated: Story = {
  args: {
    name: 'search',
    size: 32,
    rotate: 45,
  },
};

export const WithHoverColor: Story = {
  args: {
    name: 'heart',
    size: 32,
    color: '#666',
    hoverColor: '#ff6b6b',
  },
};
