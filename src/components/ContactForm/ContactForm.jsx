import {Component} from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

class ContactForm extends Component {

    state = {
        name: '',
        number: '',
      }

    handleInputChange = (e) => {
       const { name, value} = e.currentTarget;
       this.setState({[name]: value });
      }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state)
        console.log(this.state);
        this.reset();
    }

    reset = () => {
        this.setState({ name: '', number: ''});
    }

    render() {

        return (
            <form className={css.form} onSubmit={this.handleSubmit} autoComplete="off">
                <label className={css.label} htmlFor="name">Name
                  <input className={css.input}
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                  />
                </label>
                <label className={css.label} htmlFor="number">Number
                    <input className={css.input}
                        type="tel"
                        name="number"
                        value={this.state.number}
                        onChange={this.handleInputChange}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </label>
              <button type="submit">Add contact</button>
            </form>
        );
      }
    }

export default ContactForm;

ContactForm.propTyps = {
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
    onContactSubmit: PropTypes.func.isRequired, 
}