import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import css from './AddContactForm.module.css';

const initialValues = {
  name: '',
  number: '',
};

const schema = yup.object({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(`Name field can't be empty`),
  number: yup
    .string()
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(`Phone number field can't be empty`),
});

export const AddContactForm = ({ onAddContact }) => {
  const createNewContact = (name, number) => ({
    id: nanoid(),
    name: name.trim(),
    number: number.trim(),
  });

  const handleSubmit = (values, actions) => {
    const { resetForm } = actions;
    const name = values.name;
    const number = values.number;
    const newContact = createNewContact(name, number);

    onAddContact(newContact);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Name
          <Field className={css.input} type="text" name="name" required />
          <ErrorMessage name="name" component="p" className={css.error} />
        </label>
        <label className={css.label}>
          Number
          <Field className={css.input} type="tel" name="number" required />
          <ErrorMessage name="number" component="p" className={css.error} />
        </label>
        <button
          className={css.submitBtn}
          type="submit"
          aria-label="add contact"
        >
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

AddContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
