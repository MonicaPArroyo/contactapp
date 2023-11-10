import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextApiRequestQuery } from 'next/dist/server/api-utils';

const prisma = new PrismaClient();

async function checkIfEmailExists(email: string, id?: number) {
	const existingContact = await prisma.contact.findFirst({
		where: {
			email,
		},
	});
	if (existingContact && existingContact.id !== id) {
		return true;
	}
	return false;
}

async function checkIfPhoneExists(phone: string, id?: number) {
	const existingContact = await prisma.contact.findFirst({
		where: {
			phone,
		},
	});
	if (existingContact && existingContact.id !== id) {
		return true;
	}
	return false;
}

const createContact = async (data: Contact, res: NextApiResponse) => {
	try {
		const { name, age, phone, email, nickname } = data;
		const emailExist = await checkIfEmailExists(email);
		if (emailExist) {
			throw new Error('Email already exists');
		} else {
			const phoneExist = await checkIfPhoneExists(phone);
			if (phoneExist) {
				throw new Error('Phone already exists');
			} else {
				try {
					const contact = await prisma.contact.create({
						data: {
							name,
							age,
							phone,
							email,
							nickname,
						},
					});
					res.status(204).end();
				} catch (error: any) {
					console.log(error);
					res.status(500).json({
						error,
						message: 'Error creating contact',
					});
				}
			}
		}
	} catch (error: any) {
		res.status(409).json({ message: error.message });
	}
};

const getContacts = async (
	query: NextApiRequestQuery,
	res: NextApiResponse
) => {
	const { search } = query;
	let contacts;

	if (search) {
		if (!isNaN(Number(search))) {
			contacts = await prisma.contact.findMany({
				where: {
					OR: [
						{
							age: { equals: parseInt(search.toString()) },
						},
						{
							phone: { contains: search.toString() },
						},
					],
				},
			});
		} else {
			contacts = await prisma.contact.findMany({
				where: {
					email: { contains: search.toString() },
				},
			});
		}
	} else {
		contacts = await prisma.contact.findMany();
	}

	res.status(200).json(contacts);
};

const updateContact = async (data: Contact, res: NextApiResponse) => {
	try {
		const { id, name, age, phone, email, nickname } = data;
		const emailExist = await checkIfEmailExists(email, id);
		if (emailExist) {
			throw new Error('Email already exists');
		} else {
			const phoneExist = await checkIfPhoneExists(phone, id);
			if (phoneExist) {
				throw new Error('Phone already exists');
			} else {
				const contact = await prisma.contact.update({
					where: { id },
					data: { name, age, phone, email, nickname },
				});
				if (contact) {
					res.status(204).end();
				} else {
					res.status(404).json({ message: 'Contact not found' });
				}
			}
		}
	} catch (error: any) {
		res.status(409).json({ message: error.message });
	}
};

const deleteContact = async (id: number, res: NextApiResponse) => {
	const contact = await prisma.contact.delete({
		where: { id },
	});
	res.status(200).json(contact);
};

/**
 * Handles HTTP requests for creating, reading, updating and deleting contacts.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A Promise that resolves to void.
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		createContact(req.body, res);
	} else if (req.method === 'GET') {
		getContacts(req.query, res);
	} else if (req.method === 'PUT') {
		updateContact(req.body, res);
	} else if (req.method === 'DELETE') {
		const { id } = req.body;
		deleteContact(id, res);
	} else {
		res.status(400).json({ message: 'Invalid HTTP method' });
	}
}
