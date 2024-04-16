"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
	const [platform, setPlatform] = useState("");
	const [platformUserIdentifier, setPlatformUserIdentifier] = useState("");
	const router = useRouter();

	const handleSearch = () => {
		// Navigate to the profile page with platform and platformUserIdentifier as parameters
		router.push(
			`/profile?platform=${platform}&identifier=${platformUserIdentifier}`
		);
	};

	return (
		<div className="flex items-center justify-center">
			<select
				className="mr-2 p-2 border border-gray-300 rounded"
				value={platform}
				onChange={(e) => setPlatform(e.target.value)}
			>
				<option value="">Select Platform</option>
				<option value="xbl">XBL</option>
				<option value="psn">PSN</option>
				<option value="origin">Origin</option>
			</select>
			<input
				className="mr-2 p-2 border border-gray-300 rounded"
				type="text"
				placeholder="Enter Platform User Identifier"
				value={platformUserIdentifier}
				onChange={(e) => setPlatformUserIdentifier(e.target.value)}
			/>
			<button
				className="p-2 bg-blue-500 text-white rounded"
				onClick={handleSearch}
			>
				Search
			</button>
		</div>
	);
};

export default SearchBar;
