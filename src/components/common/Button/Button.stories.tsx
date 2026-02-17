import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './Button';

const meta = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'ボタン',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'ボタン',
    variant: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    children: '削除する',
    variant: 'danger',
  },
};

export const Outline: Story = {
  args: {
    children: 'ボタン',
    variant: 'outline',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
};

export const Loading: Story = {
  args: {
    children: '送信中',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: '無効',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'フルワイド',
    fullWidth: true,
  },
};
