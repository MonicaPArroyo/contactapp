import {
	Avatar,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
} from '@nextui-org/react';
import React, { useState } from 'react';
import DeleteContact from './DeleteContact';
import HandleContact from './HandleContact';
import EditIcon from '@/icons/EditIcon';
import DeleteIcon from '@/icons/DeleteIcon';
import PhoneIcon from '@/icons/PhoneIcon';
import EmailIcon from '@/icons/EmailIcon';
const ContactCard: React.FC<Contact> = (props) => {
	const [isModalEditOpen, setIsModalEditOpen] = useState(false);
	const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

	return (
		<li className="m-2">
			<Card className=" rounded-2xl shadow-lg overflow-hidden p-4">
				<CardHeader>
					<div className="flex gap-5">
						<Avatar radius="full" size="lg" />
						<div className="flex flex-col  gap-1 items-start justify-center">
							<h4 className="text-lg font-semibold leading-none text-default-600">
								{props.name}
								{props.nickname ? ` (${props.nickname})` : ''}
							</h4>
							<h5 className="text-sm tracking-tight text-default-400 ">{`Age: ${props.age}`}</h5>
						</div>
					</div>
				</CardHeader>
				<CardBody className="px-3 py-0 text-sm text-default-400">
					<div className="pt-2 flex items-center">
						<span
							className="inline-block pr-2"
							aria-label="phone icon"
							role="img"
						>
							<PhoneIcon />
						</span>
						<span>{props.phone}</span>
					</div>
					<div className="pt-2 flex items-center">
						<span
							className="inline-block pr-2"
							aria-label="email icon"
							role="img"
						>
							<EmailIcon />
						</span>
						<span>{props.email}</span>
					</div>
				</CardBody>
				<CardFooter className="flex justify-end gap-4 px-3">
					<Button
						isIconOnly
						variant="flat"
						aria-label="Edit Contact"
						size="md"
						radius="full"
						onPress={() => setIsModalEditOpen(true)}
					>
						<EditIcon />
					</Button>
					<Button
						isIconOnly
						variant="flat"
						aria-label="Delete Contact"
						color="danger"
						size="md"
						radius="full"
						onPress={() => setIsModalDeleteOpen(true)}
					>
						<DeleteIcon />
					</Button>
				</CardFooter>
			</Card>
			<HandleContact
				isOpen={isModalEditOpen}
				onOpenChange={() => setIsModalEditOpen(false)}
				contactValues={props}
			/>
			<DeleteContact
				id={props.id}
				isOpen={isModalDeleteOpen}
				onOpenChange={() => setIsModalDeleteOpen(false)}
			/>
		</li>
	);
};

export default ContactCard;
