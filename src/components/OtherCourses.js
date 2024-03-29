import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../actions/baseUrls";
import Navbar from "./Navbar";

const OtherCourses = () => {
	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		axios
			.get(`${base_url}/all-other-college`)
			.then(res => setDataSource(res.data.otherColleges))
			.catch(err => console.log(err));
	}, []);

	const columns = [
		{
			title: "College Name",
			dataIndex: "name",
			key: "name",
			width: 300,
			render: (_, data) => {
				return (
					<button
						className="btn btn-link text-start"
						onClick={() => console.log(data?.courseId)}
					>
						{data?.name}
					</button>
				);
			},
		},
		{
			title: "Country",
			dataIndex: "country",
			key: "country",
			width: 200,
		},
		{
			title: "College ID",
			dataIndex: "collegeId",
			key: "collegeId",
			width: 200,
		},
		{
			title: "Course ID",
			dataIndex: "courseId",
			key: "courseId",
			width: 200,
		},
	];

	return (
		<>
			<Navbar />
			<div className="d-flex justify-content-center mt-5">
				<Table
					dataSource={dataSource}
					columns={columns}
					rowKey={dataSource => dataSource?.courseId}
					pagination={false}
					bordered
				/>
			</div>
		</>
	);
};

export default OtherCourses;
