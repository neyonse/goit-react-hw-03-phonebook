import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactCard.module.css';

export const ContactCard = ({ id, name, number, onDelete }) => {
  return (
    <li className={css.contactCard} id={id}>
      <p className={css.contactDetails}>
        {name}: <span className={css.contactNumber}>{number}</span>
      </p>
      <button className={css.deleteBtn} onClick={onDelete} aria-label="delete">
        Delete
      </button>
    </li>
  );
};

ContactCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
