import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

const STORAGE_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    }
  }

  addContact = (name, number) => {
    const nameValueToLowerCase = name.toLowerCase();
    const equalEl = this.state.contacts.find(
      contact => contact.name.toLowerCase() === nameValueToLowerCase
    );
    if (equalEl) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { id: nanoid(), name, number }],
      };
    });
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  contactsListFilter = () => {
    const { contacts, filter } = this.state;
    const filterToLowerCase = filter.toLowerCase();
    const filteredContactsList = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLowerCase)
    );
    return filteredContactsList ? filteredContactsList : contacts;
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    const filteredContactsList = this.contactsListFilter();
    return (
      <>
        <h1 className="title">Phonebook</h1>
        <ContactForm addContact={this.addContact}></ContactForm>
        <h2 className="title">Contacts</h2>
        <Filter onChange={this.handleFilterChange}></Filter>
        <ContactList
          filteredContactsList={filteredContactsList}
          deleteContact={this.deleteContact}
        ></ContactList>
      </>
    );
  }
}
