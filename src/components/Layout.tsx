import Image from 'next/image';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';

const Layout: React.FC<{ children: any }> = ({ children }) => {
	return (
		<div className="mx-auto max-w-full md:max-w-xl px-4 md:px-0">
			<Toaster />
			<div className="py-4 flex justify-center items-center">
				<Image
					src="/logo.png"
					alt="logo for ContactApp"
					width="315"
					height="100"
				/>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default Layout;
