import Image from "next/image";
import RankScoreChange from "./RankScoreChange";
import { calculateRelativeTime } from "@/app/hooks/useRelativeTime";

const RecentMatches = ({ sessionData, visibleSessions, loadMoreSessions }) => {
	return (
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
									<h3 className="text-lg font-semibold">Session Overview</h3>
									<span className="text-sm font-medium">
										{calculateRelativeTime(session.metadata.startDate.value)}
									</span>
								</div>
								{session.matches.map((match, matchIndex) => (
									<div
										key={matchIndex}
										className="bg-gray-800 p-4 rounded-lg shadow-lg mb-2 flex flex-col md:flex-row justify-between items-center"
									>
										<div className="flex items-center space-x-4 mb-4 md:mb-0">
											{match.metadata.legendPortraitImageUrl?.value ? (
												<Image
													src={match.metadata.legendPortraitImageUrl.value}
													alt={match.metadata.character.displayValue}
													className="w-12 h-12 rounded-full"
													width={48}
													height={48}
												/>
											) : (
												<div className="bg-gray-400 rounded-full w-12 h-12"></div>
											)}
											<div>
												<div
													className="font-bold truncate"
													style={{ maxWidth: "150px" }}
												>
													{match.metadata.character.displayValue}
												</div>
												<div className="text-gray-400">
													{calculateRelativeTime(match.metadata.endDate.value)}
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
																value={match.stats.rankScoreChange.value}
															/>
														)}
													</div>
												</>
											)}
										</div>
										<div className="flex flex-col items-end">
											<div>
												Level: {match.stats.level?.displayValue || "N/A"}
											</div>
											<div>Kills: {match.stats.kills?.displayValue || "0"}</div>
											<div>
												Damage: {match.stats.damage?.displayValue || "0"}
											</div>
											<div>Wins: {match.stats.wins?.displayValue || "0"}</div>
										</div>
									</div>
								))}
							</div>
						))
				) : (
					<p>Session data is not available or is not in the expected format.</p>
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
	);
};

export default RecentMatches;
