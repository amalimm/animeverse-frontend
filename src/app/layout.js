import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Anime Searcher",
	description: "Search for your favorite anime",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="h-full">
			<head>
				<title>{metadata.title}</title>
			</head>

			<body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
				<main className="flex-1 h-screen overflow-y-auto p-6 bg-gray-100">{children}</main>
				<Toaster />
			</body>
		</html>
	);
}

