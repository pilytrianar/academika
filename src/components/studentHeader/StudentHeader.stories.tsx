import type { Meta, StoryObj } from '@storybook/react';
import StudentHeader from './studentHeader';

const meta: Meta<typeof StudentHeader> = {
  title: 'Navigation/StudentHeader',
  component: StudentHeader,
};

export default meta;
type Story = StoryObj<typeof StudentHeader>;

// Historia básica
export const Default: Story = {};
