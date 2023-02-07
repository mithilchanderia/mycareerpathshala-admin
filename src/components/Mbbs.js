import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { base_url } from "../actions/baseUrls";
import Navbar from "./Navbar";

const Mbbs = () => {
	const navigate = useNavigate();
	const [dataSource, setDataSource] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [collegeDetails, setCollegeDetails] = useState({});
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleClose = () => {
		setIsModalOpen(false);
	};

	const searchInput = useRef(null);
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
	};
	const handleReset = clearFilters => {
		clearFilters();
	};
	const getColumnSearchProps = dataIndex => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div
				style={{
					padding: 8,
				}}
				onKeyDown={e => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: "block",
					}}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{
							width: 90,
						}}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{
							width: 90,
						}}
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: filtered => (
			<SearchOutlined
				style={{
					color: filtered ? "#1890ff" : undefined,
					fontSize: "1rem",
				}}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: visible => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
	});

	const fetchAllColleges = () => {
		axios
			.get(`${base_url}/all-mbbs-college`)
			.then(res => setDataSource(res.data.mbbsColleges))
			.catch(err => console.log(err));
	};

	const handleDelete = () => {
		axios
			.delete(`${base_url}/mbbs/course`, { data: collegeDetails })
			.then(res => {
				if (res.data.success) {
					fetchAllColleges();
					setIsModalOpen(false);
				}
			})
			.catch(err => console.log(err));
	};

	useEffect(() => {
		fetchAllColleges();
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
			},
			...getColumnSearchProps("name"),
		},
		{
			title: "Country",
			dataIndex: "country",
			key: "country",
			width: 200,
			sorter: {
				compare: (a, b) => {
					if (a.country.toLowerCase() < b.country.toLowerCase()) return -1;
					if (b.country.toLowerCase() < a.country.toLowerCase()) return 1;
					return 0;
				},
			},
			...getColumnSearchProps("country"),
		},
		{
			title: "College ID",
			dataIndex: "collegeId",
			key: "collegeId",
			width: 200,
			sorter: {
				compare: (a, b) => {
					if (a.collegeId.toLowerCase() < b.collegeId.toLowerCase()) return -1;
					if (b.collegeId.toLowerCase() < a.collegeId.toLowerCase()) return 1;
					return 0;
				},
			},
			...getColumnSearchProps("collegeId"),
		},
		{
			title: "Course ID",
			dataIndex: "courseId",
			key: "courseId",
			width: 200,
			sorter: {
				compare: (a, b) => {
					if (a.courseId.toLowerCase() < b.courseId.toLowerCase()) return -1;
					if (b.courseId.toLowerCase() < a.courseId.toLowerCase()) return 1;
					return 0;
				},
			},
			...getColumnSearchProps("courseId"),
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
							className="btn btn-link"
							onClick={() => navigate(`/mbbs/${data?.courseId}`)}
							style={{ textDecoration: "none" }}
						>
							Edit
						</button>
						<button
							className="btn btn-link"
							onClick={() => {
								setCollegeDetails({
									dbId: data?.dbId,
									courseId: data?.courseId,
								});
								showModal();
							}}
							style={{ textDecoration: "none", color: "red" }}
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
					rowKey={dataSource => dataSource?.dbId}
					pagination={false}
					bordered
				/>

				<Modal
					show={isModalOpen}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title>Confirm Delete</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Are you sure you want to delete this college?</p>
					</Modal.Body>
					<Modal.Footer>
						<button
							className="btn btn-secondary"
							type="button"
							onClick={handleClose}
						>
							Close
						</button>
						<button
							className="btn btn-danger ms-3 align-self-center fs-7 fw-500"
							type="button"
							onClick={() => handleDelete()}
						>
							Delete
						</button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	);
};

export default Mbbs;
