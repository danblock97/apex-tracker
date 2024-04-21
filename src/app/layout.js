import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Apex Pulse",
	description:
		"Unleash the ultimate tool for monitoring and strategizing in Apex Legends with our comprehensive player tracker. Search for players across any platform, delve into detailed profiles, and access critical game data at your fingertips. This robust application offers insights into player statistics, ranked information, individual legend performance, and session overviews. Whether you’re a competitive player seeking to refine your strategies or a fan tracking your favorite gamers, our tracker equips you with the data needed to elevate your understanding of the game. Stay ahead of the competition by analyzing trends and improving your gameplay with our precise, up-to-date information.",
	icons: {
		icon: "/images/logo.png",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="pt-16">
					<NavBar />
					{children}
				</div>
			</body>
		</html>
	);
}
