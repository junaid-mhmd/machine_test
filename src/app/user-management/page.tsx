"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import {
	Box,
	Button,
	Card,
	Checkbox,
	Chip,
	IconButton,
	InputAdornment,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/utils/types";
import { applyFilters, getAge } from "@/utils/common";
import { deleteSelectedUsers, deleteUser } from "@/redux/slices/usersSlice";
import { Delete, DeleteOutline, EditSharp } from "@mui/icons-material";
import FilterComponent from "./components/tableFilter";
import { toast } from "react-toastify";

type Props = {};

const UserManagement = (props: Props) => {
	const [selected, setSelected] = useState<string[]>([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [search, setSearch] = useState("");
	const [filters, setFilters] = useState([]);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const dispatch = useDispatch();
	const router = useRouter();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const users = useSelector((state: RootState) => state.users);

	const handleSelect = (id: string) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const rows =
		users?.map((user: User) => ({
			id: user.id,
			name: user.name,
			age: getAge(user.dob),
			leagues: user.leaguesPlayed,
			status: user.status,
			height: `${user.height} m`,
			position: user.position,
		})) || [];

	const isAllSelected = rows.length > 0 && selected.length === rows.length;

	const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected: any = rows.map((row) => row.id);
			setSelected(newSelected);
		} else {
			setSelected([]);
		}
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		setPage(0);
	};

	const filteredRows = useMemo(
		() =>
			rows.filter(
				(row) =>
					applyFilters(row, filters) &&
					(row?.name.toLowerCase().includes(search?.toLowerCase()) ||
						row?.position.toLowerCase().includes(search?.toLowerCase()))
			),
		[rows, filters, search]
	);

	return (
		<Stack spacing={4}>
			<Typography variant="h4" component="h2">
				User management
			</Typography>
			<Card variant="outlined">
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mb={2}
					p={2}
				>
					<Box display="flex" alignItems="center" gap={2}>
						<TextField
							variant="outlined"
							placeholder="Search by name or position"
							size="small"
							value={search}
							label="Search"
							onChange={handleSearch}
						/>

						<FilterComponent filters={filters} setFilters={setFilters} />
					</Box>
					<Button
						onClick={() => router.push(`user-management/create`)}
						variant="outlined"
						color="primary"
					>
						New
					</Button>
				</Box>
				<TableContainer component={Paper}>
					<Table>
						<TableHead
							style={{
								backgroundColor: "#F9F9FB",
							}}
						>
							<TableRow>
								<TableCell padding="checkbox">
									<Stack display="flex" flexDirection="row" alignItems="center">
										<Checkbox
											indeterminate={
												selected.length > 0 && selected.length < rows.length
											}
											checked={isAllSelected}
											onChange={handleSelectAll}
										/>
										{selected.length > 0 && (
											<Delete
												color="action"
												onClick={() => {
													dispatch(deleteSelectedUsers(selected));
													toast.success(
														`${selected.length} users deleted successfully.`
													);
												}}
												fontSize="small"
											/>
										)}
									</Stack>
								</TableCell>
								<TableCell>User</TableCell>
								<TableCell>Age</TableCell>
								<TableCell>Leagues Played</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Height</TableCell>
								<TableCell>Position</TableCell>
								<TableCell align="right">Actions</TableCell>
							</TableRow>
						</TableHead>

						{filteredRows?.length === 0 ? (
							<TableBody>
								<TableRow>
									<TableCell colSpan={8}>
										<Stack
											width="100%"
											p={2}
											justifyContent="center"
											alignItems="center"
										>
											<Typography
												variant="h6"
												color="textSecondary"
												whiteSpace="nowrap"
											>
												No data available
											</Typography>
										</Stack>
									</TableCell>
								</TableRow>
							</TableBody>
						) : (
							<TableBody>
								{filteredRows
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row: any) => (
										<TableRow
											key={row.id}
											hover
											selected={selected.includes(row.id)}
										>
											<TableCell padding="checkbox">
												<Checkbox
													checked={selected.includes(row.id)}
													onChange={() => handleSelect(row.id)}
												/>
											</TableCell>
											<TableCell>{row.name}</TableCell>
											<TableCell>{row.age}</TableCell>
											<TableCell>
												{row.leagues
													.slice(0, 3)
													.map((league: any, index: any) => (
														<Chip
															key={index}
															label={league}
															size="small"
															variant="outlined"
															sx={{ marginRight: 0.5, marginBottom: 0.5 }}
														/>
													))}
												{row.leagues.length > 3 && (
													<Chip
														variant="outlined"
														label="More.."
														size="small"
													/>
												)}
											</TableCell>
											<TableCell>
												<Chip
													label={row.status}
													sx={{
														backgroundColor:
															row.status === "Active" ? "#72CD2C" : "#EF6C00",
														color: "#ffffff",
													}}
												/>
											</TableCell>
											<TableCell>{row.height}</TableCell>
											<TableCell>{row.position}</TableCell>
											<TableCell align="right">
												<IconButton onClick={handleClick}>
													<GridMoreVertIcon />
												</IconButton>
												<Menu
													id="basic-menu"
													anchorEl={anchorEl}
													open={open}
													onClose={handleClose}
													MenuListProps={{
														"aria-labelledby": "basic-button",
													}}
												>
													<MenuItem
														onClick={() => {
															router.push(
																`/user-management/create?id=${row.id}`
															);
															handleClose();
														}}
													>
														<ListItemIcon>
															<EditSharp fontSize="small" />
														</ListItemIcon>
														<ListItemText>Edit</ListItemText>
													</MenuItem>
													<MenuItem
														onClick={() => {
															dispatch(deleteUser(row.id));
															handleClose();
															toast.success("User deleted successfully");
														}}
													>
														<ListItemIcon>
															<DeleteOutline fontSize="small" />
														</ListItemIcon>
														<ListItemText>Delete</ListItemText>
													</MenuItem>
												</Menu>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						)}
					</Table>
					<Box display="flex" justifyContent="center" alignItems="center">
						<TablePagination
							component="div"
							count={rows.length}
							rowsPerPage={rowsPerPage}
							rowsPerPageOptions={[]}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Box>
				</TableContainer>
			</Card>
		</Stack>
	);
};

export default UserManagement;
