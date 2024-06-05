import React from "react";

const Loading = () => {
	return (
		<div className="">
			<div className="bg-gray-900 flex items-center justify-center h-screen">
				<div className="w-20 h-20 border-t-4 border-b-4 border-black rounded-full animate-spin"></div>
			</div>
		</div>
	);
};

export default Loading;
