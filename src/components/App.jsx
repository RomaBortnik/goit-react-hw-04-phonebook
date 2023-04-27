import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

const STORAGE_KEY = 'contacts';
const INITIAL_VALUE = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || INITIAL_VALUE
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    contacts.length === 0
      ? localStorage.removeItem(STORAGE_KEY)
      : localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const nameValueToLowerCase = name.toLowerCase();
    const equalEl = contacts.find(
      contact => contact.name.toLowerCase() === nameValueToLowerCase
    );

    equalEl
      ? alert(`${name} is already in contacts`)
      : setContacts(prevState => {
          return [...prevState, { id: nanoid(), name, number }];
        });
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const contactsListFilter = () => {
    const filterToLowerCase = filter.toLowerCase();
    const filteredContactsList = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLowerCase)
    );
    return filteredContactsList ? filteredContactsList : contacts;
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filteredContactsList = contactsListFilter();
  return (
    <>
      <h1 className="title">Phonebook</h1>
      <ContactForm addContact={addContact}></ContactForm>
      <h2 className="title">Contacts</h2>
      <Filter onChange={handleFilterChange}></Filter>
      <ContactList
        filteredContactsList={filteredContactsList}
        deleteContact={deleteContact}
      ></ContactList>
    </>
  );
};
