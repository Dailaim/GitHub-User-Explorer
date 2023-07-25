import { person } from "../types/person";
import { useDeletePerson } from "./deletePerson";
import { useFetcherSaveOrDeletePerson } from "./fetcherSaveOrDeletePerson";

export const useSaveOrDeletePerson = (
	changeSaveForIndex?: (index: number) => void,
) => {
	const savePerson = useFetcherSaveOrDeletePerson(true);

	const deletePerson = useDeletePerson();

	const handleSave = async (login: string) => {
		await savePerson({ search: { login } });
	};

	const handleDelete = async (githubID: number) => {
		await deletePerson({
			githubID,
		});
	};

	const onSave = (user: person, index?: number) => {
		if (!user.save) {
			handleSave(user.login);
		} else {
			handleDelete(user?.githubID);
		}
		if (changeSaveForIndex && index) changeSaveForIndex(index);
	};

	return { onSave };
};
