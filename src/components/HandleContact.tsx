import React, { useState } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
} from '@nextui-org/react';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import {
	createContact,
	updateContact,
	getContacts,
} from '@services/contactService';
import { useDispatch } from 'react-redux';
import { setContacts } from '@store/slices';
import toast from 'react-hot-toast';

type IValues = {
	id: number | undefined;
	name: string;
	age: number;
	phone: string;
	email: string;
	nickname: string;
};

const HandleContact: React.FC<{
	isOpen: boolean;
	onOpenChange: () => void;
	contactValues?: Contact;
}> = ({ isOpen, onOpenChange, contactValues }) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const initialValues: IValues = {
		id: contactValues?.id,
		name: contactValues?.name || '',
		age: contactValues?.age || 18,
		phone: contactValues?.phone || '',
		email: contactValues?.email || '',
		nickname: contactValues?.nickname || '',
	};
	const validationSchema = Yup.object().shape({
		name: Yup.string().required().max(30),
		age: Yup.number().required().min(18),
		phone: Yup.string().required().length(10),
		email: Yup.string().required().email(),
		nickname: Yup.string().max(30),
	});

	const handleSubmit = async (values: IValues) => {
		setIsLoading(true);
		try {
			if (values.id) {
				const response = await updateContact(values);
				if (response.status === 204) {
					toast.success('Contact edited successfully', {
						style: {
							background: '#333',
							color: '#fff',
						},
					});
					console.log('Contact edited successfully');
				} else {
					console.error('Failed to edit contact');
				}
			} else {
				const response = await createContact(values);
				if (response.status === 204) {
					toast.success('Contact created successfully', {
						style: {
							background: '#333',
							color: '#fff',
						},
					});
					console.log('Contact created successfully');
				} else {
					console.error('Failed to create contact');
				}
			}
			const contacts = await getContacts();
			dispatch(setContacts(contacts));
			onOpenChange();
		} catch (error: any) {
			if (error.response && error.response.status === 409) {
				setErrorMessage(error.response.data.message);
				toast.error(error.response.data.message, {
					style: {
						background: '#333',
						color: '#fff',
					},
				});
			} else {
				console.error('Error:', error);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
			<ModalContent>
				{(onClose) => (
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ errors, touched, values }) => (
							<Form>
								<ModalHeader className="flex flex-col gap-1">
									{values.id ? 'Edit Contact' : 'New Contact'}
								</ModalHeader>
								<ModalBody>
									<Field
										as={Input}
										id="name"
										name="name"
										autoFocus
										label="Name"
										variant="bordered"
										isRequired
										isInvalid={
											!!errors.name && touched.name
										}
										errorMessage={
											touched.name && errors.name
										}
									/>
									<Field
										as={Input}
										id="age"
										name="age"
										label="Age"
										type="number"
										variant="bordered"
										isRequired
										isInvalid={!!errors.age && touched.age}
										errorMessage={touched.age && errors.age}
									/>
									<Field
										as={Input}
										id="phone"
										name="phone"
										label="Phone Number"
										variant="bordered"
										isRequired
										isInvalid={
											!!errors.phone && touched.phone
										}
										errorMessage={
											touched.phone && errors.phone
										}
									/>
									<Field
										as={Input}
										id="email"
										name="email"
										label="Email"
										variant="bordered"
										isRequired
										isInvalid={
											!!errors.email && touched.email
										}
										errorMessage={
											touched.email && errors.email
										}
									/>
									<Field
										as={Input}
										id="nickname"
										name="nickname"
										label="Nickname"
										variant="bordered"
										isInvalid={
											!!errors.nickname &&
											touched.nickname
										}
										errorMessage={
											touched.nickname && errors.nickname
										}
									/>
								</ModalBody>
								<ModalFooter>
									<Button
										color="danger"
										variant="flat"
										onPress={onClose}
									>
										Cancel
									</Button>
									<Button color="primary" type="submit">
										Save
									</Button>
								</ModalFooter>
							</Form>
						)}
					</Formik>
				)}
			</ModalContent>
		</Modal>
	);
};

export default HandleContact;
