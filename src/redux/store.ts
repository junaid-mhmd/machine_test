import { configureStore } from "@reduxjs/toolkit";
import { layoutSlice } from "./slices/layoutSlice";
import { usersSlice } from "./slices/usersSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			layout: layoutSlice.reducer,
			users: usersSlice.reducer,
		},
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
