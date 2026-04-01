import type { FormSchema } from '../form';

export const promoForm: FormSchema = {
  id: 'promo-popup',
  name: 'Promo Lead Form',
  layout: 'single-column',

  fields: [
    {
      id: 'full-name',
      type: 'text',
      name: 'full_name',
      label: 'Full Name',
      required: true,
      placeholder: 'Enter your name',
    },
    {
      id: 'email',
      type: 'email',
      name: 'email',
      label: 'Email Address',
      required: true,
    },
    {
      id: 'role',
      type: 'select',
      name: 'role',
      label: 'Your Role',
      options: [
        { label: 'Dentist', value: 'dentist' },
        { label: 'Clinic Manager', value: 'manager' },
      ],
    },
  ],

  submit: {
    endpoint: '/api/leads',
    method: 'POST',
  },

  confirmation: {
    successMessage: 'Thanks! We will contact you shortly.',
    errorMessage: 'Something went wrong. Please try again.',
  },
};
