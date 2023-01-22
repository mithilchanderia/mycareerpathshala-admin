import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { userLogin } from "../../actions/user";
import LoginForm from "./LoginForm";

const LoginPage = () => {
	const dispatch = useDispatch();

	// const user = useSelector(getUserDetails);

	const handleSubmit = formData => {
		dispatch(userLogin(formData));
	};

	// if (user?.isLoggedIn && user?.token) {
	// 	return <Navigate to="/dashboard" />;
	// }

	return (
		<div className="login-page-bg vh-100">
			<div
				className="d-flex justify-content-center align-items-center"
				style={{
					height: "60vh",
				}}
			>
				<Card>
					<div className="p-3">
						<img src="/images/mcp.png" alt="MCP" style={{ height: 50 }}></img>
						<LoginForm onSubmit={handleSubmit} />
					</div>
				</Card>
			</div>
		</div>
	);
};

export default LoginPage;
