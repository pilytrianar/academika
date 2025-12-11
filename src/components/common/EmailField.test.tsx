import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Formik, Form } from 'formik';
import EmailField from './EmailField';

describe('Componente EmailField', () => {
  it('Se renderiza correctamente', () => {
    render(
      <Formik initialValues={{ email: '' }} onSubmit={() => {}}>
        <Form>
          <EmailField />
        </Form>
      </Formik>
    );
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
  });
});
