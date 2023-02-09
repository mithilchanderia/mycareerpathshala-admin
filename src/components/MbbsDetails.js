import { Space, Spin } from "antd";
import axios from "axios";
import { Chips } from "primereact/chips";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { MdArrowBackIosNew } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { base_url } from "../actions/baseUrls";
import { addNotification } from "../actions/notifications";
import Navbar from "./Navbar";

const MbbsDetails = () => {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const htmlWithTable = ``;
	const htmlWithTable2 = ``;
	const htmlWithTable3 = ``;
	const defaultFonts = [
		"Arial",
		"Comic Sans MS",
		"Courier New",
		"Impact",
		"Georgia",
		"Tahoma",
		"Trebuchet MS",
		"Verdana",
	];
	const sortedFontOptions = [
		"Logical",
		"Salesforce Sans",
		"Garamond",
		"Sans-Serif",
		"Serif",
		"Times New Roman",
		"Helvetica",
		...defaultFonts,
	].sort();

	const [isLoading, setIsLoading] = useState(false);
	const [collegeName, setCollegeName] = useState("");
	const [collegeId, setCollegeId] = useState("");
	const [dbId, setDbId] = useState("");
	const [cityName, setCityName] = useState("");
	const [countryName, setCountryName] = useState("");
	const [universityType, setUniversityType] = useState("");
	const [establishmentYear, setEstablishmentYear] = useState("");
	const [brochureLink, setBrochureLink] = useState("");
	const [backgroundImage, setBackgroundImage] = useState(
		"https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
	);
	const [logoImage, setLogoImage] = useState(
		"https://static.vecteezy.com/system/resources/previews/005/260/727/original/college-graduate-icon-free-vector.jpg"
	);
	const [about, setAbout] = useState("");
	const [courseDuration, setCourseDuration] = useState("");
	const [fees, setFees] = useState("");
	const [intake, setIntake] = useState([]);
	const [courseDurationFulltime, setCourseDurationFulltime] = useState("");
	const [campusType, setCampusType] = useState("");
	const [campusLocation, setCampusLocation] = useState("");
	const [courseDurationInternship, setCourseDurationInternship] = useState("");
	const [courseDurationOverall, setCourseDurationOverall] = useState("");
	const [applicationStartDate, setApplicationStartDate] = useState("");
	const [applicationEndDate, setApplicationEndDate] = useState("");
	const [teachingMedium, setTeachingMedium] = useState([]);
	const [recognizedBy, setRecognizedBy] = useState([]);
	const [videoLinks, setVideoLinks] = useState([]);
	const [facilities, setFacilities] = useState([]);
	const [firstYearFees, setFirstYearFees] = useState("");
	const [totalPackage, setTotalPackage] = useState("");
	const [secondToSixthYearFees, setSecondToSixthYearFees] = useState("");
	const [currency, setCurrency] = useState("");
	const [syllabus, setsyllabus] = useState([{ title: "", courses: [] }]);
	const [images, setImages] = useState([{ imgCaption: "", imgLink: "" }]);
	const [videos, setVideos] = useState([]);
	const [overview, setOverview] = useState(htmlWithTable);
	const [admissionCriteria, setAdmissionCriteria] = useState(htmlWithTable2);
	const [feestructure, setFeeStructure] = useState(htmlWithTable3);

	const [countriesOptions, setCountriesOptions] = useState([]);
	const [currencyOptions, setCurrencyOptions] = useState([]);
	const [campusLocationOptions, setCampusLocationOptions] = useState([]);
	const [campusTypeOptions, setCampusTypeOptions] = useState([]);
	const [universityTypeOptions, setUniversityTypeOptions] = useState([]);
	const [facilitiesOptions, setFacilitiesOptions] = useState([]);
	const [teachingMediumOptions, setTeachingMediumOptions] = useState([]);
	const [recognizedByOptions, setRecognizedByOptions] = useState([]);
	const [intakeOptions, setIntakeOptions] = useState([]);
	const [ranking, setRanking] = useState([{ rankingBody: "", rank: "" }]);

	console.log(images, videos);

	const fetchDropdown = () => {
		axios
			.post(`${base_url}/field-options/multiple`, {
				fieldOptions: [
					{
						page: "collegeFilters",
						label: "campusType",
					},
					{
						page: "collegeFilters",
						label: "campusLocation",
					},
					{
						page: "collegeFilters",
						label: "intakeMonthYear",
					},
					{
						page: "collegeOptions",
						label: "teachingMedium",
					},
					{
						page: "mbbsOptions",
						label: "recognizedBy",
					},
					{
						page: "collegeOptions",
						label: "facilities",
					},
					{
						page: "all",
						label: "countries",
					},
					{
						page: "collegeFilters",
						label: "universityType",
					},
					{
						page: "all",
						label: "currency",
					},
				],
			})
			.then(res => {
				setCountriesOptions(res?.data?.all?.countries?.options);
				setCurrencyOptions(res?.data?.all?.currency?.options);
				setCampusLocationOptions(
					res?.data?.collegeFilters?.campusLocation?.options
				);
				setCampusTypeOptions(res?.data?.collegeFilters?.campusType?.options);
				setUniversityTypeOptions(
					res?.data?.collegeFilters?.universityType?.options
				);
				setIntakeOptions(res?.data?.collegeFilters?.intakeMonthYear?.options);
				setFacilitiesOptions(res?.data?.collegeOptions?.facilities?.options);
				setTeachingMediumOptions(
					res?.data?.collegeOptions?.teachingMedium?.options
				);
				setRecognizedByOptions(res?.data?.mbbsOptions?.recognizedBy?.options);
			});
	};

	useEffect(() => {
		fetchDropdown();
	}, []);

	const fetchData = useCallback(() => {
		if (courseId && courseId !== "create") {
			setIsLoading(true);
			axios
				.post(`${base_url}/get-mbbs-course-details`, { courseId: courseId })
				.then(res => {
					let data = res?.data;
					if (data) {
						setCollegeName(data.collegeName);
						setCityName(data.city);
						setCountryName(data.country);
						setUniversityType(data.universityType);
						setEstablishmentYear(data.establishmentYear);
						setBrochureLink(data.brochureLink);
						setBackgroundImage(data.bgImg);
						setLogoImage(data.logoImg);
						setCourseDuration(data.courseDurationYears || "");
						setFees(data.fees);
						setAbout(data.about);
						setCourseDurationFulltime(
							data.importantFacts?.courseDurationFulltimeMonths
						);
						setTeachingMedium(data.importantFacts?.teachingMedium);
						setCourseDurationInternship(
							data.importantFacts?.courseDurationInternshipMonths
						);
						setCourseDurationOverall(
							data.importantFacts?.courseDurationOverallMonths
						);
						setRecognizedBy(data.importantFacts?.recognisedBy);
						setFacilities(
							data.overview?.facilitiesAndAccomodation?.facilities?.map(
								a => a.label
							)
						);
						setOverview(data.overview?.benefits?.content);
						setVideoLinks(data.overview?.benefits?.videoLinks);
						setAdmissionCriteria(data.admissionCriteria);
						setFirstYearFees(data.feeStructure?.firstYearFees);
						setSecondToSixthYearFees(
							data.feeStructure?.secondToSixthYearFeesYearly
						);
						setCurrency(data.feeStructure?.currency);
						setTotalPackage(data.feeStructure?.totalPackage);
						setCampusType(data?.campusType);
						setCampusLocation(data?.campusLocation);
						setRanking(
							Object.keys(data.importantFacts?.ranking).map(key => ({
								rankingBody: key,
								rank: data.importantFacts?.ranking[key],
							}))
						);
						data?.syllabus && setsyllabus(data?.syllabus);
						setCollegeId(data.collegeId);
						setDbId(data.dbId);
						setImages(data?.gallery?.images);
						setVideos(data?.gallery?.videos);
					}
					setIsLoading(false);
				})
				.catch(err => console.log(err));
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [courseId, fetchData]);

	const handleChange = (e, i) => {
		const newRanking = ranking;
		newRanking[i][e.target.name] = e.target.value;
		setRanking([...newRanking]);
	};
	const handleSyllabusChange = (e, i) => {
		const newSyllabus = syllabus;
		newSyllabus[i][e.target.name] = e.target.value;
		setsyllabus([...newSyllabus]);
	};
	const handleImageChange = (e, i) => {
		const newImages = images;
		newImages[i][e.target.name] = e.target.value;
		setImages([...newImages]);
	};

	const removeFormData = i => {
		const newRanking = ranking.filter((f, index) => i !== index);
		setRanking([...newRanking]);
	};
	const removeSyllabusFormData = i => {
		const newSyllabus = syllabus.filter((f, index) => i !== index);
		setsyllabus([...newSyllabus]);
	};
	const removeImagesFormData = i => {
		const newImages = images.filter((f, index) => i !== index);
		setImages([...newImages]);
	};

	const saveDetails = () => {
		setIsLoading(true);
		const data = {
			collegeName: collegeName || null,
			city: cityName || null,
			country: countryName || null,
			universityType: universityType || null,
			establishmentYear: establishmentYear || null,
			brochureLink: brochureLink || null,
			backgroundImg: backgroundImage || null,
			logoImg: logoImage || null,
			about: about || null,
			courseDurationYears: courseDuration || null,
			firstYearFees: firstYearFees || null,
			intake: intake || null,
			campusType: campusType || null,
			campusLocation: campusLocation || null,
			importantFacts: {
				applicationStartDate: applicationStartDate?.length
					? applicationStartDate
					: null,
				applicationEndDate: applicationEndDate?.length
					? applicationEndDate
					: null,
				courseDurationFulltimeMonths: courseDurationFulltime || null,
				courseDurationInternshipMonths: courseDurationInternship || null,
				courseDurationOverallMonths: courseDurationOverall || null,
				recognizedBy: recognizedBy || null,
				ranking: ranking || null,
				teachingMedium: teachingMedium || null,
			},
			overview: {
				content: overview || null,
				videoLinks: videoLinks || null,
				facilities: facilities || null,
			},
			admissionCriteria: admissionCriteria || null,
			feesStructure: {
				firstYearFees: firstYearFees || null,
				totalPackage: totalPackage || null,
				secondToSixthYearFees: secondToSixthYearFees || null,
				currency: currency || null,
				content: feestructure || null,
			},
			syllabus: syllabus || null,
			gallery: { images, videos },
		};
		if (dbId) {
			data.dbId = dbId;
			data.collegeId = collegeId;
			data.courseId = courseId;
		}

		axios
			.post(`${base_url}/mbbs/save`, data)
			.then(res => {
				let data = res?.data;
				if (data?.success) {
					if (courseId && courseId !== "create") {
						navigate(`/mbbs/${courseId}`);
					} else {
						navigate(`/mbbs/`);
					}
					fetchData();
					dispatch(
						addNotification({
							message: "College saved successfully",
							type: "success",
						})
					);
				}
				setIsLoading(false);
			})
			.catch(err => console.log(err));
	};

	return (
		<>
			<Navbar />
			{isLoading ? (
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ height: "100vh" }}
				>
					<Space size="middle">
						<Spin tip="Loading..." size="large" />
					</Space>
				</div>
			) : (
				<div className="p-5">
					<button
						className="btn btn-link align-self-end mb-3 ms-2"
						onClick={() => navigate("/mbbs")}
						style={{ border: "1px solid black" }}
					>
						<MdArrowBackIosNew
							style={{
								fontSize: "2rem",
								color: "black",
							}}
						/>
					</button>
					<Row className="mb-3">
						<Col>
							<label className="d-block form-label">College Name</label>
							<InputText
								style={{ width: "100%" }}
								placeholder="College Name"
								value={collegeName}
								onChange={e => setCollegeName(e.target.value)}
							/>
						</Col>
						{courseId !== "create" && (
							<>
								<Col>
									<label className="d-block form-label">Course Id</label>
									<InputText
										style={{ width: "100%" }}
										placeholder="Course Id"
										value={courseId}
										disabled
									/>
								</Col>
								<Col>
									<label className="d-block form-label">College Id</label>
									<InputText
										style={{ width: "100%" }}
										placeholder="College Id"
										value={collegeId}
										disabled
									/>
								</Col>
							</>
						)}
						<Col>
							<label className="d-block form-label">City</label>
							<InputText
								style={{ width: "100%" }}
								placeholder="City"
								value={cityName}
								onChange={e => setCityName(e.target.value)}
							/>
						</Col>
						<Col>
							<label className="d-block form-label">Country</label>
							<Dropdown
								style={{ width: "100%" }}
								value={countryName}
								onChange={e => setCountryName(e.value)}
								options={countriesOptions}
								placeholder="Country"
							/>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col>
							<label className="d-block form-label">University Type</label>
							<Dropdown
								style={{ width: "100%" }}
								value={universityType}
								onChange={e => setUniversityType(e.value)}
								options={universityTypeOptions}
								placeholder="University Type"
							/>
						</Col>
						<Col>
							<label className="d-block form-label">Campus Type</label>
							<Dropdown
								style={{ width: "100%" }}
								value={campusType}
								onChange={e => setCampusType(e.value)}
								options={campusTypeOptions}
								placeholder="Campus Type"
							/>
						</Col>
						<Col>
							<label className="d-block form-label">Establishment Year</label>
							<InputText
								style={{ width: "100%" }}
								type="number"
								placeholder="Establishment Year"
								value={establishmentYear}
								onChange={e => setEstablishmentYear(e.target.value)}
							/>
						</Col>
						<Col>
							<label className="d-block form-label">Brochure Link</label>
							<InputText
								style={{ width: "100%" }}
								placeholder="Brochure Link"
								value={brochureLink}
								onChange={e => setBrochureLink(e.target.value)}
							/>
						</Col>
						<Col>
							<label className="d-block form-label">Background Image</label>
							<InputText
								style={{ width: "100%" }}
								placeholder="Background Image"
								value={backgroundImage}
								onChange={e => setBackgroundImage(e.target.value)}
							/>
						</Col>
						<Col>
							<label className="d-block form-label">Logo Image</label>
							<InputText
								style={{ width: "100%" }}
								placeholder="Logo Image"
								value={logoImage}
								onChange={e => setLogoImage(e.target.value)}
							/>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col>
							<label className="d-block form-label">
								Course Duration (years)
							</label>
							<InputText
								type="number"
								style={{ width: "100%" }}
								placeholder="Course Duration(Years)"
								value={courseDuration}
								onChange={e => {
									setCourseDurationFulltime(e.target.value * 12);
									setCourseDurationOverall(
										+e.target.value * 12 + +courseDurationInternship
									);
									return setCourseDuration(e.target.value);
								}}
							/>
						</Col>
						<Col>
							<label className="d-block form-label">Fees</label>
							<InputText
								style={{ width: "100%" }}
								placeholder="Fees"
								value={fees}
								onChange={e => setFees(e.target.value)}
							/>
						</Col>
						<Col>
							<label className="d-block form-label">
								Application Start Date
							</label>
							<InputText
								type="date"
								style={{ width: "100%" }}
								placeholder="Application Start Date"
								value={applicationStartDate}
								onChange={e => setApplicationStartDate(e.target.value)}
							/>
						</Col>
						<Col>
							<label className="d-block form-label">Intake</label>
							<MultiSelect
								value={intake}
								style={{ width: "100%", maxWidth: 457 }}
								onChange={e => setIntake(e.value)}
								options={intakeOptions}
								placeholder="Intake"
							/>
						</Col>
						<Col>
							<label className="d-block form-label">Campus Location</label>
							<Dropdown
								style={{ width: "100%" }}
								value={campusLocation}
								onChange={e => setCampusLocation(e.value)}
								options={campusLocationOptions}
								placeholder="Campus Location"
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<label className="d-block form-label">About</label>
							<InputTextarea
								autoResize
								style={{ width: "100%" }}
								placeholder="About"
								value={about}
								onChange={e => setAbout(e.target.value)}
							/>
						</Col>
					</Row>
					<hr />
					<Row className="mt-3">
						<h4 style={{ color: "#0d6efd" }}>Important Facts</h4>
						<Col>
							<label className="d-block form-label">
								Course Duration Fulltime (months)
							</label>
							<InputText
								style={{ width: "100%" }}
								placeholder="Course Duration Fulltime (months)"
								value={courseDurationFulltime}
								disabled
							/>
						</Col>
						<Col>
							<label className="d-block form-label">
								Course Duration Internship (months)
							</label>
							<InputText
								style={{ width: "100%" }}
								placeholder="Course Duration Internship (months)"
								value={courseDurationInternship}
								onChange={e => {
									setCourseDurationOverall(
										+courseDurationFulltime + +e.target.value
									);
									return setCourseDurationInternship(e.target.value);
								}}
							/>
						</Col>
						<Col>
							<label className="d-block form-label">
								Course Duration Overall (months)
							</label>
							<InputText
								style={{ width: "100%" }}
								placeholder="Course Duration Overall (months)"
								value={courseDurationOverall}
								disabled
							/>
						</Col>
						<Col>
							<label className="d-block form-label">Application End Date</label>
							<InputText
								type="date"
								style={{ width: "100%" }}
								placeholder="Application End Date"
								value={applicationEndDate}
								onChange={e => setApplicationEndDate(e.target.value)}
							/>
						</Col>
						<Col>
							<label className="d-block form-label">Teaching Medium</label>
							<MultiSelect
								value={teachingMedium}
								style={{ width: "100%" }}
								onChange={e => setTeachingMedium(e.value)}
								options={teachingMediumOptions}
								placeholder="Teaching Medium"
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<label className="d-block form-label">Recognized By</label>
							<MultiSelect
								value={recognizedBy}
								style={{ width: "100%" }}
								onChange={e => setRecognizedBy(e.value)}
								options={recognizedByOptions}
								placeholder="Recognized By"
							/>
						</Col>
					</Row>
					<button
						className="me-2 btn btn-primary mt-3"
						type="button"
						onClick={() =>
							setRanking([...ranking, { rankingBody: "", rank: "" }])
						}
					>
						Add Rank
					</button>
					<form>
						{ranking?.map((body, index) => {
							return (
								<Row key={index} className="w-50">
									<Col>
										<InputText
											style={{ width: "100%" }}
											placeholder="Ranking Body"
											name="rankingBody"
											value={body?.rankingBody}
											onChange={e => handleChange(e, index)}
										/>
									</Col>
									<Col>
										<InputText
											style={{ width: "100%" }}
											placeholder="Rank"
											name="rank"
											value={body?.rank}
											onChange={e => handleChange(e, index)}
										/>
									</Col>
									<Col>
										<button
											className="me-2 btn btn-danger"
											type="button"
											onClick={() => removeFormData(index)}
										>
											Remove
										</button>
									</Col>
								</Row>
							);
						})}
					</form>
					<hr />
					<Row className="mt-3">
						<h4 style={{ color: "#0d6efd" }}>Overview</h4>
						<SunEditor
							plugin=""
							setContents={overview}
							onChange={setOverview}
							setOptions={{
								buttonList: [
									["undo", "redo"],
									["font", "fontSize"],
									["paragraphStyle", "blockquote"],
									[
										"bold",
										"underline",
										"italic",
										"strike",
										"subscript",
										"superscript",
									],
									["fontColor", "hiliteColor"],
									["align", "list", "lineHeight"],
									["outdent", "indent"],

									["table", "horizontalRule", "link", "image", "video"],
									// ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
									// ['imageGallery'], // You must add the "imageGalleryUrl".
									["fullScreen", "showBlocks", "codeView"],
									["preview", "print"],
									["removeFormat"],

									// ['save', 'template'],
									// '/', Line break
								], // Or Array of button list, eg. [['font', 'align'], ['image']]
								defaultTag: "div",
								minHeight: "300px",
								showPathLabel: false,
								font: sortedFontOptions,
							}}
						/>
					</Row>
					<Row>
						<Col>
							<label className="d-block form-label">Video Links</label>
							<Chips
								placeholder="Video Links"
								style={{ display: "block" }}
								value={videoLinks}
								onChange={e => setVideoLinks(e.value)}
							/>
						</Col>
						<Col>
							<label className="d-block form-label">Facilities</label>
							<MultiSelect
								value={facilities}
								style={{ width: "100%" }}
								onChange={e => setFacilities(e.value)}
								options={facilitiesOptions}
								placeholder="Facilities"
							/>
						</Col>
					</Row>
					<hr />
					<Row className="mt-3">
						<h4 style={{ color: "#0d6efd" }}>Admission Criteria</h4>
						<SunEditor
							plugin=""
							setContents={admissionCriteria}
							onChange={setAdmissionCriteria}
							setOptions={{
								buttonList: [
									["undo", "redo"],
									["font", "fontSize"],
									["paragraphStyle", "blockquote"],
									[
										"bold",
										"underline",
										"italic",
										"strike",
										"subscript",
										"superscript",
									],
									["fontColor", "hiliteColor"],
									["align", "list", "lineHeight"],
									["outdent", "indent"],

									["table", "horizontalRule", "link", "image", "video"],
									// ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
									// ['imageGallery'], // You must add the "imageGalleryUrl".
									["fullScreen", "showBlocks", "codeView"],
									["preview", "print"],
									["removeFormat"],

									// ['save', 'template'],
									// '/', Line break
								], // Or Array of button list, eg. [['font', 'align'], ['image']]
								defaultTag: "div",
								minHeight: "300px",
								showPathLabel: false,
								font: sortedFontOptions,
							}}
						/>
					</Row>
					<hr />
					<Row className="mt-3">
						<h4 style={{ color: "#0d6efd" }}>Fee Structure</h4>
						<Col>
							<label className="d-block form-label">First Year Fees</label>
							<InputText
								type="number"
								style={{ width: "100%" }}
								placeholder="First Year Fees"
								value={firstYearFees}
								onChange={e => setFirstYearFees(e.target.value)}
							/>
						</Col>
						<Col>
							<label className="d-block form-label">Total Package</label>
							<InputText
								type="number"
								style={{ width: "100%" }}
								placeholder="Total Package"
								value={totalPackage}
								onChange={e => setTotalPackage(e.target.value)}
							/>
						</Col>
						<Col>
							<label className="d-block form-label">
								Second to Sixth Year Fees
							</label>
							<InputText
								type="number"
								style={{ width: "100%" }}
								placeholder="Second to Sixth Year Fees"
								value={secondToSixthYearFees}
								onChange={e => setSecondToSixthYearFees(e.target.value)}
							/>
						</Col>
						<Col>
							<label className="d-block form-label">Currency</label>
							<Dropdown
								style={{ width: "100%" }}
								value={currency}
								onChange={e => setCurrency(e.value)}
								options={currencyOptions}
								placeholder="Currency"
							/>
						</Col>
					</Row>
					<Row>
						<SunEditor
							plugin=""
							setContents={feestructure}
							onChange={setFeeStructure}
							setOptions={{
								buttonList: [
									["undo", "redo"],
									["font", "fontSize"],
									["paragraphStyle", "blockquote"],
									[
										"bold",
										"underline",
										"italic",
										"strike",
										"subscript",
										"superscript",
									],
									["fontColor", "hiliteColor"],
									["align", "list", "lineHeight"],
									["outdent", "indent"],

									["table", "horizontalRule", "link", "image", "video"],
									// ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
									// ['imageGallery'], // You must add the "imageGalleryUrl".
									["fullScreen", "showBlocks", "codeView"],
									["preview", "print"],
									["removeFormat"],

									// ['save', 'template'],
									// '/', Line break
								], // Or Array of button list, eg. [['font', 'align'], ['image']]
								defaultTag: "div",
								minHeight: "300px",
								showPathLabel: false,
								font: sortedFontOptions,
							}}
						/>
					</Row>
					<hr />

					<Row className="mt-3">
						<h4 style={{ color: "#0d6efd" }}>Syllabus</h4>
						<div className="mt-2">
							<button
								className="me-2 btn btn-primary"
								type="button"
								onClick={() =>
									setsyllabus([...syllabus, { title: "", courses: "" }])
								}
							>
								Add Syllabus
							</button>
						</div>

						<form>
							{syllabus?.map((body, index) => {
								return (
									<Row key={index} className="mt-3">
										<Col>
											<InputText
												style={{ width: "100%" }}
												placeholder="Title"
												name="title"
												value={body?.title}
												onChange={e => handleSyllabusChange(e, index)}
											/>
										</Col>
										<Col>
											<Chips
												name="courses"
												placeholder="Courses"
												style={{ display: "block" }}
												value={body?.courses}
												onChange={e => handleSyllabusChange(e, index)}
											/>
										</Col>
										<Col>
											<button
												className="me-2 btn btn-danger"
												type="button"
												onClick={() => removeSyllabusFormData(index)}
											>
												Remove
											</button>
										</Col>
									</Row>
								);
							})}
						</form>
					</Row>
					<hr />
					<Row className="mt-3">
						<h4 style={{ color: "#0d6efd" }}>Images</h4>
						<div className="mt-2">
							<button
								className="me-2 btn btn-primary"
								type="button"
								onClick={() =>
									setImages([...images, { imgCaption: "", imgLink: "" }])
								}
							>
								Add Images
							</button>
						</div>

						<form>
							{images?.map((body, index) => {
								return (
									<Row key={index} className="mt-3">
										<Col>
											<InputText
												style={{ width: "100%" }}
												placeholder="Image Caption"
												name="imgCaption"
												value={body?.imgCaption}
												onChange={e => handleImageChange(e, index)}
											/>
										</Col>
										<Col>
											<InputText
												style={{ width: "100%" }}
												placeholder="Image Link"
												name="imgLink"
												value={body?.imgLink}
												onChange={e => handleImageChange(e, index)}
											/>
										</Col>
										<Col>
											<button
												className="me-2 btn btn-danger"
												type="button"
												onClick={() => removeImagesFormData(index)}
											>
												Remove
											</button>
										</Col>
									</Row>
								);
							})}
						</form>
					</Row>
					<Row>
						<Col>
							<label className="d-block form-label">Videos</label>
							<Chips
								placeholder="Add Video Links"
								style={{ display: "block" }}
								value={videos}
								onChange={e => setVideos(e.value)}
							/>
						</Col>
					</Row>

					<br />
					<Row className="d-flex flex-1 flex-grow-1 justify-content-center align-items-center">
						<button
							className="btn btn-primary align-self-center"
							type="button"
							onClick={() => saveDetails()}
							style={{ width: 150 }}
						>
							Save Details
						</button>
					</Row>
				</div>
			)}
		</>
	);
};

export default MbbsDetails;
