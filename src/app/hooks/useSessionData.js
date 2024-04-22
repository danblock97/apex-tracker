import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const useSessionData = () => {
	const [sessionData, setSessionData] = useState(null);
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
					setSessionData(data.sessions);
				})
				.catch((error) => {
					console.error("Error fetching session data:", error);
				});
		}
	}, [router.query, platform, platformUserIdentifier]);

	return { sessionData };
};

export default useSessionData;
