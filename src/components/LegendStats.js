import Image from "next/image";

const LegendStats = ({ profileData }) => {
	return (
		<div className="relative bg-gray-900 text-white rounded-lg shadow-md overflow-hidden">
			<div className="bg-red-800 bg-opacity-90 px-6 py-4 flex justify-between items-center">
				<h2 className="text-xl font-semibold">Top Legends</h2>
			</div>
			<div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
				{profileData.segments
					.filter(
						(segment) =>
							segment.type !== "overview" && segment.metadata && segment.stats
					)
					.slice(0, 3) // Display only the first 3 legend stats
					.map((segment, index) => (
						<div
							key={index}
							className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
						>
							<div className="p-4">
								<div className="flex items-center mb-4">
									<div className="mr-4">
										{segment.metadata.portraitImageUrl ? (
											<Image
												src={segment.metadata.portraitImageUrl}
												alt={segment.metadata.name}
												width={48}
												height={48}
											/>
										) : (
											<div className="bg-gray-400 rounded-full w-12 h-12"></div>
										)}
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
						</div>
					))}
			</div>
		</div>
	);
};

export default LegendStats;
