import {Component} from 'react';
import Contactslist from './ContactsList/ContactsList';
import ContactForm from './ContactForm/ContactForm';
import {nanoid} from 'nanoid';
import Filter from './Filter/Filter';

export class App extends Component {

  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  }

  componentDidMount() {

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
   
    if(parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }

  }

  componentDidUpdate(prevProps, prevState) {
    
    if(this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onContactFormSubmit = ({ name, number }) => {

    const { contacts } = this.state;
    const checkedNameIsInList = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());

    if (checkedNameIsInList) {
      alert(`${name} is already in contacts`);
      return;   
    }
      const newContact = { id: nanoid(), name, number };
          this.setState(({ contacts }) => ({
            contacts: [newContact, ...contacts],
          }) 
          );
  }

  onContactDelete = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id )
    }))
  }

  onContactFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  }

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }


  render() {

    console.log('App render');

    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div
        style={{
          marginTop: 10,
          display: 'flex',
          alignItems: 'center',
          fontSize: 28,
          color: '#010101',
          flexDirection: 'column',
          borderColor: '#000000'
        }}
      >
          <div className='section'>
            <h1>Phonebook</h1>
            <ContactForm name={contacts.name} onSubmit={this.onContactFormSubmit}/>
          </div>
          <div className='section'>
            <h2>Contacts</h2>
            <Filter value={filter} onChange={this.onContactFilter}/>
            <Contactslist contacts={filteredContacts} onDelete={this.onContactDelete}></Contactslist>
          </div>
      </div>
    );
  }
};
