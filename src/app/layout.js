import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { LoadingOverlay } from "./components/Loading";
import { Suspense } from "react";

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
		<Suspense fallback={<div>Loading...</div>}>
			<html lang="en" className="h-full">
				<head>
					<title>{metadata.title}</title>
				</head>

				<body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
					<main className="flex-1 h-screen overflow-hidden bg-white">{children}</main>
					<LoadingOverlay />
					<Toaster />
				</body>
			</html>
		</Suspense>
	);
}

