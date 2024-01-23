import { 
  useState, 
  useEffect 
} from 'react';

import {ContactContext} from './components/ContactContext';

import { 
  Route, 
  Routes, 
  Navigate 
} from 'react-router-dom';

import {
  Contacts,
  EditContact,
  ViewContact,
  AddContact,
  PopUp,
  DeleteContact
} from './components';

import {
  getAllContacts, 
  getAllRels,
  getSexs
} from './services/contactServices'

import "./App.css";
import "./components/Style.scss"

const App = () => {

  const [contacts , setContacts] = useState([]);
  const [relations , setRelations] = useState([]);
  const [sexs , setSexs] = useState([]);
  const [loading , setLoading] = useState(true);
  const [popUp, setPopUp] = useState({status : false, message : ""});
  const [forceRender , setForceRender] = useState(false);
  const [filtredContacts, setFiltredContacts] = useState([])
  const [deleteAlert , setDeleteAlert] = useState({status : false, contactName : "", contactId : null})

  useEffect(() => {

    const fetchData = async () => {

      try {
        setLoading(true)
        const {data : contactsData} = await getAllContacts()
        const {data : relationsData} = await getAllRels()
        const {data : sexsData} = await getSexs();
        setContacts(contactsData)
        setFiltredContacts(contactsData)
        setRelations(relationsData)
        setSexs(sexsData)
        setLoading(false)
      } catch (err) {
        console.log(err.message)
        setLoading(false)
      }
      
    }

    fetchData();

  } , [])

  useEffect(() => {

    const fetchData = async () => {

      try {
        setLoading(true)
        const {data : contactsData} = await getAllContacts()
        const {data : relationsData} = await getAllRels()
        setContacts(contactsData)
        setFiltredContacts(contactsData)
        setRelations(relationsData)
        setLoading(false)
      } catch (err) {
        console.log(err.message)
        setLoading(false)
      }
      
    }

    fetchData();

  } , [forceRender])


  const showPopUpHandler = (status, message) => {
    setPopUp({status: status, message: message});
  }

  return (

    <ContactContext.Provider value={{
      loading,
      setLoading,
      contacts,
      relations,
      setForceRender,
      setDeleteAlert,
      setFiltredContacts,
      filtredContacts
    }}>
      <div className="App">
        {popUp.status && <PopUp showPopUp={showPopUpHandler} message={popUp.message}/>}
        {deleteAlert.status && <DeleteContact contactName={deleteAlert.contactName} contactId={deleteAlert.contactId} showPopUp={showPopUpHandler}/>}
        <Routes>
          <Route path='/' element={<Navigate to="/contacts" />} />
          <Route path='/contacts' element={<Contacts loading={loading} contacts={filtredContacts}/>}/>
          <Route path='/contacts/add' element={<AddContact showPopUp={showPopUpHandler} relations={relations} sexs={sexs}/>} />
          <Route path='/contacts/Edit/:contactId' element={<EditContact showPopUp={showPopUpHandler} relations={relations} sexs={sexs}/>} />
          <Route path='/contacts/:contactId' element={<ViewContact loading={loading} setLoading={setLoading}/>} />
        </Routes>
      </div>
    </ContactContext.Provider>

  );
}

export default App;
