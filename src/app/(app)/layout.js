'use client'

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AppLayout({ children }) {
	return (
		<div className="h-full">
			<Header />
			<div className="flex h-full">
				<Sidebar />
				<main className="flex-1 overflow-y-auto custom-scrollbar p-0 mt-[80px]">{children}</main>
			</div>
		</div>
	);
}


