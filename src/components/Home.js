import { Table } from "antd";
import React from "react";

const Home = () => {
	const columns = [
		{
			title: "College Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
	];

	return (
		<Table
			// dataSource={departmentList}
			columns={columns}
			// rowKey={departmentList => departmentList?.id}
			pagination={false}
			bordered
		/>
	);
};

export default Home;
