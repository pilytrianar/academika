import type { Meta, StoryObj } from '@storybook/react';
import StudentAverage from './StudentAverage';

const meta: Meta<typeof StudentAverage> = {
  title: 'Stats/StudentAverage',
  component: StudentAverage,
};

export default meta;
type Story = StoryObj<typeof StudentAverage>;

// Historia básica
export const Default: Story = {};
