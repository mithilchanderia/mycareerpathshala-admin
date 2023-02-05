import { Chips } from 'primereact/chips';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import Navbar from './Navbar';
import { base_url } from '../actions/baseUrls';
import axios from 'axios';

const MbbsDetails = (props) => {
  const htmlWithTable = ``;
  const htmlWithTable2 = ``;
  const htmlWithTable3 = ``;
  const defaultFonts = [
    'Arial',
    'Comic Sans MS',
    'Courier New',
    'Impact',
    'Georgia',
    'Tahoma',
    'Trebuchet MS',
    'Verdana',
  ];
  const sortedFontOptions = [
    'Logical',
    'Salesforce Sans',
    'Garamond',
    'Sans-Serif',
    'Serif',
    'Times New Roman',
    'Helvetica',
    ...defaultFonts,
  ].sort();

  const [collegeName, setCollegeName] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [dbId, setDbId] = useState('');
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [universityType, setUniversityType] = useState('');
  const [establishmentYear, setEstablishmentYear] = useState('');
  const [brochureLink, setBrochureLink] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [logoImage, setLogoImage] = useState('');
  const [about, setAbout] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [fees, setFees] = useState('');
  const [applicationStartDate, setApplicationStartDate] = useState('');
  const [intake, setIntake] = useState('');
  const [courseDurationFulltime, setCourseDurationFulltime] = useState('');
  const [courseDurationInternship, setCourseDurationInternship] = useState('');
  const [courseDurationOverall, setCourseDurationOverall] = useState('');
  const [applicationEndDate, setApplicationEndDate] = useState('');
  const [recognizedBy, setRecognizedBy] = useState([]);
  const [videoLinks, setVideoLinks] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [firstYearFees, setFirstYearFees] = useState('');
  const [totalPackage, setTotalPackage] = useState('');
  const [secondToSixthYearFees, setSecondToSixthYearFees] = useState('');
  const [currency, setCurrency] = useState('');
  const [syllabus, setsyllabus] = useState([{ title: '', courses: [] }]);
  const [overview, setOverview] = useState(htmlWithTable);
  const [admissionCriteria, setAdmissionCriteria] = useState(htmlWithTable2);
  const [feestructure, setFeeStructure] = useState(htmlWithTable3);

  const [ranking, setRanking] = useState([{ rankingBody: '', rank: '' }]);

  useEffect(() => {
    let courseId = window.location.pathname.split('/').pop();
    axios
      .post(`${base_url}/get-mbbs-course-details`, { courseId: courseId })
      .then((res) => {
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
          setCourseDuration(data.courseDurationYears);
          setFees(data.fees);
          setAbout(data.about);
          setCourseDurationFulltime(
            data.importantFacts?.courseDurationFulltimeMonths
          );
          setCourseDurationInternship(
            data.importantFacts?.courseDurationInternshipMonths
          );
          setCourseDurationOverall(
            data.importantFacts?.courseDurationOverallMonths
          );
          setRecognizedBy(data.importantFacts?.recognisedBy);
          setFacilities(
            data.overview?.facilitiesAndAccomodation?.facilities?.map(
              (a) => a.label
            )
          );
          setOverview(data.overview?.benefits?.content);
          setVideoLinks(data.overview?.benefits?.videoLinks);
          setAdmissionCriteria(
            data.admissionCriteria?.academicRequirements +
              '<br/>' +
              data.admissionCriteria?.otherRequirements
          );
          setFirstYearFees(data.feeStructure?.firstYearFees);
          setSecondToSixthYearFees(
            data.feeStructure?.secondToSixthYearFeesYearly
          );
          setCurrency(data.feeStructure?.currency);
          setTotalPackage(data.feeStructure?.totalPackage);
          setRanking(
            Object.keys(data.importantFacts?.ranking).map((key) => ({
              rankingBody: key,
              rank: data.importantFacts?.ranking[key],
            }))
          );
          setsyllabus(data.syllabus);
		  setCollegeId(data.collegeId)
		  setDbId(data.dbId)

        }
      })
      .catch((err) => console.log(err));
  }, []);

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

  const removeFormData = (i) => {
    const newRanking = ranking.filter((f, index) => i !== index);
    setRanking([...newRanking]);
  };
  const removeSyllabusFormData = (i) => {
    const newSyllabus = syllabus.filter((f, index) => i !== index);
    setsyllabus([...newSyllabus]);
  };
  const saveDetails=()=>{
	let courseId = window.location.pathname.split('/').pop();

	  const data={
		collegeId: collegeId,
		courseId: courseId,
		dbId: dbId,
		city: cityName,
		country: countryName,
		universityType: universityType,
		establishmentYear: establishmentYear,
		brochureLink: brochureLink,
		backgroundImg: backgroundImage,
		logoImg: logoImage,
		about: about,
		courseDurationYears: courseDuration,
		firstYearFees: firstYearFees,
		intake: intake,
		importantFacts: {
			applicationStartDate: applicationStartDate,
			applicationEndDate: applicationEndDate,
			courseDurationFulltimeMonths: courseDurationFulltime,
			courseDurationInternshipMonths:courseDurationInternship,
			courseDurationOverallMonths: courseDurationOverall,
			recognizedBy:recognizedBy,
			ranking: ranking,
			overview: {
				content: overview,
				videoLinks: videoLinks,
				facilities: facilities
			},
			admissionCriteria: admissionCriteria,
			feesStructure: {
				firstYearFees: firstYearFees,
				totalPackage: totalPackage,
				secondToSixthYearFees: secondToSixthYearFees,
				currency: currency,
				content: feestructure
			},
			syllabus: syllabus
		}
	  }
	axios
	.post(`${base_url}/mbbs/save`, data)
	.then((res) => {
	  let data = res?.data;
	  if (data) {
		
	  }
	})
	.catch((err) => console.log(err));
  }
  return (
    <>
      <Navbar />
      <div className='p-5'>
        <Row className='mb-3'>
          <Col>
            <label className='form-label'>College Name</label>
            <InputText
              className='form-control'
              placeholder='College Name'
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>City</label>
            <InputText
              className='form-control'
              placeholder='City'
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>Country</label>
            <InputText
              className='form-control'
              placeholder='Country'
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>University Type</label>
            <InputText
              className='form-control'
              placeholder='University Type'
              value={universityType}
              onChange={(e) => setUniversityType(e.target.value)}
            />
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col>
            <label className='form-label'>Establishment Year</label>
            <InputText
              className='form-control'
              placeholder='Establishment Year'
              value={establishmentYear}
              onChange={(e) => setEstablishmentYear(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>Brochure Link</label>
            <InputText
              className='form-control'
              placeholder='Brochure Link'
              value={brochureLink}
              onChange={(e) => setBrochureLink(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>Background Image</label>
            <InputText
              className='form-control'
              placeholder='Background Image'
              value={backgroundImage}
              onChange={(e) => setBackgroundImage(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>Logo Image</label>
            <InputText
              className='form-control'
              placeholder='Logo Image'
              value={logoImage}
              onChange={(e) => setLogoImage(e.target.value)}
            />
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col>
            <label className='form-label'>Course Duration</label>
            <InputText
              type='date'
              className='form-control'
              placeholder='Course Duration'
              value={courseDuration}
              onChange={(e) => setCourseDuration(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>Fees</label>
            <InputText
              className='form-control'
              placeholder='Fees'
              value={fees}
              onChange={(e) => setFees(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>Application Start Date</label>
            <InputText
              type='date'
              className='form-control'
              placeholder='Application Start Date'
              value={applicationStartDate}
              onChange={(e) => setApplicationStartDate(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>Intake</label>
            <InputText
              type='date'
              className='form-control'
              placeholder='Intake'
              value={intake}
              onChange={(e) => setIntake(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label className='form-label'>About</label>
            <InputTextarea
              autoResize
              className='form-control'
              placeholder='About'
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </Col>
        </Row>
        <hr />
        <Row className='mt-3'>
          <h4 style={{ color: '#0d6efd' }}>Important Facts</h4>
          <Col>
            <label className='form-label'>
              Course Duration Fulltime (months)
            </label>
            <InputText
              className='form-control'
              placeholder='Course Duration Fulltime (months)'
              value={courseDurationFulltime}
              onChange={(e) => setCourseDurationFulltime(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>
              Course Duration Internship (months)
            </label>
            <InputText
              className='form-control'
              placeholder='Course Duration Internship (months)'
              value={courseDurationInternship}
              onChange={(e) => setCourseDurationInternship(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>
              Course Duration Overall (months)
            </label>
            <InputText
              className='form-control'
              placeholder='Course Duration Overall (months)'
              value={courseDurationOverall}
              onChange={(e) => setCourseDurationOverall(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>Application End Date</label>
            <InputText
              type='date'
              className='form-control'
              placeholder='Application End Date'
              value={applicationEndDate}
              onChange={(e) => setApplicationEndDate(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label className='form-label'>Recognized By</label>
            <Chips
              placeholder='Recognized by'
              style={{ display: 'block' }}
              value={recognizedBy}
              onChange={(e) => setRecognizedBy(e.value)}
            />
          </Col>
        </Row>
        <button
          className='me-2 btn btn-primary'
          type='button'
          onClick={() =>
            setRanking([...ranking, { rankingBody: '', rank: '' }])
          }
        >
          Add Rank
        </button>
        <form>
          {ranking?.map((body, index) => {
            return (
              <Row key={index} className='w-50'>
                <Col>
                  <InputText
                    className='form-control'
                    placeholder='Ranking Body'
                    name='rankingBody'
                    value={body?.rankingBody}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Col>
                <Col>
                  <InputText
                    className='form-control'
                    placeholder='Rank'
                    name='rank'
                    value={body?.rank}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Col>
                <Col>
                  <button
                    className='me-2 btn btn-danger'
                    type='button'
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
        <Row className='mt-3'>
          <h4 style={{ color: '#0d6efd' }}>Overview</h4>
          <SunEditor
            plugin=''
            setContents={overview}
            onChange={setOverview}
            setOptions={{
              buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize'],
                ['paragraphStyle', 'blockquote'],
                [
                  'bold',
                  'underline',
                  'italic',
                  'strike',
                  'subscript',
                  'superscript',
                ],
                ['fontColor', 'hiliteColor'],
                ['align', 'list', 'lineHeight'],
                ['outdent', 'indent'],

                ['table', 'horizontalRule', 'link', 'image', 'video'],
                // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                // ['imageGallery'], // You must add the "imageGalleryUrl".
                ['fullScreen', 'showBlocks', 'codeView'],
                ['preview', 'print'],
                ['removeFormat'],

                // ['save', 'template'],
                // '/', Line break
              ], // Or Array of button list, eg. [['font', 'align'], ['image']]
              defaultTag: 'div',
              minHeight: '300px',
              showPathLabel: false,
              font: sortedFontOptions,
            }}
          />
        </Row>
        <Row>
          <Col>
            <label className='form-label'>Video Links</label>
            <Chips
              placeholder='Video Links'
              style={{ display: 'block' }}
              value={videoLinks}
              onChange={(e) => setVideoLinks(e.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>Facilities</label>
            <Chips
              placeholder='Facilities'
              style={{ display: 'block' }}
              value={facilities}
              onChange={(e) => setFacilities(e.value)}
            />
          </Col>
        </Row>
        <hr />
        <Row className='mt-3'>
          <h4 style={{ color: '#0d6efd' }}>Admission Criteria</h4>
          <SunEditor
            plugin=''
            setContents={admissionCriteria}
            onChange={setAdmissionCriteria}
            setOptions={{
              buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize'],
                ['paragraphStyle', 'blockquote'],
                [
                  'bold',
                  'underline',
                  'italic',
                  'strike',
                  'subscript',
                  'superscript',
                ],
                ['fontColor', 'hiliteColor'],
                ['align', 'list', 'lineHeight'],
                ['outdent', 'indent'],

                ['table', 'horizontalRule', 'link', 'image', 'video'],
                // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                // ['imageGallery'], // You must add the "imageGalleryUrl".
                ['fullScreen', 'showBlocks', 'codeView'],
                ['preview', 'print'],
                ['removeFormat'],

                // ['save', 'template'],
                // '/', Line break
              ], // Or Array of button list, eg. [['font', 'align'], ['image']]
              defaultTag: 'div',
              minHeight: '300px',
              showPathLabel: false,
              font: sortedFontOptions,
            }}
          />
        </Row>
        <hr />
        <Row className='mt-3'>
          <h4 style={{ color: '#0d6efd' }}>Fee Structure</h4>
          <Col>
            <label className='form-label'>First Year Fees</label>
            <InputText
              type='number'
              className='form-control'
              placeholder='First Year Fees'
              value={firstYearFees}
              onChange={(e) => setFirstYearFees(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>Total Package</label>
            <InputText
              type='number'
              className='form-control'
              placeholder='Total Package'
              value={totalPackage}
              onChange={(e) => setTotalPackage(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>Second to Sixth Year Fees</label>
            <InputText
              type='number'
              className='form-control'
              placeholder='Second to Sixth Year Fees'
              value={secondToSixthYearFees}
              onChange={(e) => setSecondToSixthYearFees(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>Currrency</label>
            <InputText
              className='form-control'
              placeholder='Currrency'
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <SunEditor
            plugin=''
            setContents={feestructure}
            onChange={setFeeStructure}
            setOptions={{
              buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize'],
                ['paragraphStyle', 'blockquote'],
                [
                  'bold',
                  'underline',
                  'italic',
                  'strike',
                  'subscript',
                  'superscript',
                ],
                ['fontColor', 'hiliteColor'],
                ['align', 'list', 'lineHeight'],
                ['outdent', 'indent'],

                ['table', 'horizontalRule', 'link', 'image', 'video'],
                // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                // ['imageGallery'], // You must add the "imageGalleryUrl".
                ['fullScreen', 'showBlocks', 'codeView'],
                ['preview', 'print'],
                ['removeFormat'],

                // ['save', 'template'],
                // '/', Line break
              ], // Or Array of button list, eg. [['font', 'align'], ['image']]
              defaultTag: 'div',
              minHeight: '300px',
              showPathLabel: false,
              font: sortedFontOptions,
            }}
          />
        </Row>
        <hr />

        <Row>
          <h4 style={{ color: '#0d6efd' }}>Syllabus</h4>
          <div className='mt-3'>
            <button
              className='w-50 btn btn-primary'
              type='button'
              onClick={() =>
                setsyllabus([...syllabus, { title: '', courses: '' }])
              }
            >
              Add Syllabus
            </button>
          </div>

          <form>
            {syllabus?.map((body, index) => {
              return (
                <Row key={index} className='mt-3'>
                  <Col>
                    <InputText
                      className='form-control'
                      placeholder='Title'
                      name='title'
                      value={body?.title}
                      onChange={(e) => handleSyllabusChange(e, index)}
                    />
                  </Col>
                  <Col>
                    <Chips
                      name='courses'
                      placeholder='Courses'
                      style={{ display: 'block' }}
                      value={body?.courses}
                      onChange={(e) => handleSyllabusChange(e, index)}
                    />
                  </Col>
                  <Col>
                    <button
                      className='me-2 btn btn-danger'
                      type='button'
                      onClick={() => removeSyllabusFormData(index)}
                    >
                      Remove
                    </button>
                  </Col>
                </Row>
              );
            })}
          </form>
          {/* <Col>
            <label className='form-label'>Title</label>
            <InputText
              placeholder='Title'
              className='form-control'
              value={syllabusTitle}
              onChange={(e) => setsyllabusTitle(e.target.value)}
            />
          </Col>
          <Col>
            <label className='form-label'>Courses</label>
            <Chips
              placeholder='Courses'
              style={{ display: 'block' }}
              value={courses}
              onChange={(e) => setCourses(e.value)}
            />
          </Col> */}
        </Row>
        <br />
        <Row className='d-flex flex-1 flex-grow-1 justify-content-center align-items-center'>
          <button
            className='w-50 btn btn-primary align-self-center'
            type='button'
            onClick={() =>
              saveDetails()
            }
          >
            Save Details
          </button>
        </Row>
      </div>
    </>
  );
};

export default MbbsDetails;
