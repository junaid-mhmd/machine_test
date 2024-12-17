"use client";
import {
	Box,
	Collapse,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleMenu } from "@/redux/slices/layoutSlice";
import {
	ExpandLess,
	ExpandMore,
	ListOutlined,
	ManageAccounts,
	Person,
	PersonAdd,
	Settings,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

type Props = {};

export const drawerWidth = 280;

const SideDrawer = (props: Props) => {
	const { isOpen } = useSelector((state: RootState) => state.layout);
	const [open, setOpen] = useState<number>(1);
	const router = useRouter();
	const pathname = usePathname();

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("lg"));

	const handleClick = (key: number) => {
		if (open == key) {
			setOpen(0);
		} else {
			setOpen(key);
		}
	};

	const dispatch = useDispatch();

	const navData = [
		{
			key: 1,
			title: "User management",
			icon: <ManageAccounts />,
			children: [
				{ title: "All users", icon: <Person />, url: "/user-management" },
				{
					title: "Create user",
					icon: <PersonAdd />,
					url: "/user-management/create",
				},
			],
		},
		{
			key: 2,
			title: "List item",
			icon: <StarIcon />,
			children: [
				{ title: "List item", icon: <StarIcon />, url: "#" },
				{ title: "List item", icon: <StarIcon />, url: "#" },
			],
		},
	];

	return (
		<Drawer
			variant={matches ? "temporary" : "persistent"}
			open={isOpen}
			onClose={() => dispatch(toggleMenu())}
			hideBackdrop
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
			}}
		>
			<Box sx={{ p: 2 }} marginTop={"65px"}>
				<Image src={"/assets/logo.png"} width={230} height={40} alt="logo" />
			</Box>
			<List sx={{ width: "100%", bgcolor: "background.paper" }} component="nav">
				{navData.map((item: any, index: any) => (
					<React.Fragment key={index}>
						<ListItemButton onClick={() => handleClick(item.key)}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.title} />
							{open == item.key ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>

						<Collapse in={open == item.key} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								{item.children.map((child: any, childIndex: any) => (
									<ListItemButton
										key={childIndex}
										sx={{ pl: 4 }}
										onClick={() => router.push(child.url)}
										selected={child.url == pathname}
									>
										<ListItemIcon>{child.icon}</ListItemIcon>
										<ListItemText primary={child.title} />
									</ListItemButton>
								))}
							</List>
						</Collapse>
					</React.Fragment>
				))}
			</List>
		</Drawer>
	);
};

export default SideDrawer;
