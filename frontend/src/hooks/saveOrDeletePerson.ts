import { person } from "../types/person";
import { useDeletePerson } from "./deleteUser";
import { useSavePerson } from "./saveUser";

export const useSaveOrDeletePerson = (changeSaveForIndex?: (index: number) => void) => {
	const savePerson = useSavePerson(true);

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
