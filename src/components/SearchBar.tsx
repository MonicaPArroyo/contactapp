import SearchIcon from '@/icons/SearchIcon';
import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';

type SearchBarProps = {
	onSearch: (searchTerm: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = () => {
		onSearch(searchTerm);
	};

	return (
		<div className="px-2 py-4">
			<Input
				type="text"
				label="Search"
				labelPlacement="inside"
				placeholder="type to search..."
				isClearable
				radius="lg"
				startContent={<SearchIcon />}
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
					onSearch(e.target.value);
				}}
				onClear={() => {
					setSearchTerm('');
					onSearch('');
				}}
			/>
		</div>
	);
};

export default SearchBar;
