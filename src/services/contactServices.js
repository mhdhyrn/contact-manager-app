import axios from "axios";

const SERVER_URL = "http://localhost:9000"

export const getAllContacts = () => {
    const url = `${SERVER_URL}/contacts`
    return axios.get(url)
}

export const getContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.get(url)
}

export const getAllRels = () => {
    const url = `${SERVER_URL}/relations`
    return axios.get(url)
}

export const getSexs = () => {
    const url = `${SERVER_URL}/sexs`
    return axios.get(url)
}

export const getRel = (relId) => {
    const url = `${SERVER_URL}/relations/${relId}`
    return axios.get(url)
}

export const createContact = (contact) => {
    const url = `${SERVER_URL}/contacts`
    return axios.post(url, contact)
}

export const updateContact = (contact , contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.put(url, contact)
}

export const deleteContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.delete(url)
}