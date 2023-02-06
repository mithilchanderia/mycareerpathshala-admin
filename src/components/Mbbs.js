import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { base_url } from "../actions/baseUrls";
import Navbar from "./Navbar";

const Mbbs = () => {
	const navigate = useNavigate();
	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		axios
			.get(`${base_url}/all-mbbs-college`)
			.then(res => setDataSource(res.data.mbbsColleges))
			.catch(err => console.log(err));
	}, []);

	const columns = [
		{
			title: "College Name",
			dataIndex: "name",
			key: "name",
			width: 300,
			sorter: {
				compare: (a, b) => {
					if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
					if (b.name.toLowerCase() < a.name.toLowerCase()) return 1;
					return 0;
				},
				// multiple: 1,
			},
		},
		{
			title: "Country",
			dataIndex: "country",
			key: "country",
			sorter: {
				compare: (a, b) => {
					if (a.country.toLowerCase() < b.country.toLowerCase()) return -1;
					if (b.country.toLowerCase() < a.country.toLowerCase()) return 1;
					return 0;
				},
				// multiple: 2,
			},
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
		{
			title: "Actions",
			key: "Actions",
			dataIndex: "action",
			width: 200,
			render: (_, data) => {
				return (
					<>
						<button
							className="btn btn-link align-self-end mb-2"
							onClick={() => navigate(`/mbbs/${data?.courseId}`)}
							style={{ width: 100, textDecoration: "none" }}
						>
							Edit
						</button>
						<button
							className="btn btn-link align-self-end mb-2"
							// onClick={() => navigate(`/mbbs/${data?.courseId}`)}
							style={{ width: 100, textDecoration: "none", color: "red" }}
						>
							Delete
						</button>
					</>
				);
			},
		},
	];

	return (
		<>
			<Navbar />
			<div className="container d-flex justify-content-center flex-column mt-5">
				<div className="d-flex justify-content-between">
					<button
						className="btn btn-link align-self-end mb-3 ms-2"
						onClick={() => navigate("/dashboard")}
						style={{ border: "1px solid black" }}
					>
						<MdArrowBackIosNew
							style={{
								fontSize: "2rem",
								color: "black",
							}}
						/>
					</button>
					<button
						className="btn btn-primary align-self-end mb-3 me-2"
						onClick={() => navigate("/mbbs/create")}
					>
						Add New College
					</button>{" "}
				</div>
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

export default Mbbs;
