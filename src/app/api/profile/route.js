import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	const platform = req.nextUrl.searchParams.get("platform");
	const platformUserIdentifier = req.nextUrl.searchParams.get(
		"platformUserIdentifier"
	);

	if (!platform || !platformUserIdentifier) {
		res.status(400).send("Missing required parameters");
		return;
	}

	const profileResponse = await fetch(
		`https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${platformUserIdentifier}`,
		{
			headers: {
				"TRN-Api-Key": process.env.TRACKER_API_KEY,
			},
			revalidatePath: revalidatePath(req.nextUrl.pathname),
		}
	);

	if (!profileResponse.ok) {
		res.status(500).send("Failed to fetch profile data");
		return;
	}

	const sessionResponse = await fetch(
		`https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${platformUserIdentifier}/sessions`,
		{
			headers: {
				"TRN-Api-Key": process.env.TRACKER_API_KEY,
			},
			revalidatePath: revalidatePath(req.nextUrl.pathname),
		}
	);

	if (!sessionResponse.ok) {
		res.status(500).send("Failed to fetch session data");
		return;
	}

	const profileData = await profileResponse.json();
	const sessionData = await sessionResponse.json();

	const data = {
		profile: profileData.data,
		sessions: sessionData.data,
	};
	return NextResponse.json(data);
}
