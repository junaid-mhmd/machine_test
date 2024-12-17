export interface LayoutState {
	isOpen: boolean;
}

export interface User {
	id: string;
	name: string;
	dob: Date | string;
	age?: any;
	leaguesPlayed: string[];
	status: string;
	position: string;
	height: number | string;
}
