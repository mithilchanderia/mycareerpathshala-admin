import { Table } from "antd";
import React from "react";

const Home = () => {
	const columns = [
		{
			title: "Data Name",
			dataIndex: "name",
			key: "name",
			width: 500,
			render: (_, data) => {
				return <a href={data?.link}>{data?.name}</a>;
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
		<div className="d-flex justify-content-center mt-5">
			<Table
				dataSource={dataSource}
				columns={columns}
				rowKey={dataSource => dataSource?.key}
				pagination={false}
				bordered
			/>
		</div>
	);
};

export default Home;
