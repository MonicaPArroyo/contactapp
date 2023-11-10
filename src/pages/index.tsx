import ContactList from '@/components/ContactList';
import HandleContact from '@/components/HandleContact';
import SearchBar from '@/components/SearchBar';
import UserPlusIcon from '@/icons/UserPlusIcon';
import { Button } from '@nextui-org/react';
import { getContacts } from '@services/contactService';
import { RootState, setContacts } from '@store/slices';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
	const dispatch = useDispatch();
	const contacts = useSelector((state: RootState) => state.contacts);
	const [isModalOpen, setIsModalOpen] = useState(false);
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
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<title>Contact App</title>
				<meta
					name="description"
					content="A simple app to manage your contacts"
				/>
			</Head>
			<SearchBar onSearch={handleSearch} />
			<ContactList />
			<HandleContact
				isOpen={isModalOpen}
				onOpenChange={() => setIsModalOpen(false)}
			/>
			<div className="fixed bottom-4 right-4">
				<Button
					isIconOnly
					aria-label="Add New Contact"
					color="primary"
					size="lg"
					radius="full"
					onPress={() => setIsModalOpen(true)}
				>
					<UserPlusIcon />
				</Button>
			</div>
		</div>
	);
}
