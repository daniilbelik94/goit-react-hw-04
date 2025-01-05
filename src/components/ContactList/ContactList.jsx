import Contact from '../Contact/Contact';

import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className={styles.list}>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          userName={contact.name}
          userPhone={contact.number}
          userId={contact.id}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default ContactList;