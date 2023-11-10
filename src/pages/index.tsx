import ContactList from '@/components/ContactList';
import SearchBar from '@/components/SearchBar';
import { getContacts } from '@services/contactService';
import { RootState, setContacts } from '@store/slices';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
	const dispatch = useDispatch();
	const contacts = useSelector((state: RootState) => state.contacts);
	const [searchTerm, setSearchTerm] = useState('');
	const loadContacts = async () => {
		try {
			const data = await getContacts(searchTerm);
			dispatch(setContacts(data));
		} catch (error) {
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		loadContacts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, searchTerm]);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};

	return (
		<div>
			<SearchBar onSearch={handleSearch} />
			<ContactList />
		</div>
	);
}
