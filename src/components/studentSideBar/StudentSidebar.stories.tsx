import type { Meta, StoryObj } from "@storybook/react";
import StudentSidebar from "./StudentSidebar";

const meta: Meta<typeof StudentSidebar> = {
  title: "Layout/StudentSidebar",
  component: StudentSidebar,
};

export default meta;
type Story = StoryObj<typeof StudentSidebar>;

// Historia básica
export const Default: Story = {};