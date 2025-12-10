import type { Meta, StoryObj } from "@storybook/react";
import StatusChip from "./statusChip";

// Configuración del componente en Storybook
const meta: Meta<typeof StatusChip> = {
  title: "Components/StatusChip", // cómo aparece en el menú de Storybook
  component: StatusChip,
  argTypes: {
    status: {
      control: { type: "radio" }, // control interactivo
      options: ["Activo", "Inactivo", "Suspendido"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusChip>;

// Historias (variantes)
export const Activo: Story = {
  args: {
    status: "Activo",
  },
};

export const Inactivo: Story = {
  args: {
    status: "Inactivo",
  },
};

export const Suspendido: Story = {
  args: {
    status: "Suspendido",
  },
};