import { useContext, useState } from "react"
import { ContactContext } from "./ContactContext"

const Navbar = () => {
  const {setFiltredContacts, contacts} = useContext(ContactContext)
  const [inputValue, setInputValue] = useState("")

  const changeInput = (e) => {
    const value = e.target.value
    setInputValue(value)
  }

  const searchContact = () => {
    const contactsFilter = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(inputValue.toLowerCase()) || contact.family.toLowerCase().includes(inputValue.toLowerCase()) || contact.phone.toLowerCase().includes(inputValue.toLowerCase())
    })
    setFiltredContacts(contactsFilter)
  }

  return (
    <div className='Navbar'>
      <div className='nav-container'>
        <h1 className="logo">Contact Manager</h1>
        <div className="search">
            <input type="text" placeholder='Find your contact...' value={inputValue} onChange={changeInput}/>
            <button onClick={searchContact}>
            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="15" height="15"><path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/></svg>
            </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar