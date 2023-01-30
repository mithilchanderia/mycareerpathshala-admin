import { useState } from "react";
import SunEditor from "suneditor-react";

import "suneditor/dist/css/suneditor.min.css";

function Toolbar() {
	const htmlWithTable2 = ``;

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
	const [value, setValue] = useState(htmlWithTable2);

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
	// console.log("value", value);
	return (
		<div className="App">
			<SunEditor
				plugin=""
				setContents={value}
				onChange={setValue}
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
			<hr />
			<div
				className="dangerhtmlbro"
				dangerouslySetInnerHTML={{ __html: value }}
			/>
		</div>
	);
}

export default Toolbar;
