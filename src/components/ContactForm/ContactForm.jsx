import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    addContact: PropTypes.func.isRequired,
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { addContact } = this.props;
    const { name, number } = this.state;

    addContact(name, number);
    this.reset();
  };

  reset() {
    this.setState({ name: '', number: '' });
  }

  render() {
    const {
      contactsForm,
      contactsFormLabel,
      contactsFormInput,
      contactsFormBtn,
    } = css;
    return (
      <form className={contactsForm} onSubmit={this.handleSubmit}>
        <label className={contactsFormLabel}>
          Name
          <input
            className={contactsFormInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label className={contactsFormLabel}>
          Number
          <input
            className={contactsFormInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleChange}
          />
        </label>

        <button className={contactsFormBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
