import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactsList.module.css';
import { ContactCard } from 'components/ContactCard';

export const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <ContactCard
            key={id}
            id={id}
            name={name}
            number={number}
            onDelete={() => onDeleteContact(id)}
          />
        );
      })}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
