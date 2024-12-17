import React, { useState } from "react";
import {
	TextField,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Chip,
	Button,
	Grid2,
	Popover,
	IconButton,
	Box,
	Stack,
} from "@mui/material";
import { CloseSharp, FilterList } from "@mui/icons-material";

const filterOperators = [
	"Equals",
	"Not equals",
	"Contains",
	"Starts with",
	"Ends with",
	"Greater than",
	"Less than",
];
const columns = ["name", "age", "position", "status"];

const FilterComponent = ({ filters, setFilters }: any) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (filters?.length == 0) {
			setFilters([
				{
					columns: "",
					operator: "",
					value: "",
				},
			]);
		}
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAddFilter = () => {
		setFilters([...filters, { column: "", operator: "", value: "" }]);
	};

	const handleRemoveFilter = (index: number) => {
		const newFilters = [...filters];
		newFilters.splice(index, 1);
		setFilters(newFilters);
	};

	const handleFilterChange = (index: number, field: string, value: string) => {
		const newFilters = [...filters];
		newFilters[index][field] = value;
		setFilters(newFilters);
	};

	return (
		<>
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
			>
				<Box
					p={1}
					display="flex"
					flexDirection="column"
					gap={2}
					minWidth={"300px"}
				>
					{filters.map((filter: any, index: any) => (
						<Grid2 container spacing={2} key={index} alignItems="center">
							<Grid2 size={4}>
								<Stack
									flexDirection="row"
									display="flex"
									alignItems="end"
									gap={1}
								>
									<CloseSharp
										fontSize="small"
										color="secondary"
										onClick={() => handleRemoveFilter(index)}
									/>
									<FormControl fullWidth>
										<InputLabel
											style={{ left: "-15px", top: "10px" }}
											id={`${index}-column`}
										>
											Columns
										</InputLabel>
										<Select
											value={filter.column}
											variant="standard"
											label="Columns"
											id={`${index}-column`}
											style={{ minWidth: "100px" }}
											onChange={(e) =>
												handleFilterChange(index, "column", e.target.value)
											}
										>
											{columns.map((col) => (
												<MenuItem key={col} value={col}>
													{col}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Stack>
							</Grid2>
							<Grid2 size={4}>
								<FormControl fullWidth>
									<InputLabel
										style={{ left: "-15px", top: "10px" }}
										id={`${index}-operator`}
									>
										Operator
									</InputLabel>
									<Select
										value={filter.operator}
										variant="standard"
										label="Operator"
										id={`${index}-operator`}
										onChange={(e) =>
											handleFilterChange(index, "operator", e.target.value)
										}
									>
										{filterOperators.map((operator) => (
											<MenuItem key={operator} value={operator}>
												{operator}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid2>
							<Grid2 size={4}>
								<TextField
									fullWidth
									value={filter.value}
									variant="standard"
									onChange={(e) =>
										handleFilterChange(index, "value", e.target.value)
									}
									label="Value"
								/>
							</Grid2>
						</Grid2>
					))}

					<Button size="small" variant="text" onClick={handleAddFilter}>
						Add Filter
					</Button>
				</Box>
			</Popover>
			<IconButton onClick={handleClick}>
				<FilterList />
			</IconButton>
		</>
	);
};

export default FilterComponent;
