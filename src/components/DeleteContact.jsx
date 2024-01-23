import { useContext } from "react";
import { ContactContext } from "./ContactContext";
import {deleteContact} from '../services/contactServices'

const DeleteContact = ({contactName, contactId, showPopUp}) => {
    const {setDeleteAlert, setLoading, setForceRender} = useContext(ContactContext)

    const removeAlert = () => {
        setDeleteAlert({status: false, contactName: "", contactId: null})
    }
    const removeContact = async() => {
        setLoading(true)
        try {
            const response = await deleteContact(contactId)
            setDeleteAlert({status: false, contactName: "", contactId: null})
            setForceRender((prevForceRender) => !prevForceRender)
            setLoading(false)
            showPopUp(true, "Contact Delete Successful");
        } catch(err) {
            console.log(err)
        }
    }
    console.log(contactName, contactId)
    return (
        <div className="DeleteContact">
            <div className="container">
                <div className="alert">
                    <div className="title">
                        <h1>Are you sure to delete {contactName}?</h1>
                    </div>
                    <div className="btns">
                        <button className="cancleBtn" onClick={removeAlert}>Cancle</button>
                        <button className="deleteBtn" onClick={removeContact}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteContact;
