import React from "react";
import PropTypes from 'prop-types';
import css from './ContactsList.module.css';
import ContactsItem from "./ContactsItem";

const ContactsList = ({ contacts, onDelete }) => (
        <ul className={css.list}>
            {contacts.map(({ id, name, number }) => 
                <ContactsItem 
                    key={id}
                    name={name}
                    id={id}
                    number={number}
                    onDelete={onDelete}
                />
            )}
        </ul>
    );

export default ContactsList;

ContactsList.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
}