import { User } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User[] = [
	{
		name: "junaid v",
		dob: "1997-08-31",
		leaguesPlayed: ["Laliga"],
		status: "Retired",
		position: "Forward",
		height: "1.5",
		id: "d994d1f1-39d3-446f-86b5-939b6bbb4dc4",
	},
	{
		name: "Lionel Messi",
		dob: "1987-06-24",
		leaguesPlayed: ["MLS", "Laliga", "League 1"],
		status: "Active",
		position: "Forward",
		height: "1.69",
		id: "d994d1f1-39d3-446f-86b5-939b6bbb454",
	},
];

export const usersSlice = createSlice({
	name: "users",
	initialState: initialState,
	reducers: {
		addUser(state, action: PayloadAction<User>) {
			state.push(action.payload);
		},
		// Delete a user by ID
		deleteUser(state, action: PayloadAction<string>) {
			return state.filter((user) => user.id !== action.payload);
		},
		// Delete selected users by ID
		deleteSelectedUsers(state, action: PayloadAction<string[]>) {
			return state.filter((user) => !action.payload.includes(user.id));
		},
		// Update a user by ID
		updateUser(state, action: PayloadAction<User>) {
			const index = state.findIndex((user) => user.id === action.payload.id);
			if (index !== -1) {
				state[index] = action.payload;
			}
		},
	},
});

const { actions, reducer } = usersSlice;

export const { addUser, deleteUser, updateUser, deleteSelectedUsers } = actions;
export default reducer;
