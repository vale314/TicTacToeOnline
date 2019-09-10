import React, {useContext, useEffect, Fragment} from 'react';
import AuthContext from '../../context/auth/authContext';
import Contacts from '../contacts/Contacts';
import ContactFilter from '../contacts/ContactFilter';

const About = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
      authContext.loadUser();
      // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <ContactFilter />
            <Contacts api="users" />
        </Fragment>
    );
};

export default About;
