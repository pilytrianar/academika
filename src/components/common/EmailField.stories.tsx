import type { Meta, StoryObj } from '@storybook/react';
import { Formik, Form } from 'formik';
import EmailField from './EmailField';

const meta = {
  title: 'Components/EmailField',
  component: EmailField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Campo de email personalizado que integra Formik con Material-UI TextField. Incluye validación automática y estilos consistentes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'email', 'number', 'password'] },
  },

  decorators: [
    Story => (
      <Formik
        initialValues={{ email: '' }}
        onSubmit={values => {
          console.log('Form submitted:', values);
        }}
      >
        <Form>
          <Story />
        </Form>
      </Formik>
    ),
  ],
} satisfies Meta<typeof EmailField>;

export default meta;
type Story = StoryObj<typeof EmailField>;

/**
 * Estado por defecto del campo de email
 */
export const Default: Story = {
  args: {
    type: 'text',
    disabled: false,
    error: false,
  },
};

/**
 * Campo de email con valor inicial
 */
export const WithValue: Story = {
  decorators: [
    Story => (
      <Formik
        initialValues={{ email: 'usuario@ejemplo.com' }}
        onSubmit={values => {
          console.log('Form submitted:', values);
        }}
      >
        <Form>
          <Story />
        </Form>
      </Formik>
    ),
  ],
} satisfies Story;

/**
 * Campo de email deshabilitado
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Campo de email con error
 */
export const WithError: Story = {
  args: {
    error: true,
    helperText: 'Por favor ingresa un correo electrónico válido',
  },
} satisfies Story;

/**
 * Campo de email en modo oscuro
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    Story => (
      <div style={{ padding: '20px', backgroundColor: '#333', color: '#fff' }}>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={values => {
            console.log('Form submitted:', values);
          }}
        >
          <Form>
            <Story />
          </Form>
        </Formik>
      </div>
    ),
  ],
} satisfies Story;
