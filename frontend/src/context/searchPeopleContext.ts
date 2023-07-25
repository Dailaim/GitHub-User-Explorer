import { create } from "zustand";
import { person } from "../types/person";

type Store = {
	search: string;
	people: person[];
	autoSearch: boolean;
};

interface Actions {
	setSearch: (val: string) => void;
	setPeople: (val: person[]) => void;
	setAutoSearch: (val: boolean) => void;
	peopleSave: (index: number) => void;
}

const initialState = {
	autoSearch: true,
	search: "",
	people: [],
};

export const searchPeopleListState = create<Store & Actions>((set) => ({
	...initialState,

	setSearch: (val) => set({ search: val }),

	setPeople: (val) => set({ people: val }),

	setAutoSearch: (val) => set({ autoSearch: val }),

	peopleSave: (index) => {
		set((state) => {
			const newPeople = [...state.people];
			newPeople[index].save = !newPeople[index].save;
			return { people: newPeople };
		});
	},
}));
