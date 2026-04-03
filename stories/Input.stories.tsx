import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: 'Enter text…' },
};

export const WithValue: Story = {
  args: { defaultValue: 'John Doe', placeholder: 'Full name' },
};

export const Email: Story = {
  args: { type: 'email', placeholder: 'email@example.com' },
};

export const Password: Story = {
  args: { type: 'password', placeholder: 'Password' },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled input' },
};
