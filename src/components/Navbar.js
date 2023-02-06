import { default as React } from "react";
import { MdHome, MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../actions/user";

function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-secondary bg-opacity-25">
			<div className="d-flex flex-1 flex-grow-1 justify-content-between align-items-center">
				<div className="ms-5">
					<button
						className="btn btn-link"
						onClick={() => navigate("/dashboard")}
					>
						<MdHome style={{ fontSize: "2rem", color: "black" }} />
					</button>
				</div>
				<div className="me-5">
					<button
						className="btn btn-link"
						onClick={() => dispatch(userLogout())}
					>
						<MdLogout style={{ height: 30, width: 30, color: "black" }} />
					</button>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
