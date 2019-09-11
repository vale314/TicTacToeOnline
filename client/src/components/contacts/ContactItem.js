import React, { useContext, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';
import MessageContext from '../../context/message/messageContext';
import { Button } from 'reactstrap';

const ContactItem = ({ contact, api }) => {
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);
  const messageContext = useContext(MessageContext);

  const {deleteContact, setCurrent, clearCurrent } = contactContext;
  const {setAlert} = alertContext;
  const {setCurrentMessage} = messageContext;

  const { _id, name, email, phone, type } = contact;
  

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  const sendContact = async () =>{
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      await axios.post('/api/contacts', contact, config);
      setAlert('Agregado Exitosamente','success',1000);
    }catch(err){
      setAlert('User Is In Your Contacts','danger',4000);
      console.log(err)
    }
  }

  const activedContacts = (
    <Fragment>
      <Button
        className='btn btn-dark btn-sm'
        onClick={() => setCurrentMessage(contact)}
        >
        Enviar Msj
      </Button>
      <Button
        className='btn btn-dark btn-sm'
        onClick={() => setCurrent(contact)}
        >
        Edit
      </Button>
      <Button className='btn btn-danger btn-sm' onClick={onDelete}>
        Delete
      </Button>
    </Fragment>  
  )

  const activedUsers = (
    <Fragment>
      <Button className='btn btn-danger btn-sm' onClick={sendContact}>
          Add Contact
      </Button>
    </Fragment>  
  )
  
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        {api==='contacts' ? 
          activedContacts
          :
          activedUsers
        }
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
