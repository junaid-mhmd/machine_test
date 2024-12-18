"use client";
import { Chip } from "@mui/material";
import React, { useState } from "react";

type Props = {
	data: any;
};

const LeagueTags = ({ data }: Props) => {
	const [showAll, setShowAll] = useState(false);

	return (
		<>
			{data?.leagues
				.slice(0, showAll ? data?.leagues?.length : 3)
				.map((league: string, index: number) => (
					<Chip
						key={index}
						label={league}
						size="small"
						variant="outlined"
						sx={{ marginRight: 0.5, marginBottom: 0.5 }}
					/>
				))}
			{data?.leagues.length > 3 && (
				<Chip
					variant="outlined"
					label={showAll ? "Less.." : "More.."}
					size="small"
					onClick={() => setShowAll(!showAll)}
					sx={{ cursor: "pointer", marginBottom: 0.5 }}
					color="info"
				/>
			)}
		</>
	);
};

export default LeagueTags;
