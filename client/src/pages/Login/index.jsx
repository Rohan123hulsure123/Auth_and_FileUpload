// import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button, Card, Container, Row, Col} from 'react-bootstrap';
function Login() {
	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};
	return (
		<Container fluid md={12} className={styles.container}>
			<Row>
				<Col md={4}></Col>
				<Col md={4} style={{marginTop:'8%'}}>
					<Card style={{height:'60vh'}} className="text-center">
						<Card.Title className={styles.card_title}>Login</Card.Title>
						<Card.Body>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							
							<Button as="button" variant="light" className={styles.google_btn} onClick={googleAuth}>
								<img src="./images/google.png" alt="google icon" className={styles.google_image}/>
								<span className={styles.google_btn_span}>Sign in with Google</span>
							</Button>
						</Card.Body>
					</Card>
				</Col>
				<footer className={styles.footer}>
					<p>Designed by Rohan Hulsure ❤ </p>	
				</footer>
			</Row>
		</Container>
	)
}

export default Login;
