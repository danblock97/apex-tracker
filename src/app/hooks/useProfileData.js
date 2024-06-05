import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const useProfileData = () => {
	const [profileData, setProfileData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const platform = useSearchParams().get("platform");
	const platformUserIdentifier = useSearchParams().get("identifier");

	useEffect(() => {
		setIsLoading(true);
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
				}).finally(setIsLoading(false));;
		}
	}, [router.query, platform, platformUserIdentifier]);

	return { profileData, isLoading, error };
};

export default useProfileData;
