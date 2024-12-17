"use client";
import React, { ReactNode } from "react";
import Header from "./header";
import SideDrawer, { drawerWidth } from "./sideDrawer";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => {
	const { isOpen } = useSelector((state: RootState) => state.layout);

	return (
		<Box sx={{ display: "flex" }}>
			<Header />
			{isOpen && <SideDrawer />}
			<Box
				component="main"
				sx={{ flexGrow: 1, px: 3, pt: 5, pb: 3 }}
				style={{
					width: `calc(100% - ${isOpen ? drawerWidth : 0}px)`,
					marginTop: "65px",
				}}
			>
				{children}
			</Box>
		</Box>
	);
};

export default Layout;
