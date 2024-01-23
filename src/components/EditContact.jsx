import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddContactImg from '../assets/man-taking-note.png';
import { getContact } from '../services/contactServices';
import { ContactContext } from './ContactContext';
import { updateContact } from '../services/contactServices';
import Spinner from './Spinner';

const EditContact = ({showPopUp, relations, sexs}) => {

    // States
    const [contactValues , setContactValues] = useState({
        name: "", 
        family: "", 
        email: "", 
        phone: "", 
        sex: "", 
        relation: "", 
        address: "",
        about: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const {contactId} = useParams();
    const {loading , setLoading, setForceRender} = useContext(ContactContext);

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: contactData } = await getContact(contactId);
                setContactValues(contactData);
                setLoading(false);
            } catch(err) {
                console.log(err);
                setLoading(false);
            }
        
        }

        fetchData();

    }, []);


    //  OnChange input
    const changeInputHandler = (e) => {

        const {name, value} = e.target;
        lengthCounterHandler(e);
        // Set input value to contactValues state
        setContactValues({...contactValues, [name] : value});

    }


    // Update length-counter span when input length change
    const lengthCounterHandler = (e) => {

        const {name, value, minLength} = e.target;
        // Get next element of input (span tag)
        const spanElement = e.target.nextElementSibling.firstElementChild;
        // Check if email input has correct value, then change the svg tag
        if(name === "email") {
            const regEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if(!regEmail.test(value)) {
                spanElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="m15.707,9.707l-2.293,2.293,2.293,2.293c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293,2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.293,2.293,2.293-2.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414Zm8.293,2.293c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-2,0c0-5.514-4.486-10-10-10S2,6.486,2,12s4.486,10,10,10,10-4.486,10-10Z"/></svg>';
                spanElement.style.fill = "red";
            } else {
                spanElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="m18.214,9.098c.387.394.381,1.027-.014,1.414l-4.426,4.345c-.783.768-1.791,1.151-2.8,1.151-.998,0-1.996-.376-2.776-1.129l-1.899-1.867c-.394-.387-.399-1.02-.012-1.414.386-.395,1.021-.4,1.414-.012l1.893,1.861c.776.75,2.001.746,2.781-.018l4.425-4.344c.393-.388,1.024-.381,1.414.013Zm5.786,2.902c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-2,0c0-5.514-4.486-10-10-10S2,6.486,2,12s4.486,10,10,10,10-4.486,10-10Z"/></svg>';
                spanElement.style.fill = "green";
            }
        } 
        // Check the other input except email
        else {
            // Set span tag to length of input value
            spanElement.innerHTML = value.length;
            if(value.length < minLength) {
                spanElement.style.color = "red";
            } else {
                spanElement.style.color = "green";
            }
        }
        
    }


    // Show length-counter span when input focus
    const showLengthCounter = (e) => {

        const pElement = e.target.nextElementSibling;
        pElement.style.visibility = "visible";


    }


    // Remove length-counter span when input blur
    const removeLengthCounter = (e) => {

        const pElement = e.target.nextElementSibling;
        pElement.style.visibility = "hidden";

    }
    
    // OnChange select elements
    const selcetChangeHandler = (e) => {

        const {name, value} = e.target;
        setContactValues({...contactValues, [name] : value});
        // Set style
        if(value !== ""){
            e.target.style.color = "white";
            e.target.style.fontSize = "15px";
        } else {
            e.target.style.color = "rgba(255, 255, 255, 0.622)";
            e.target.style.fontSize = "12px";
        }

    }

    // OnSubmit form
    const submitHandler = async (e) => {
        
        e.preventDefault();
        // Call validation function and return errors objcet in validate func to errors constant
        const errors = validation(contactValues);
        setFormErrors(errors);
        // If errors object has empty (no error)
        if(Object.keys(errors).length === 0) {
            try {
                // Send contactValues to server
                setLoading(true);
                const {status} = await updateContact(contactValues, contactId);
                if(status === 200){
                    setForceRender(prevForceRender => !prevForceRender);
                    // Back to contacts page
                    setLoading(false);
                    // Change showPopUp function in App.js for render the showPopUp component
                    showPopUp(true, "Contact Edit Successful");
                    navigate('/contacts');
                }
                
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        }

    }
    

    // Validate inputs
    const validation = (values) => {

        let errors = {};
        const regPhone = /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/;
        const regEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        // Conditions
        if(!values.name) 
            errors.name = "Name is required!";

        if(!values.family)
            errors.family = "Family is required!";
        
        if(!values.phone)
            errors.phone = "Phone is required!";
        
        else if(!regPhone.test(values.phone))
            errors.phone = "Phone is not valid!";
        
        if(!values.sex)
            errors.sex = "Sex is required!";
        
        if(!values.relation) 
            errors.relation = "Relation is required!";
        
        // Delete email key if is empty (not required)
        if(values.email.length === 0)
            delete errors.email;
        
        else if( !regEmail.test(values.email) ) 
            errors.email = "Email is not valid!";
        
        return errors;

    }


    // ! DOM
    return (

        loading ? <Spinner />
        :
        <div className='EditContact'>
            <div className='addContact-gif'>
                <h1 className='title'>Edit Contact</h1>
                <img src={AddContactImg} alt="" />
            </div>
            <div className='form'>
                <form onSubmit={submitHandler}>
                    <div className='inputs'>
                        <div>
                            <label htmlFor="name"><span>*</span> Name: </label>
                            <input type="text" name="name"
                                className={formErrors.name ? "inputError" : null}
                                placeholder='John etc.' 
                                maxLength="15"
                                minLength="3" 
                                value={contactValues.name}
                                onChange={changeInputHandler}
                                onFocus={showLengthCounter}
                                onBlur={removeLengthCounter}
                                autoComplete="off"/>
                            <p className="length-counter">
                                <span
                                    style={{color: 'green'}}>{contactValues.name.length}</span>
                                /15
                            </p>
                            <p className='error'>{formErrors.name}</p>
                        </div>
                        <div>
                            <label htmlFor="family"><span>*</span> Family: </label>
                            <input type="text" name="family" 
                                className={formErrors.family ? "inputError" : null}
                                placeholder='Smith etc.'
                                maxLength="15"
                                minLength="3" 
                                value={contactValues.family}
                                onChange={changeInputHandler}
                                onFocus={showLengthCounter}
                                onBlur={removeLengthCounter}
                                autoComplete="off"/>
                            <p className="length-counter">
                                <span
                                    style={{color: 'green'}}>{contactValues.family.length}</span>
                                /15
                            </p>
                            <p className='error'>{formErrors.family}</p>
                        </div>
                        <div>
                            <label htmlFor="email">Email: </label>
                            <input type="text" name="email" 
                            className={formErrors.email ? "inputError" : null}
                                placeholder='example@gmail.com'
                                value={contactValues.email}
                                onChange={changeInputHandler}
                                onFocus={showLengthCounter}
                                onBlur={removeLengthCounter}
                                autoComplete="off"/>
                            <p className='length-counter'>
                                <span style={{fill: contactValues.email? 'green' : 'red'}}>
                                {contactValues.email ? 
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="m18.214,9.098c.387.394.381,1.027-.014,1.414l-4.426,4.345c-.783.768-1.791,1.151-2.8,1.151-.998,0-1.996-.376-2.776-1.129l-1.899-1.867c-.394-.387-.399-1.02-.012-1.414.386-.395,1.021-.4,1.414-.012l1.893,1.861c.776.75,2.001.746,2.781-.018l4.425-4.344c.393-.388,1.024-.381,1.414.013Zm5.786,2.902c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-2,0c0-5.514-4.486-10-10-10S2,6.486,2,12s4.486,10,10,10,10-4.486,10-10Z"/></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="m15.707,9.707l-2.293,2.293,2.293,2.293c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293,2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.293,2.293,2.293-2.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414Zm8.293,2.293c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-2,0c0-5.514-4.486-10-10-10S2,6.486,2,12s4.486,10,10,10,10-4.486,10-10Z"/></svg>
                                }
                                </span>
                            </p>
                            <p className='error'>{formErrors.email}</p>
                        </div>
                        <div>
                            <label htmlFor="phone"><span>*</span> Phone: </label>
                            <input type="text" name="phone" 
                                className={formErrors.phone ? "inputError" : null}
                                placeholder='09150000000'
                                value={contactValues.phone}
                                maxLength="11"
                                minLength="11"
                                onChange={changeInputHandler} 
                                onFocus={showLengthCounter}
                                onBlur={removeLengthCounter}
                                autoComplete="off"/>
                            <p className="length-counter">
                                <span
                                    style={{color: 'green'}}>{contactValues.phone.length}</span>
                                /11
                            </p>
                            <p className='error'>{formErrors.phone}</p>
                        </div>
                        <div>
                            <label htmlFor="address">Address: </label>
                            <input type="text" name="address" 
                                placeholder='Iran, Mashhad'
                                value={contactValues.address}
                                maxLength="20"
                                minLength="5" 
                                onChange={changeInputHandler}
                                onFocus={showLengthCounter}
                                onBlur={removeLengthCounter}
                                autoComplete="off"/>
                            <p className="length-counter">
                                <span
                                    style={{color: contactValues.address? 'green' : 'red'}}>{contactValues.address.length}</span>
                                /20
                            </p>
                        </div>
                        <div>
                            <label htmlFor="relation"><span>*</span> Relation: </label>
                            <select 
                                style={{color: 'white', fontSize: '15px'}}
                                value={contactValues.relation}
                                className={formErrors.relation ? "inputError" : null}
                                name="relation"
                                onChange={selcetChangeHandler}>
                                    <option value="" style={{color: "rgba(255, 255, 255, 0.622)"}}>Select Relation...</option>
                                    {
                                        // Get Relations from App.js and put in option tags
                                        relations.map((relation) => (<option key={relation.id} value={relation.id}>{relation.name}</option>))
                                    }
                            </select>
                            <p className='error'>{formErrors.relation}</p>
                        </div>
                        <div>
                            <label htmlFor="sex"><span>*</span> Sex: </label>
                            <select 
                                name="sex"
                                style={{color: 'white', fontSize: '15px'}}
                                className={formErrors.sex ? "inputError" : null}
                                value={contactValues.sex}
                                onChange={selcetChangeHandler}>
                                    <option value="" style={{color: "rgba(255, 255, 255, 0.622)"}}>Select Sex...</option>
                                    {
                                        sexs.map((sex) => (<option key={sex.id} value={sex.name.toLowerCase()}>{sex.name}</option>))
                                    }
                            </select>
                            <p className='error'>{formErrors.sex}</p>
                        </div>
                        <div>
                            <label htmlFor="about">About: </label>
                            <input type="text" name="about"
                                placeholder='Write About Your Contant ...'
                                value={contactValues.about}
                                maxLength="50"
                                minLength="5" 
                                onChange={changeInputHandler}
                                onFocus={showLengthCounter}
                                onBlur={removeLengthCounter}
                                autoComplete="off"/>
                            <p className="length-counter">
                                <span
                                    style={{color: contactValues.about? 'green' : 'red'}}>{contactValues.about.length}</span>
                                /50
                            </p>
                        </div> 
                    </div>
                    <div className='create-back-btn'>
                        <input value='Edit' type='submit' className='create-btn' />
                        <Link to="/"><button className='back-btn'>Back</button></Link>
                    </div>
                </form>
            </div>
        </div>
    
    );
}

export default EditContact;