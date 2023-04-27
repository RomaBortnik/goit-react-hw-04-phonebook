import PropTypes from 'prop-types';

import css from './Filter.module.css';

const Filter = ({ onChange }) => {
  const { contactsListLabel, contactsFormInput } = css;
  return (
    <label className={contactsListLabel}>
      Find contacts by name
      <input
        onChange={onChange}
        className={contactsFormInput}
        type="text"
        name="filter"
      />
    </label>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filter;
