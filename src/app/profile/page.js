"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
	const [profileData, setProfileData] = useState(null);
	const [sessionData, setSessionData] = useState(null);
	const [visibleSessions, setVisibleSessions] = useState(3);
	const [error, setError] = useState(null);
	const router = useRouter();

	const platform = useSearchParams().get("platform");
	const platformUserIdentifier = useSearchParams().get("identifier");

	const loadMoreSessions = () => {
		setVisibleSessions((prevVisibleSessions) => prevVisibleSessions + 3);
	};

	useEffect(() => {
		if (platform && platformUserIdentifier) {
			fetch(
				`/api/profile?platform=${platform}&platformUserIdentifier=${platformUserIdentifier}`
			)
				.then((response) => {
					if (!response.ok) throw new Error("Failed to fetch");
					return response.json();
				})
				.then((data) => {
					setProfileData(data.profile);
					setSessionData(data.sessions);
				})
				.catch((error) => {
					setError(error.message || "Failed to fetch data");
				});
		}
	}, [router.query, platform, platformUserIdentifier]);

	const peakRankScore = profileData?.segments?.[0]?.stats?.peakRankScore || {};

	const filteredStats = profileData
		? Object.entries(profileData.segments?.[0]?.stats || {}).filter(
				([key]) => key !== "peakRankScore" && key !== "lifetimePeakRankScore"
		  )
		: [];

	const currentRankScore = profileData?.segments?.[0]?.stats?.rankScore || {};

	const RankScoreChange = ({ value }) => {
		const isPositive = value >= 0;
		const className = `text-lg font-bold ${
			isPositive ? "text-green-400" : "text-red-400"
		}`;
		const displayValue = isPositive ? `+${value}` : value;
		return <span className={className}>{displayValue}</span>;
	};

	const getRelativeTime = (date) => {
		const seconds = Math.floor((new Date() - new Date(date)) / 1000);
		let interval = seconds / 31536000;

		if (interval > 1) {
			return Math.floor(interval) + " years ago";
		}
		interval = seconds / 2592000;
		if (interval > 1) {
			return Math.floor(interval) + " months ago";
		}
		interval = seconds / 86400;
		if (interval > 1) {
			return Math.floor(interval) + " days ago";
		}
		interval = seconds / 3600;
		if (interval > 1) {
			return Math.floor(interval) + " hours ago";
		}
		interval = seconds / 60;
		if (interval > 1) {
			return Math.floor(interval) + " minutes ago";
		}
		return Math.floor(seconds) + " seconds ago";
	};

	return (
		<div className="min-h-screen bg-gray-700 overflow-hidden">
			{profileData ? (
				<>
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
							{profileData?.platformInfo?.avatarUrl ? (
								<Image
									src={profileData.platformInfo.avatarUrl}
									alt="Player Icon"
									width={80}
									height={80}
									className="rounded-full"
								/>
							) : (
								<div className="bg-gray-400 rounded-full w-20 h-20"></div> // Fallback avatar placeholder
							)}
							<div className="text-white ml-4">
								<h1 className="text-3xl font-bold">
									{profileData.platformInfo.platformUserHandle ||
										"Unknown Player"}
								</h1>
							</div>
						</div>
					</section>
					<section className="mb-8">
						<div className="relative bg-gray-900 text-white rounded-lg shadow-md overflow-hidden">
							<div className="bg-red-800 bg-opacity-90 px-6 py-4 flex justify-between items-center">
								<div className="flex items-center space-x-4">
									{currentRankScore.metadata?.iconUrl ? (
										<Image
											src={currentRankScore.metadata.iconUrl}
											alt="Rank Icon"
											width={40}
											height={40}
										/>
									) : (
										<div className="bg-gray-400 rounded-full w-10 h-10"></div> // Fallback icon placeholder
									)}
									<div className="border-r border-gray-600 pr-4">
										<div className="text-sm font-medium">
											{currentRankScore.metadata?.rankName || "Unranked"}
										</div>
										<div className="text-2xl font-bold">
											{currentRankScore.displayValue || "0"} RP
										</div>
										<div className="text-xs">
											#{currentRankScore.rank || "N/A"} - Top{" "}
											{currentRankScore.percentile || "0"}%
										</div>
									</div>
									{peakRankScore.value ? (
										<div className="flex items-center pl-4">
											{peakRankScore.metadata?.iconUrl ? (
												<Image
													src={peakRankScore.metadata.iconUrl}
													alt="Peak Rank Icon"
													width={40}
													height={40}
												/>
											) : (
												<div className="bg-gray-400 rounded-full w-10 h-10"></div> // Fallback icon placeholder
											)}
											<div className="ml-3">
												<div className="text-sm font-medium">Peak Rank</div>
												<div className="text-sm font-medium">
													{peakRankScore.metadata?.rankName || "Unranked"}
												</div>
												<div className="text-2xl font-bold">
													{peakRankScore.displayValue || "0"} RP
												</div>
											</div>
										</div>
									) : null}
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
					<section className="mb-8">
						<div className="relative bg-gray-900 text-white rounded-lg shadow-md overflow-hidden">
							<div className="bg-red-800 bg-opacity-90 px-6 py-4 flex justify-between items-center">
								<h2 className="text-xl font-semibold">Top Legends</h2>
							</div>
							<div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
								{profileData.segments
									.filter(
										(segment) =>
											segment.type !== "overview" &&
											segment.metadata &&
											segment.stats
									)
									.slice(0, 3) // Display only the first 3 legend stats
									.map((segment, index) => (
										<div
											key={index}
											className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
										>
											<div className="p-4">
												<div className="flex items-center mb-4">
													<div className="mr-4">
														{segment.metadata.portraitImageUrl ? (
															<Image
																src={segment.metadata.portraitImageUrl}
																alt={segment.metadata.name}
																width={48}
																height={48}
															/>
														) : (
															<div className="bg-gray-400 rounded-full w-12 h-12"></div> // Fallback image placeholder
														)}
													</div>
													<div>
														<p className="text-lg font-semibold">
															{segment.metadata.name}
														</p>
														{Object.entries(segment.stats).map(
															([key, stat]) => (
																<p key={key} className="text-sm">
																	<span className="text-gray-400">
																		{stat.displayName}:{" "}
																	</span>
																	<span>{stat.displayValue}</span>
																</p>
															)
														)}
													</div>
												</div>
											</div>
										</div>
									))}
							</div>
						</div>
					</section>
					<section className="mb-8">
						<div className="relative bg-gray-900 text-white rounded-lg shadow-md overflow-hidden">
							<div className="bg-red-800 bg-opacity-90 px-6 py-4 flex justify-between items-center">
								<h2 className="text-xl font-semibold">Recent Matches</h2>
							</div>
							<div className="p-6">
								{sessionData &&
								Array.isArray(sessionData.items) &&
								sessionData.items.length > 0 ? (
									sessionData.items
										.slice(0, visibleSessions)
										.map((session, sessionIndex) => (
											<div key={sessionIndex} className="mb-4">
												<div className="bg-gray-700 px-4 py-2 rounded-t-md">
													<h3 className="text-lg font-semibold">
														Session Overview
													</h3>
													<span className="text-sm font-medium">
														{getRelativeTime(session.metadata.startDate.value)}
													</span>
												</div>
												{session.matches.map((match, matchIndex) => (
													<div
														key={matchIndex}
														className="bg-gray-800 p-4 rounded-lg shadow-lg mb-2 flex flex-col md:flex-row justify-between items-center"
													>
														<div className="flex items-center space-x-4 mb-4 md:mb-0">
															{match.metadata.characterIconUrl?.value ? (
																<Image
																	src={match.metadata.characterIconUrl.value}
																	alt={match.metadata.character.displayValue}
																	className="w-12 h-12 rounded-full"
																	width={48}
																	height={48}
																/>
															) : (
																<div className="bg-gray-400 rounded-full w-12 h-12"></div> // Fallback character icon placeholder
															)}
															<div>
																<div
																	className="font-bold truncate"
																	style={{ maxWidth: "150px" }}
																>
																	{match.metadata.character.displayValue}
																</div>
																<div className="text-gray-400">
																	{getRelativeTime(
																		match.metadata.endDate.value
																	)}
																</div>
															</div>
														</div>
														<div className="flex flex-col items-center">
															{match.stats.rankScore && (
																<>
																	<div className="font-bold">
																		{match.stats.rankScore.displayValue} RP{" "}
																		{match.stats.rankScoreChange && (
																			<RankScoreChange
																				value={
																					match.stats.rankScoreChange.value
																				}
																			/>
																		)}
																	</div>
																</>
															)}
														</div>
														<div className="flex flex-col items-end">
															<div>
																Level:{" "}
																{match.stats.level?.displayValue || "N/A"}
															</div>
															<div>
																Kills: {match.stats.kills?.displayValue || "0"}
															</div>
															<div>
																Damage:{" "}
																{match.stats.damage?.displayValue || "0"}
															</div>
															<div>
																Wins: {match.stats.wins?.displayValue || "0"}
															</div>
														</div>
													</div>
												))}
											</div>
										))
								) : (
									<p>
										Session data is not available or is not in the expected
										format.
									</p>
								)}
								{sessionData &&
									sessionData.items &&
									sessionData.items.length > visibleSessions && (
										<button
											onClick={loadMoreSessions}
											className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors"
										>
											Load More
										</button>
									)}
							</div>
						</div>
					</section>
				</>
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Profile;
