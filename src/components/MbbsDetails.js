import { Chips } from "primereact/chips";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Navbar from "./Navbar";

const MbbsDetails = () => {
	const [collegeName, setCollegeName] = useState("");
	const [cityName, setCityName] = useState("");
	const [countryName, setCountryName] = useState("");
	const [universityType, setUniversityType] = useState("");
	const [establishmentYear, setEstablishmentYear] = useState("");
	const [brochureLink, setBrochureLink] = useState("");
	const [backgroundImage, setBackgroundImage] = useState("");
	const [logoImage, setLogoImage] = useState("");
	const [about, setAbout] = useState("");
	const [courseDuration, setCourseDuration] = useState("");
	const [fees, setFees] = useState("");
	const [applicationStartDate, setApplicationStartDate] = useState("");
	const [intake, setIntake] = useState("");
	const [courseDurationFulltime, setCourseDurationFulltime] = useState("");
	const [courseDurationInternship, setCourseDurationInternship] = useState("");
	const [courseDurationOverall, setCourseDurationOverall] = useState("");
	const [applicationEndDate, setApplicationEndDate] = useState("");
	const [recognizedBy, setRecognizedBy] = useState([]);
	const [videoLinks, setVideoLinks] = useState([]);
	const [facilities, setFacilities] = useState([]);
	const [firstYearFees, setFirstYearFees] = useState("");
	const [totalPackage, setTotalPackage] = useState("");
	const [secondToSixthYearFees, setSecondToSixthYearFees] = useState("");
	const [currency, setCurrency] = useState("");

	return (
		<>
			<Navbar />
			<div className="p-5">
				<Row className="mb-3">
					<Col>
						<label className="form-label">College Name</label>
						<InputText
							className="form-control"
							placeholder="College Name"
							value={collegeName}
							onChange={e => setCollegeName(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">City</label>
						<InputText
							className="form-control"
							placeholder="City"
							value={cityName}
							onChange={e => setCityName(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">Country</label>
						<InputText
							className="form-control"
							placeholder="Country"
							value={countryName}
							onChange={e => setCountryName(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">University Type</label>
						<InputText
							className="form-control"
							placeholder="University Type"
							value={universityType}
							onChange={e => setUniversityType(e.target.value)}
						/>
					</Col>
				</Row>
				<Row className="mb-3">
					<Col>
						<label className="form-label">Establishment Year</label>
						<InputText
							className="form-control"
							placeholder="Establishment Year"
							value={establishmentYear}
							onChange={e => setEstablishmentYear(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">Brochure Link</label>
						<InputText
							className="form-control"
							placeholder="Brochure Link"
							value={brochureLink}
							onChange={e => setBrochureLink(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">Background Image</label>
						<InputText
							className="form-control"
							placeholder="Background Image"
							value={backgroundImage}
							onChange={e => setBackgroundImage(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">Logo Image</label>
						<InputText
							className="form-control"
							placeholder="Logo Image"
							value={logoImage}
							onChange={e => setLogoImage(e.target.value)}
						/>
					</Col>
				</Row>
				<Row className="mb-3">
					<Col>
						<label className="form-label">Course Duration</label>
						<InputText
							type="date"
							className="form-control"
							placeholder="Course Duration"
							value={courseDuration}
							onChange={e => setCourseDuration(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">Fees</label>
						<InputText
							className="form-control"
							placeholder="Fees"
							value={fees}
							onChange={e => setFees(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">Application Start Date</label>
						<InputText
							type="date"
							className="form-control"
							placeholder="Application Start Date"
							value={applicationStartDate}
							onChange={e => setApplicationStartDate(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">Intake</label>
						<InputText
							type="date"
							className="form-control"
							placeholder="Intake"
							value={intake}
							onChange={e => setIntake(e.target.value)}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<label className="form-label">About</label>
						<InputTextarea
							autoResize
							className="form-control"
							placeholder="About"
							value={about}
							onChange={e => setAbout(e.target.value)}
						/>
					</Col>
				</Row>

				<Row className="mt-3">
					<h5>Important Facts</h5>
					<Col>
						<label className="form-label">
							Course Duration Fulltime (months)
						</label>
						<InputText
							className="form-control"
							placeholder="Course Duration Fulltime (months)"
							value={courseDurationFulltime}
							onChange={e => setCourseDurationFulltime(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">
							Course Duration Internship (months)
						</label>
						<InputText
							className="form-control"
							placeholder="Course Duration Internship (months)"
							value={courseDurationInternship}
							onChange={e => setCourseDurationInternship(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">
							Course Duration Overall (months)
						</label>
						<InputText
							className="form-control"
							placeholder="Course Duration Overall (months)"
							value={courseDurationOverall}
							onChange={e => setCourseDurationOverall(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">Application End Date</label>
						<InputText
							type="date"
							className="form-control"
							placeholder="Application End Date"
							value={applicationEndDate}
							onChange={e => setApplicationEndDate(e.target.value)}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<label className="form-label">Recognized By</label>
						<Chips
							style={{ display: "block" }}
							value={recognizedBy}
							onChange={e => setRecognizedBy(e.value)}
						/>
					</Col>
				</Row>
				<Row className="mt-3">
					<h5>Overview</h5>
					{/* Add suneditor */}
				</Row>
				<Row>
					<Col>
						<label className="form-label">Video Links</label>
						<Chips
							style={{ display: "block" }}
							value={videoLinks}
							onChange={e => setVideoLinks(e.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">Facilities</label>
						<Chips
							style={{ display: "block" }}
							value={facilities}
							onChange={e => setFacilities(e.value)}
						/>
					</Col>
				</Row>
				<Row className="mt-3">
					<h5>Admission Criteria</h5>
					{/* Add suneditor */}
				</Row>
				<Row className="mt-3">
					<h5>Fee Structure</h5>
					<Col>
						<label className="form-label">First Year Fees</label>
						<InputNumber
							className="form-control"
							placeholder="First Year Fees"
							value={firstYearFees}
							onChange={e => setFirstYearFees(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">Total Package</label>
						<InputNumber
							className="form-control"
							placeholder="Total Package"
							value={totalPackage}
							onChange={e => setTotalPackage(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">Second to Sixth Year Fees</label>
						<InputNumber
							className="form-control"
							placeholder="Second to Sixth Year Fees"
							value={secondToSixthYearFees}
							onChange={e => setSecondToSixthYearFees(e.target.value)}
						/>
					</Col>
					<Col>
						<label className="form-label">Currrency</label>
						<InputNumber
							className="form-control"
							placeholder="Currrency"
							value={currency}
							onChange={e => setCurrency(e.target.value)}
						/>
					</Col>
				</Row>
				<Row>{/* Add suneditor */}</Row>
			</div>
		</>
	);
};

export default MbbsDetails;
