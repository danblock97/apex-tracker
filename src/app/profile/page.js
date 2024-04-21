import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const ProfileDataComponent = dynamic(
	() => import("@/components/ProfileDataComponent"),
	{
		suspense: true,
		ssr: false, // This ensures the component is only rendered on the client-side
	}
);

const ProfilePage = () => {
	return (
		<div className="min-h-screen bg-gray-700 overflow-hidden">
			<Suspense fallback={<div>Loading profile data...</div>}>
				<ProfileDataComponent />
			</Suspense>
		</div>
	);
};

export default ProfilePage;
