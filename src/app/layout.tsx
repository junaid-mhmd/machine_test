import type { Metadata } from "next";
import "./globals.css";
import Layout from "./components/layout";
import StoreProvider from "@/providers/storeProvider";

export const metadata: Metadata = {
	title: "Machine test | Junaid",
	description: "Machine test by junaid",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
				/>
			</head>
			<body>
				<StoreProvider>
					<Layout>{children}</Layout>
				</StoreProvider>
			</body>
		</html>
	);
}
