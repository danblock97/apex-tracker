"use client";

import ProfileHeader from "@/components/ProfileHeader";
import RankStats from "@/components/RankStats";
import LegendStats from "@/components/LegendStats";
import RecentMatches from "@/components/RecentMatches";
import { useState } from "react";
import useProfileData from "@/app/hooks/useProfileData";
import useSessionData from "@/app/hooks/useSessionData";

const ProfilePage = () => {
	const { profileData, error: profileError } = useProfileData();
	const { sessionData, error: sessionError } = useSessionData();
	const [visibleSessions, setVisibleSessions] = useState(3);

	const loadMoreSessions = () => {
		setVisibleSessions((prevVisibleSessions) => prevVisibleSessions + 3);
	};

	return (
		<div className="min-h-screen bg-gray-700 overflow-hidden">
			{profileData ? (
				<>
					<ProfileHeader profileData={profileData} />
					<RankStats profileData={profileData} />
					<LegendStats profileData={profileData} />

					<RecentMatches
						sessionData={sessionData}
						visibleSessions={visibleSessions}
						loadMoreSessions={loadMoreSessions}
					/>
				</>
			) : profileError ? (
				<p className="text-red-500">{profileError}</p>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default ProfilePage;
