import { LayoutState } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: LayoutState = { isOpen: true };

export const layoutSlice = createSlice({
	name: "layout",
	initialState: initialState,
	reducers: {
		toggleMenu(state: LayoutState, action: PayloadAction) {
			state.isOpen = !state.isOpen;
		},
	},
});

// Extract the action creators object and the reducer
const { actions, reducer } = layoutSlice;

export const { toggleMenu } = actions;
export default reducer;
