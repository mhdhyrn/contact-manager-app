import { Link } from 'react-router-dom';
import AvatarImage from '../assets/avatarImage.jpg';
import { useContext, useEffect, useState } from 'react';
import { ContactContext } from './ContactContext';
 
function Contact({contact}) {

  const [contactColor, setContactColor] = useState('');
  const { setDeleteAlert } = useContext(ContactContext);


  useEffect(()=>{

    if(contact.sex === "male")
      setContactColor('#7bbfff');

    else if(contact.sex === "female")
      setContactColor('#ff96bd');

    else if(contact.sex === "other")
      setContactColor('#e5a86c');
    
  }, [])

  const showDeleteAlert = () => {
    setDeleteAlert({status: true, contactName: contact.name, contactId: contact.id})
  }
  


  return (
    
    <div className="Contact" style={{backgroundColor : `${contactColor}`}}>
        <div className="contact-profile">
            <img src={AvatarImage} alt="profile" />
        </div>
        <div className="contact-info">
            <div>
              <span className='spn-title'>Name: </span>
              <span className='contact-info-name'>{contact.name}</span>
            </div>
            <div>
              <span className='spn-title'>Family: </span>
              <span className='contact-info-family'>{contact.family}</span>
            </div>
            <div>
              <span className='spn-title'>Phone: </span>
              <span className='contact-info-phone'>{contact.phone}</span>
            </div>
        </div>
         <div className="contact-button">
          <Link to={`/contacts/${contact.id}`}>
            <button className='view-contact-btn'>
              <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"/><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"/></svg>
            </button>
          </Link>
          <Link to={`/contacts/edit/${contact.id}`}>
          <button className='edit-contact-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path d="M22.853,1.148a3.626,3.626,0,0,0-5.124,0L1.465,17.412A4.968,4.968,0,0,0,0,20.947V23a1,1,0,0,0,1,1H3.053a4.966,4.966,0,0,0,3.535-1.464L22.853,6.271A3.626,3.626,0,0,0,22.853,1.148ZM5.174,21.122A3.022,3.022,0,0,1,3.053,22H2V20.947a2.98,2.98,0,0,1,.879-2.121L15.222,6.483l2.3,2.3ZM21.438,4.857,18.932,7.364l-2.3-2.295,2.507-2.507a1.623,1.623,0,1,1,2.295,2.3Z"/></svg>
          </button>
          </Link>
          <button className='delete-contact-btn' onClick={showDeleteAlert}>
            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
          </button>
        </div>
    </div>
    
  )
}

export default Contact