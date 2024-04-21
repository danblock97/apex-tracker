"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaXbox, FaPlaystation, FaSteam } from "react-icons/fa"; // Platform icons

const platformDetails = {
	xbl: {
		icon: <FaXbox className="text-green-600" />,
		placeholder: "Enter Xbox Live Gamertag",
	},
	psn: {
		icon: <FaPlaystation className="text-blue-600" />,
		placeholder: "Enter PlayStation Network ID",
	},
	origin: {
		icon: <FaSteam className="text-orange-600" />,
		placeholder: "Enter Origin Username",
	},
};

const SearchBar = () => {
	const [platform, setPlatform] = useState("xbl"); // Default to Xbox
	const [platformUserIdentifier, setPlatformUserIdentifier] = useState("");
	const router = useRouter();

	const handleSearch = () => {
		router.push(
			`/profile?platform=${platform}&identifier=${platformUserIdentifier}`
		);
	};

	return (
		<div className="flex flex-col sm:flex-row items-center justify-center p-4 bg-gray-800 rounded-lg">
			{/* Platform selection with icons */}
			<div className="flex justify-center sm:justify-start mb-4 sm:mb-0 sm:mr-2">
				{Object.entries(platformDetails).map(([key, { icon }]) => (
					<button
						key={key}
						className={`p-2 ${
							platform === key ? "text-green-500" : "text-gray-500"
						}`}
						onClick={() => setPlatform(key)}
					>
						{icon}
					</button>
				))}
			</div>

			{/* User identifier input */}
			<input
				className="flex-1 p-2 mb-4 sm:mb-0 sm:mr-2 border border-gray-300 rounded bg-gray-700 text-white placeholder-gray-400"
				type="text"
				placeholder={platformDetails[platform].placeholder}
				value={platformUserIdentifier}
				onChange={(e) => setPlatformUserIdentifier(e.target.value)}
			/>

			{/* Search button */}
			<button
				className="p-2 bg-blue-500 text-white rounded w-full sm:w-auto"
				onClick={handleSearch}
			>
				Search
			</button>
		</div>
	);
};

export default SearchBar;
