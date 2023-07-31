import React, { Component } from 'react';
import { Section } from './Section';
import { AddContactForm } from './AddContactForm';
import { Filter } from './Filter';
import { ContactsList } from './ContactsList';

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

  handleAddContact = newContact => {
    const isAdded = this.isContactAlreadyAdded(newContact);

    if (isAdded !== -1) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  isContactAlreadyAdded = newContact => {
    const { contacts } = this.state;
    const newContactLowerCase = newContact.name.toLowerCase();

    return contacts.findIndex(
      contact => contact.name.toLowerCase() === newContactLowerCase
    );
  };

  handleFilterChange = filterWord => {
    this.setState({ filter: filterWord });
  };

  getFilteredContacts() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredContacts.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <>
        <Section title="Phonebook">
          <AddContactForm onAddContact={this.handleAddContact} />
        </Section>
        {contacts.length !== 0 && (
          <Section title="Contacts">
            <Filter value={filter} onFilterChange={this.handleFilterChange} />
            <ContactsList
              contacts={filteredContacts}
              onDeleteContact={this.deleteContact}
            />
          </Section>
        )}
      </>
    );
  }
}
