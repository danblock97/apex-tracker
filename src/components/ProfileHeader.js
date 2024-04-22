import Image from "next/image";

const ProfileHeader = ({ profileData }) => {
	return (
		<section className="relative mb-8 rounded-lg shadow-md overflow-hidden">
			<Image
				src="/images/heroImage1.webp"
				alt="Hero"
				layout="fill"
				objectFit="cover"
				quality={100}
				className="absolute inset-0 w-full h-full object-cover"
			/>
			<div className="relative bg-opacity-50 bg-black flex items-end p-4 h-[100px] md:h-[100px] lg:h-[200px]">
				{profileData?.platformInfo?.avatarUrl ? (
					<Image
						src={profileData.platformInfo.avatarUrl}
						alt="Player Icon"
						width={80}
						height={80}
						className="rounded-full"
					/>
				) : (
					<div className="bg-gray-400 rounded-full w-20 h-20"></div>
				)}
				<div className="text-white ml-4">
					<h1 className="text-3xl font-bold">
						{profileData.platformInfo.platformUserHandle || "Unknown Player"}
					</h1>
				</div>
			</div>
		</section>
	);
};

export default ProfileHeader;
