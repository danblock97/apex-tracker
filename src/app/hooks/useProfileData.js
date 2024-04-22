import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const useProfileData = () => {
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
				.then((data) => {
					setProfileData(data.profile);
				})
				.catch((error) => {
					setError(error.message || "Failed to fetch data");
				});
		}
	}, [router.query, platform, platformUserIdentifier]);

	return { profileData, error };
};

export default useProfileData;
