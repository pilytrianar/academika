import type { Meta, StoryObj } from '@storybook/react';
import BarOptions from './BarOptions';

const meta: Meta<typeof BarOptions> = {
  title: 'Forms/BarOptions', // cómo aparece en el menú de Storybook
  component: BarOptions,
  argTypes: {
    onSearch: { action: 'search triggered' },
    onAdd: { action: 'add clicked' },
    onFilter: { action: 'filter clicked' },
    onExport: { action: 'export clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof BarOptions>;

// Historia básica
export const Default: Story = {
  args: {},
};
