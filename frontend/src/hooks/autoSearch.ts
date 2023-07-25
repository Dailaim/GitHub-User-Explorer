import { useEffect } from "react";

export const useAutoSearch = (
  callback: () => void,
	value = "",
	active = true,
	delay = 300,
) => {

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (!value) return;

			if (!active) return;

			callback();
		}, delay);

		return () => clearTimeout(timeout);
	}, [active, callback, delay, value]);

	return { value };
};
