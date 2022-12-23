import styles from "./styles.module.css";
import axios from "axios";
function Test(userDetails) {
	const user = userDetails.user;
	async function testroute() {
		const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/test`, { withCredentials: true });
		console.log(data);
	}
	const logout = () => {
		window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Home</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/profile.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Profile</h2>
					<img
						src={user.picture}
						alt="profile"
						className={styles.profile_img}
					/>
					<input
						type="text"
						defaultValue={user.name}
						className={styles.input}
						placeholder="UserName"
					/>
					<input
						type="text"
						defaultValue={user.email}
						className={styles.input}
						placeholder="Email"
					/>
					<button className={styles.btn} onClick={logout}>
						Log Out
					</button>
					<button onClick={testroute}>
						test
					</button>
				</div>
			</div>
		</div>
	);
}

export default Test;
