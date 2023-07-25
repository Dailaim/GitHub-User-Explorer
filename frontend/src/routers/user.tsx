import { FC, useEffect, useState } from "react";
import CardExtended from "../components/cardExtended";
import { ErrorMessage } from "../components/error";
import { useFetcherPerson } from "../hooks/fetcherPerson";
import { useSaveOrDeletePerson } from "../hooks/saveOrDeletePerson";
type UserProps = { name: string };

export const User: FC<UserProps> = ({ name }) => {
	const { person: user, error, loading } = useFetcherPerson(name);

	const [save, setSave] = useState<boolean>(user?.save ?? false);

	const { onSave } = useSaveOrDeletePerson();

	useEffect(() => {
		setSave(user?.save ?? false);
	}, [user?.save]);

	const handleClick = () => {
		onSave({
			...user,
			save,
		});

		setSave((save) => !save);
	};

	if (error) return <ErrorMessage>Failed to load user</ErrorMessage>;
	if (!user && loading) return <div className=" text-blue-500">Loading...</div>;

	return (
		<CardExtended
			user={{
				...user,
				save,
			}}
			onSave={handleClick}
		/>
	);
};
