import axios from 'axios';

const apiUrl = '/api/contacts';

export const createContact = async (contactData: Contact) => {
	try {
		const response = await axios.post('/api/contacts', contactData, {});
		if (response.status === 409) {
			throw new Error(response.data.message); // Lanza una excepción con el mensaje de error del servidor
		}
		return response;
	} catch (error) {
		throw error;
	}
};

export const getContacts = async (searchTerm: string = '') => {
	try {
		const response = await axios.get(
			`${apiUrl}${searchTerm ? `?search=${searchTerm}` : ''}`
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching contacts:', error);
		throw error;
	}
};

export const updateContact = async (contactData: Contact) => {
	try {
		const response = await axios.put(`${apiUrl}`, contactData);
		if (response.status === 409) {
			throw new Error(response.data.message); // Lanza una excepción con el mensaje de error del servidor
		}
		return response;
	} catch (error) {
		console.error('Error updating contact:', error);
		throw error;
	}
};

export const deleteContact = async (id: number) => {
	try {
		const response = await axios.delete(`${apiUrl}`, { data: { id } });
		return response.data;
	} catch (error) {
		console.error('Error deleting contact:', error);
		throw error;
	}
};
