import React, { Component } from "react";
import { ContactForm } from "./ContactForm";
const { nanoid } = require('nanoid');

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filteredContacts: [],
    name: '',
    number: '',
    filter: ''
  }

  handleChangeName = (event) => {
    const { value } = event.target;
    this.setState({ name: value });
  }

  handleChangeNumber = (e) => {
    const { value } = e.target;
    this.setState({ number: value })
  }

  handleChangeFilter = (e) => {
    const { value } = e.target;
    this.setState({ filter: value })

    const { contacts } = this.state;

    const filteredContact = contacts.filter(contact =>
       contact.name.toLowerCase().includes(value.toLowerCase()));

    this.setState({ filteredContacts: filteredContact })
    console.log(this.state.filteredContacts)
  }

  addContact = () => {
    const { name, number, contacts } = this.state;

    if (name.trim === '' && number.trim() === '') {
      return;
    }

    const newContact = {
      id: nanoid(3),
      name: name,
      number: number
    };

    const addNewContact = contacts.concat(newContact);

    const sameContact = contacts.filter(contact => 
      contact.name.toLowerCase().includes(newContact.name.toLocaleLowerCase()))

    if (sameContact.length > 0) {
      alert(`${newContact.name} is already in contacts`)
    } else { 
      this.setState({
        contacts: addNewContact,
        name: '',
        number: ''
      });
    }
  }

  deleteContact = (id) => {
    const {contacts} = this.state;
    const updateContacts = contacts.filter(contact => contact.id !== id)

    this.setState({
      contacts: updateContacts
    })
  }

  render() {
    const { contacts, filteredContacts, filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          filter={filter}
          contacts={contacts}
          filteredContacts={filteredContacts}
          onChangeName={this.handleChangeName}
          onChangeNumber={this.handleChangeNumber}
          onChangeFilter={this.handleChangeFilter}
          onAddContact={this.addContact}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
