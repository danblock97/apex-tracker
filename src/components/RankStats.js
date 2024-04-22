import Image from "next/image";

const RankStats = ({ currentRankScore, peakRankScore, filteredStats }) => {
	return (
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
						<div className="bg-gray-400 rounded-full w-10 h-10"></div>
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
					{peakRankScore.value && (
						<div className="flex items-center pl-4">
							{peakRankScore.metadata?.iconUrl ? (
								<Image
									src={peakRankScore.metadata.iconUrl}
									alt="Peak Rank Icon"
									width={40}
									height={40}
								/>
							) : (
								<div className="bg-gray-400 rounded-full w-10 h-10"></div>
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
					)}
				</div>
			</div>
			<div className="px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
				{filteredStats.map(([key, value], index) => (
					<div
						key={key}
						className={`flex border-l border-gray-700 ${
							index < 4 ? "bg-gray-800 p-4 rounded-lg shadow-lg" : "pt-4"
						} pl-4`}
					>
						<div className="flex flex-col items-start w-full">
							<div className="text-xs uppercase tracking-wide">
								{value.displayName}
							</div>
							<div className="text-lg font-bold">{value.displayValue}</div>
							<div className="text-xs">
								{value.percentile ? `Top ${value.percentile}%` : "..."}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RankStats;
