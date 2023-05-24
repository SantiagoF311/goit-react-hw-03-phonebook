import React, { Component } from "react";
import PropTypes from 'prop-types';

export class ContactForm extends Component {
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.onAddContact();
    this.cleanInput()
  }

  cleanInput = () => {
    document.getElementsByName("name")[0].value = '';
    document.getElementsByName("number")[0].value = ''
  }

  render() {
    const { contacts, onChangeName, onChangeNumber, onChangeFilter, filteredContacts, filter, onDeleteContact } = this.props;


    return (
      <div>
        <h3>Name</h3>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={onChangeName}
            required
          />
          <h3>Number</h3>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={onChangeNumber}
            required
          />
          <br></br>
          <br></br>
          <button type="submit">Add contact</button>
        </form>

        <h2>Contacts</h2>

        <ul>
          {contacts.map(contact => (
            <React.Fragment key={contact.id}>
            <li key={contact.id}>{contact.name}: {contact.number}</li>
            <button key={contact.name} onClick={() => onDeleteContact(contact.id)}>Delete</button>
            </React.Fragment>
          ))}
        </ul>

        <p>Find contacts by name</p>
        <input
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          onChange={onChangeFilter}>
        </input>

        {
          filter === '' ? (
            <ul>
            </ul>
          ) : (
            filteredContacts.length > 0 ? (
              <ul>
                {filteredContacts.map(contact => (
                  <li key={contact.id}>{contact.name}: {contact.number}</li>
                ))}
              </ul>
            ) : (
              <ul>
                <li>No contacts found.</li>
              </ul>
            )
          )
        }
      </div>
    );
  }
}


ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    })
  ).isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeNumber: PropTypes.func.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  onAddContact: PropTypes.func.isRequired
};
