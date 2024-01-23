import { createContext } from "react";

export const ContactContext = createContext({
    loading : false,
    setLoading : ()=>{},
    contact : {},
    setConact : ()=>{},
    contacts : [],
    relations : [],
    setForceRender : ()=>{},
    setDeleteAlert: ()=>{},
    setFiltredContacts: ()=>{},
    filtredContacts: ()=>{}
})