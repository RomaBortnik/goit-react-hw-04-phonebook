import PropTypes from 'prop-types';

import css from './ContactListItem.module.css';

const ContactListItem = ({ name, number, id, onClick }) => {
  return (
    <li className={css.contactsListItem}>
      {name}: {number}
      <button
        className={css.contactsListBtn}
        onClick={() => onClick(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactListItem;
