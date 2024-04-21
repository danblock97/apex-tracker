"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const ProfilePage = () => {
	const [profileData, setProfileData] = useState(null);
	const [error, setError] = useState(null);
	const router = useRouter();

	const platform = useSearchParams().get("platform");
	const platformUserIdentifier = useSearchParams().get("identifier");

	useEffect(() => {
		if (platform && platformUserIdentifier) {
			fetch(
				`/api/profile?platform=${platform}&platformUserIdentifier=${platformUserIdentifier}`
			)
				.then((response) => {
					if (!response.ok) throw new Error("Failed to fetch");
					return response.json();
				})
				.then((data) => setProfileData(data.data))
				.catch((error) => {
					setError(error.message || "Failed to fetch data");
				});
		}
	}, [router.query, platform, platformUserIdentifier]);

	const peakRankScore = profileData?.segments[0]?.stats.peakRankScore;

	const filteredStats = profileData
		? Object.entries(profileData.segments[0].stats).filter(
				([key]) => key !== "peakRankScore" && key !== "lifetimePeakRankScore"
		  )
		: [];

	// Get the current rank score to display separately
	const currentRankScore = profileData?.segments[0]?.stats.rankScore;

	return (
		<div className="min-h-screen bg-gray-700">
			{" "}
			{profileData ? (
				<>
					{/* Hero section */}
					<section className="relative mb-8 rounded-lg shadow-md overflow-hidden">
						<Image
							src="/images/heroImage1.webp"
							alt="Hero"
							layout="fill"
							objectFit="cover"
							quality={100}
							className="absolute inset-0 w-full h-full object-cover"
						/>
						<div className="relative bg-opacity-50 bg-black flex items-end p-4 h-[100px] md:h-[100px] lg:h-[200px]">
							{" "}
							<Image
								src={profileData.platformInfo.avatarUrl}
								alt="Player Icon"
								width={80}
								height={80}
								className="rounded-full"
							/>
							<div className="text-white ml-4">
								<h1 className="text-3xl font-bold">
									{profileData.platformInfo.platformUserHandle}
								</h1>
							</div>
						</div>
					</section>
					<section className="mb-8">
						<div className="relative bg-gray-900 text-white rounded-lg shadow-md overflow-hidden">
							<div className="bg-red-800 bg-opacity-90 px-6 py-4 flex justify-between items-center">
								<div className="flex items-center space-x-4">
									<Image
										src={currentRankScore.metadata.iconUrl}
										alt="Rank Icon"
										width={40}
										height={40}
									/>
									<div className="border-r border-gray-600 pr-4">
										<div className="text-sm font-medium">
											{currentRankScore.metadata.rankName}
										</div>
										<div className="text-2xl font-bold">
											{currentRankScore.displayValue} RP
										</div>
										<div className="text-xs">
											#{currentRankScore.rank} - Top{" "}
											{currentRankScore.percentile}%
										</div>
									</div>
									{peakRankScore && (
										<div className="flex items-center pl-4">
											<Image
												src={peakRankScore.metadata.iconUrl}
												alt="Peak Rank Icon"
												width={40}
												height={40}
											/>
											<div className="ml-3">
												<div className="text-sm font-medium">Peak Rank</div>
												<div className="text-sm font-medium">
													{peakRankScore.metadata.rankName}
												</div>
												<div className="text-2xl font-bold">
													{peakRankScore.displayValue} RP
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
							<div className="px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
								{filteredStats.map(([key, value], index) => (
									<div
										key={key}
										className={`flex border-l border-gray-700 ${
											index < 4
												? "bg-gray-800 p-4 rounded-lg shadow-lg"
												: "pt-4"
										} pl-4`}
									>
										<div className="flex flex-col items-start w-full">
											<div className="text-xs uppercase tracking-wide">
												{value.displayName}
											</div>
											<div className="text-lg font-bold">
												{value.displayValue}
											</div>
											<div className="text-xs">
												{value.percentile ? `Top ${value.percentile}%` : "..."}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>
					{/* ... other sections ... */}
				</>
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default ProfilePage;
