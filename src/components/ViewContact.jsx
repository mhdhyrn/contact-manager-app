import { useParams, Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { getContact, getRel } from '../services/contactServices';
import { ContactContext } from './ContactContext';
import Spinner from "./Spinner";
import AvatarImage from '../assets/avatarImage.jpg';

const ViewContact = () => {

    const {contactId} = useParams();
    const {loading , setLoading} = useContext(ContactContext);
    const [getRelation, setRelation] = useState({});
    const [contactColor, setContactColor] = useState("")
    const [contactInfo , setContactInfo] = useState({
        name: "", 
        family: "", 
        email: "", 
        phone: "", 
        sex: "", 
        relation: "", 
        address: "",
        about: ""
    });




    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: contactData } = await getContact(contactId);
                const { data: relationData } = await getRel(contactData.relation);
                setContactInfo(contactData);
                setRelation(relationData);
                if(contactData.sex === "male")
                    setContactColor('#7bbfff');
    
                else if(contactData.sex === "female")
                    setContactColor('#ff96bd');
    
                else if(contactData.sex === "other")
                    setContactColor('#e5a86c');

                setLoading(false);
            } catch(err) {
                console.log(err);
                setLoading(false);
            }
        
        }

        fetchData();

    }, []);

    useEffect(()=>{

        
        
      }, [contactColor])


    return (
        <div className='ViewContact'>
            {
                loading ? <Spinner/>
                : 
                <>
                    <div className='container' style={{backgroundColor: `${contactColor} `}}>
                        <div className="contactImage">
                            <img src={AvatarImage} alt="" />
                        </div>
                        <div className="contactInfo">
                            <div className="side1">
                                <div>
                                    <span className='infoTitle'>Name: </span><span className='infoValue'>{contactInfo.name}</span>
                                </div>
                                <div>
                                    <span className='infoTitle'>Family: </span><span className='infoValue'>{contactInfo.family}</span>
                                </div>
                                <div>
                                    <span className='infoTitle'>Phone: </span><span className='infoValue'>{contactInfo.phone}</span>
                                </div> 
                                <div>
                                    <span className='infoTitle'>Sex: </span><span className='infoValue'>{contactInfo.sex}</span>
                                </div>
                            </div>
                            <div className="side2">
                                <div>
                                    <span className='infoTitle'>Email: </span><span className='infoValue'>{contactInfo.email ? contactInfo.email : "Email is not set!"}</span>
                                </div>
                                <div>
                                    <span className='infoTitle'>Relation: </span><span className='infoValue'>{getRelation.name}</span>
                                </div>
                                <div>
                                    <span className='infoTitle'>Address: </span><span className='infoValue'>{contactInfo.address ? contactInfo.address : "Address is not set!"}</span>
                                </div>
                                <div>
                                    <span className='infoTitle'>About: </span><span className='infoValue'>{contactInfo.about ? contactInfo.about : "About is not set!"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="backBtn">
                        <Link to="/contacts"><button>Back</button></Link>
                    </div>
                </>
            }
            
        </div>
    );
}

export default ViewContact;
