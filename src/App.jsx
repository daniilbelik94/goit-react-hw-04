import { useState, useEffect } from 'react';

import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';

import listcontacts from './listcontacts.json';

import styles from './App.module.css';

function App() {
  function initialContacts() {
    const contactsFromLocalStorage = localStorage.getItem('contactsData');
    return contactsFromLocalStorage ? JSON.parse(contactsFromLocalStorage) : listcontacts;
  }

  const [contacts, setContacts] = useState(initialContacts());
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    localStorage.setItem('contactsData', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts((prevContact) => {
      return [...prevContact, newContact];
    });
  };

  const foundContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchValue.toLowerCase()));

  const deletContact = (contactId) => {
    setContacts((prevContact) => {
      return prevContact.filter((contact) => contact.id !== contactId);
    });
  };

return (
  <div>
    <h1 className={styles.title}>Phonebook</h1>
    <ContactForm onAddContact={addContact} />
    <SearchBox searchValue={searchValue} onSearch={setSearchValue} />
    <ContactList contacts={foundContacts} onDelete={deletContact} />
  </div>
);

}

export default App;
