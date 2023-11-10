import UserPlusIcon from '@/icons/UserPlusIcon';
import {
	Button,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	useDisclosure,
} from '@nextui-org/react';
import React, { useState } from 'react';
import HandleContact from '@/components/HandleContact';
import { Toaster } from 'react-hot-toast';

const Layout: React.FC<{ children: any }> = ({ children }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<div className="mx-auto max-w-full md:max-w-xl px-4 md:px-0">
			<Toaster />
			<div className="py-4 flex flex-row justify-between items-center">
				<div>
					{/* <Image
						src="/images/logo.png"
						alt="logo for ContactApp"
						width="64"
						height="64"
					/> */}
					<p className="font-bold text-xl text-white ml-2">
						ContactApp
					</p>
				</div>
				<div className="justify-end">
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
			<div>{children}</div>
			<HandleContact
				isOpen={isModalOpen}
				onOpenChange={() => setIsModalOpen(false)}
			/>
		</div>
	);
};

export default Layout;
