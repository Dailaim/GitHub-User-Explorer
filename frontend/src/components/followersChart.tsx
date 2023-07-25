import Modal from "react-modal";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import "tailwindcss/tailwind.css";
import { person } from "../types/person";

Modal.setAppElement("#root");

export function FollowersChart({
	users,
	active,
	onRequestClose,
}: {
	users: person[];
	active: boolean;
	onRequestClose: () => void;
}) {
	const data = users.map((user) => {
		return {
			name: user.login,
			followers: Math.floor(Math.random() * 1000) + 1,
		};
	});

	return (
		<Modal
			isOpen={active}
			onRequestClose={onRequestClose}
			contentLabel="Followers Chart"
			className="flex items-center justify-center outline-none min-h-screen"
		>
			<div className=" bg-gray-900 border border-gray-300 rounded-md p-6 shadow-lg text-gray-700 max-w-lg m-auto transform transition-all ease-in-out duration-300 sm:max-w-3xl relative">
				<button
					type="button"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded absolute top-4 right-4 px-2"
					onClick={onRequestClose}
				>
					×
				</button>
				<h2 className="text-xl font-bold mb-4 text-[#8884d8]">
					Followers Chart
				</h2>
				<BarChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 0,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="followers" fill="#8884d8" />
				</BarChart>
			</div>
		</Modal>
	);
}
