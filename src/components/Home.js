import { Table } from "antd";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
	const navigate = useNavigate();

	const columns = [
		{
			title: "Data Name",
			dataIndex: "name",
			key: "name",
			width: 500,
			render: (_, data) => {
				return (
					<Button variant="link" onClick={() => navigate(data?.link)}>
						{data?.name}
					</Button>
				);
			},
		},
	];

	const dataSource = [
		{
			key: 1,
			name: "MBBS Abroad",
			link: "/mbbs",
		},
		{
			key: 2,
			name: "Other Courses",
			link: "/othercourses",
		},
	];

	return (
		<>
			<Navbar />
			<div className="d-flex justify-content-center mt-5">
				<Table
					dataSource={dataSource}
					columns={columns}
					rowKey={dataSource => dataSource?.key}
					pagination={false}
					bordered
				/>
			</div>
		</>
	);
};

export default Home;
