import type { Meta, StoryObj } from '@storybook/react';
import StudentTabs from './StudentTabs';

const meta: Meta<typeof StudentTabs> = {
  title: 'Navigation/StudentTabs',
  component: StudentTabs,
};

export default meta;
type Story = StoryObj<typeof StudentTabs>;

// Historia básica
export const Default: Story = {};
