import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

const ContactsItem = ({ id, name, number, onDelete }) => 
    <li key={id} className={css.item}>
        <p className={css.name}>{name}</p>
        <p className={css.number}>{number}</p>
        <button type="button" onClick={() => onDelete(id)}>Delete</button>
    </li>;

export default ContactsItem;

ContactsItem.propTypes = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    }).isRequired;