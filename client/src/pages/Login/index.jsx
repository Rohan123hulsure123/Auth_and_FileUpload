// import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Login() {
	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};
	return (
		<div className={styles.container}>
			<div className={styles.main_login_div}>
				<h1 className={styles.login_heading}>Login</h1>
				<button className={styles.google_btn} onClick={googleAuth}>
							<img src="./images/google.png" alt="google icon" />
							<span>Sign in with Google</span>
				</button>
			</div>
		</div>
	);
}

export default Login;
