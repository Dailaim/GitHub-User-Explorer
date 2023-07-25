import { create } from "zustand";
import { person } from "../types/person";

type Store = {
	people: person[];
};

interface Actions {
	setPeople: (val: person[]) => void;
	peopleSave: (index: number) => void;
}

const initialState = {
	people: [],
};

export const useSavePeopleState = create<Store & Actions>((set) => ({
	...initialState,

	setPeople: (val) => set({ people: val }),

	peopleSave: (index) => {
		set((state) => {
			const newPeople = [...state.people];
			newPeople[index].save = !newPeople[index].save;
			return { people: newPeople };
		});
	},
}));
