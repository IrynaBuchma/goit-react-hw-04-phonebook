import {useState, useEffect} from 'react';
import ContactsList from './ContactsList/ContactsList';
import ContactForm from './ContactForm/ContactForm';
import {nanoid} from 'nanoid';
import Filter from './Filter/Filter';

export default function App() {

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) ?? 
    [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ];
  })
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  
  const onContactFormSubmit = ({ name, number }) => {

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.some(prevState => prevState.name === name)
      ? alert(`${name} is already in contacts`)
      : setContacts(prevState => [contact, ...prevState]);
  }

  const onContactDelete = (id) => {
    setContacts(contacts.filter(prevState => prevState.id !== id ))
  }
  

  const onContactFilter = e => {
    setFilter(e.currentTarget.value);
  }

  const getFilteredContacts = () => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  }

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
            <ContactForm onSubmit={onContactFormSubmit}/>
          </div>
          <div className='section'>
            <h2>Contacts</h2>
            <Filter value={filter} onChange={onContactFilter}/>
            <ContactsList contacts={getFilteredContacts()} onDelete={onContactDelete}></ContactsList>
          </div>
      </div>
    );
  }
