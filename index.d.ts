type Contact = {
	id?: number;
	name: string;
	age: number;
	phone: string;
	email: string;
	nickname?: string;
};

type ContactState = {
	contacts: Contact[] | null;
};
