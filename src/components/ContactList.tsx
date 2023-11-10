import ContactCard from '@/components/ContactCard';
import { RootState } from '@store/slices';
import { useSelector } from 'react-redux';

const ContactList: React.FC = () => {
	const contacts = useSelector((state: RootState) => state.contacts);
	return (
		<ul className="flex flex-col justify-between gap-x-4">
			{contacts
				? contacts.map((contact) => (
						<ContactCard key={contact.name} {...contact} />
				  ))
				: null}
		</ul>
	);
};

export default ContactList;
