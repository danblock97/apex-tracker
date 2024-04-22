const RankScoreChange = ({ value }) => {
	const isPositive = value >= 0;
	const className = `text-lg font-bold ${
		isPositive ? "text-green-400" : "text-red-400"
	}`;
	const displayValue = isPositive ? `+${value}` : value;
	return <span className={className}>{displayValue}</span>;
};

export default RankScoreChange;
