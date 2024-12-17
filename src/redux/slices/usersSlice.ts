import { User } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User[] = [
	{
		name: "junaid v",
		dob: "2024-11-25",
		leaguesPlayed: ["Laliga"],
		status: "Active",
		position: "Forward",
		height: "2.3",
		id: "d994d1f1-39d3-446f-86b5-939b6bbb4dc4",
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

export const { addUser, deleteUser, updateUser } = actions;
export default reducer;
