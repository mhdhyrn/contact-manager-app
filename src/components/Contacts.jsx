import { 
  Link  
} from "react-router-dom"

import Contact from "./Contact"
import Spinner from "./Spinner"
import Navbar from "./Navbar"

const Contacts = ({loading , contacts}) => {
  return (
    <>
    <Navbar />
    <div className='Contacts'>
      <div className="addContact-btn">
      <Link to={"/contacts/add"}>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="30" height="30"><path d="M23,11H21V9a1,1,0,0,0-2,0v2H17a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V13h2a1,1,0,0,0,0-2Z"/><path d="M9,12A6,6,0,1,0,3,6,6.006,6.006,0,0,0,9,12ZM9,2A4,4,0,1,1,5,6,4,4,0,0,1,9,2Z"/><path d="M9,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,9,14Z"/></svg>
        </button>
        </Link>
      </div>
      {
        loading ? 
          <Spinner /> 
        :
          (contacts.length > 0) ? 
            <>
              <div className="contacts-container">
                {
                  contacts.map((contact) => <Contact contact={contact} key={contact.id}/>)
                }
              </div>
            </>
          :
          <div>
            <h1 style={{color: '#6d6875'}}>You have no any contact!</h1>
          </div>
      }
    </div>
    </>
  )
}

export default Contacts