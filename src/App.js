import "bootstrap/dist/css/bootstrap.min.css";
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import LoginPage from "./components/login/LoginPage";
import Mbbs from "./components/Mbbs";
import OtherCourses from "./components/OtherCourses";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<LoginPage />} exact />
				<Route path="/dashboard" element={<Home />} exact />
				<Route path="/mbbs" element={<Mbbs />} exact />
				<Route path="/othercourses" element={<OtherCourses />} exact />
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		</Router>
	);
};

export default App;
