import {useState} from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export default function ContactForm({onSubmit}) {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const onNameInputChange = e => {
       setName(e.currentTarget.value);
      }

    const onNumberInputChange = e => {
       setNumber(e.currentTarget.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({ name, number });
        reset();
    }

    const reset = () => {
        setName(''); 
        setNumber('');
    }

        return (
            <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
                <label className={css.label} htmlFor="name">Name
                  <input className={css.input}
                    type="text"
                    name="name"
                    value={name}
                    onChange={onNameInputChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                  />
                </label>
                <label className={css.label} htmlFor="number">Number
                    <input className={css.input}
                        type="tel"
                        name="number"
                        value={number}
                        onChange={onNumberInputChange}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </label>
              <button type="submit">Add contact</button>
            </form>
        );
      }

ContactForm.propTyps = {
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
    onContactSubmit: PropTypes.func.isRequired, 
}