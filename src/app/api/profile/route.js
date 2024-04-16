export async function GET(req, res) {
	const platform = req.nextUrl.searchParams.get("platform");
	const platformUserIdentifier = req.nextUrl.searchParams.get(
		"platformUserIdentifier"
	);

	if (!platform || !platformUserIdentifier) {
		res.status(400).send("Missing required parameters");
		return;
	}

	const response = await fetch(
		`https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${platformUserIdentifier}`,
		{
			headers: {
				"TRN-Api-Key": process.env.TRACKER_API_KEY,
			},
		}
	);

	if (!response.ok) {
		res.status(500).send("Failed to fetch profile data");
		return;
	}

	const data = await response.json();
	return new Response(JSON.stringify(data), {
		headers: {
			"Content-Type": "application/json",
		},
	});
}
