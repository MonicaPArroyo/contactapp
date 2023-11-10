import React, { useState } from 'react';
import {
	Modal,
	ModalContent,
	ModalBody,
	Button,
	Image,
} from '@nextui-org/react';
import { deleteContact, getContacts } from '@services/contactService';
import { useDispatch } from 'react-redux';
import { setContacts } from '@store/slices';
import toast from 'react-hot-toast';

const DeleteContact: React.FC<{
	id: Contact['id'];
	isOpen: boolean;
	onOpenChange: () => void;
}> = ({ id, isOpen, onOpenChange }) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const handleDelete = async () => {
		setIsLoading(true);
		try {
			const response = await deleteContact(id as number);
			const contacts = await getContacts();
			dispatch(setContacts(contacts));
			if (response.status === 200) {
				console.log('Contact deleted successfully');
			} else {
				console.error('Failed to delete contact');
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			toast.success('Contact created successfully', {
				style: {
					background: '#333',
					color: '#fff',
				},
			});
			setIsLoading(false);
			onOpenChange();
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			backdrop="blur"
			placement="top-center"
		>
			<ModalContent>
				{(onClose) => (
					<ModalBody>
						<div>
							<div className="flex flex-col justify-center items-center gap-4 py-2">
								<Image
									src="/images/delete.png"
									alt="Delete Image"
									width="152"
									height="154"
								/>
								<p>
									Are you sure you want to delete this
									contact?
								</p>
							</div>
							<div className="flex flex-col justify-center items-center gap-2 pb-2">
								<Button
									color="primary"
									variant="flat"
									radius="full"
									onPress={onClose}
								>
									Cancel
								</Button>
								<Button
									color="danger"
									variant="flat"
									radius="full"
									isLoading={isLoading}
									type="submit"
									onPress={() => {
										handleDelete();
									}}
								>
									Delete
								</Button>
							</div>
						</div>
					</ModalBody>
				)}
			</ModalContent>
		</Modal>
	);
};

export default DeleteContact;
