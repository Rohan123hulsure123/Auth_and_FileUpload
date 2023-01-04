import styles from "./styles.module.css";
import axios from "axios";
import { Button, Card, Container, Row, Col, Form, ListGroup, Nav, Navbar, NavDropdown, Spinner } from 'react-bootstrap';
import ProfileButton from "../../components/ProfileButton";
import ProgressBar from "@ramonak/react-progress-bar";
import { useState, useEffect } from "react";



function ResponsiveHome(userDetails) {
	const user = userDetails.user;
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [progress, setProgress] = useState();
	const [error, setError] = useState();
	const [allFiles, getAllFiles] = useState([]);
	const [spinner, setSpinner] = useState(false);

	const submitHandler = (e) => {
	  e.preventDefault(); //prevent the form from submitting
	  let formData = new FormData();
  
	  formData.append("file", selectedFiles[0]);
	  if (selectedFiles.length !== 0) {
		setError("");
	  	axios
			.post(`${process.env.REACT_APP_API_URL}/upload_file`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			onUploadProgress: (data) => {
				//Set the progress value to show the progress bar
				setProgress(Math.round((100 * data.loaded) / data.total));
			},
			withCredentials: true
		})
		.then(response=>{
			if (response.data.status === 'success') {
				window.location.reload();
			}
		})
		.catch((error) => {
		  console.log(error);
		  setError("Sorry! Something went wrong. Please try again later");
		});
	  } else {
		setError("Please select a file before uploading!");
	  }	  
	  
	};

	const logout = () => {
		window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
	};

	const getAllFilesFromServer = async () => {
		getAllFiles([]);
		const url = `${process.env.REACT_APP_API_URL}/getfiles`;
		const data = await axios.get(url, { withCredentials: true }).catch(err=>console.log(err));
		getAllFiles(data.data);
		// console.log(data);
		// return data;
	}

	const handleSpinner = ()=>{
		setSpinner(true);
		setTimeout(() => setSpinner(false), 3000);
	}

	useEffect(()=>{
		getAllFilesFromServer();
	},[])

	return (
		<Container fluid md={12} className={styles.container}>
			<Row>
				<Col md={1}></Col>
				<Col md={10}>
				<Card style={{height:'80vh',marginTop:'10vh'}}>
					<Navbar bg="white" expand="lg">
						<Container>
							<Navbar.Brand href="#home"><h1 style={{textAlign:'center', color:'grey', fontWeight:'700'}}>Home</h1></Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="ms-auto ">
								<NavDropdown title="User profile" id="basic-nav-dropdown" drop='start' style={{fontSize:'1.2rem'}}>
								<NavDropdown.Item>
									<ProfileButton  user={user} className="navbar nav-dropdown"/>
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item style={{height:'40px', minHeight:'40px'}}>
									<Button as="button"  onClick={logout} className="float-end">
										Logout
									</Button>
								</NavDropdown.Item>
								</NavDropdown>
							</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
					<Card.Body>
						{/* <Row>
							<Col md={4} className="float-start"><ProfileButton  user={user}/></Col>
							<Col md={4}><h1 style={{textAlign:'center', color:'grey', fontWeight:'800'}}>Home</h1></Col>
							<Col md={4}>
								<Button as="button" variant="danger" onClick={logout} className="float-end">
									Logout
								</Button>
							</Col>
						</Row> */}
						<Row style={{marginTop:'2%'}}>
							<Col md={3}></Col>
							<Col md={6}>
								<Form
									action= {`${process.env.REACT_APP_API_URL} + /upload_file`}
									method="post"
									encType="multipart/form-data"
									onSubmit={submitHandler}
								>
									<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
										<Form.Label>Select File</Form.Label>
										<Row>
											<Col md={8}>
												<Form.Control 
													type="file" 
													rows={3} 
													onChange={(e) => {
														setSelectedFiles(e.target.files);
													}}/>
											</Col>
											<Col md={4}>
												<Button type="submit" variant="success" style={{textAlign:'center'}}>
													<Spinner animation="border" role="status" size="sm" className={spinner?"visually-true":"visually-hidden"}></Spinner>
													&nbsp;&nbsp;<span>Submit</span>	
												</Button>
												
											</Col>
										</Row>
									</Form.Group>
									{error && <p style={{color:'red'}}>{error}</p>}
									{!error && progress && (
										<ProgressBar completed={progress} label={`${progress}%`} />
									)}
								</Form>									
							</Col>
						</Row>
						<Row>
							<Col md={3}></Col>
							<Col md={6} style={{maxHeight:'400px',overflowY:'auto' }}>
								<h5 style={{color:'grey', fontWeight:'500'}}>Uploaded files</h5>
								<ListGroup>
									{
										allFiles.map((item, index) => {
											//For files uploaded on AWS S3
											return <ListGroup.Item key={index}><a href={process.env.REACT_APP_API_URL+'/retrive/'+item.filename} download onClick={handleSpinner}>{item.originalname}</a> </ListGroup.Item>
											//For files uploaded on web server
											// return <ListGroup.Item key={index}><a href={process.env.REACT_APP_API_URL+'/getSingleFile/'+item.filename} download>{item.originalname}</a> </ListGroup.Item>
										})
									}
								</ListGroup>
							</Col>
						</Row>
						
					</Card.Body>
				</Card>
				</Col>
				<Col md={1}></Col>
			</Row>
			<footer style={{textAlign:'center'}}>
				<p>Designed by Rohan Hulsure ❤ </p>	
			</footer>
		</Container>
	);
}

export default ResponsiveHome;
