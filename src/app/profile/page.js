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

	return (
		<div className="container mx-auto px-4 py-8">
			{profileData ? (
				<>
					<section className="mb-8">
						<div className="bg-gray-900 text-white rounded-lg shadow-md p-6 md:p-8">
							<div className="flex flex-col md:flex-row items-center">
								<div className="mb-4 md:mb-0 md:mr-8 flex-shrink-0">
									<Image
										src={profileData.platformInfo.avatarUrl}
										alt={`${profileData.platformInfo.platformUserHandle}'s Avatar`}
										width={128}
										height={128}
										className="rounded-full"
									/>
								</div>
								<div>
									<h2 className="text-3xl font-semibold">
										{profileData.platformInfo.platformUserHandle}
									</h2>
									<p className="text-gray-400 text-lg">
										{profileData.platformInfo.platformSlug.toUpperCase()}
									</p>
									<p className="text-lg mt-2">
										{profileData.metadata.activeLegendName}
									</p>
								</div>
							</div>
						</div>
					</section>

					<section className="mb-8">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
										className="bg-gray-900 text-white rounded-lg shadow-md p-6"
									>
										<div className="flex items-center mb-4">
											<div className="mr-4">
												<Image
													src={segment.metadata.imageUrl}
													alt={segment.metadata.name}
													width={32}
													height={32}
												/>
											</div>
											<div>
												<p className="text-lg font-semibold">
													{segment.metadata.name}
												</p>
												{Object.entries(segment.stats).map(([key, stat]) => (
													<p key={key} className="text-sm">
														<span className="text-gray-400">
															{stat.displayName}:{" "}
														</span>
														<span>{stat.displayValue}</span>
													</p>
												))}
											</div>
										</div>
									</div>
								))}
						</div>
					</section>

					<section>
						<h3 className="text-xl font-semibold mb-4">Other Stats</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							{/* Render the remaining stats similarly */}
							{/* Adjust the layout for mobile responsiveness */}
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

export default ProfilePage;
