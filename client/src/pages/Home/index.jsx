import styles from "./styles.module.css";
import axios from "axios";
import ProfileButton from "../../components/ProfileButton";
import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from "react";
import { useEffect } from "react";


function Home(userDetails) {
	const user = userDetails.user;
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [progress, setProgress] = useState();
	const [error, setError] = useState();
	const [allFiles, getAllFiles] = useState([]);


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
		  const { code } = error?.response?.data;
		  switch (code) {
			case "FILE_MISSING":
			  setError("Please select a file before uploading!");
			  break;
			case "LIMIT_FILE_SIZE":
			  setError("File size is too large. Please upload files below 1MB!");
			  break;
			case "INVALID_TYPE":
			  setError(
				"This file type is not supported! Only .png, .jpg and .jpeg files are allowed"
			  );
			  break;
  
			default:
			  setError("Sorry! Something went wrong. Please try again later");
			  break;
		  }
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
	useEffect(()=>{
		getAllFilesFromServer();
	},[])

	return (
		<div className={styles.container}>
			<div className={styles.main_Home_div}>
				<h1 className={styles.login_heading}>Home</h1>
				<button className={styles.logout_button} onClick={logout}>Logout</button>
				<ProfileButton user={user} style={{position: 'absolute', top:'9vh', left: '25vh' }}/>
				<form
					action= {`${process.env.REACT_APP_API_URL} + /upload_file`}
					method="post"
					encType="multipart/form-data"
					onSubmit={submitHandler}
					styles={{position:'absolute', top:'%'}}
				>
					<input 
						label="Select file"
						className={styles.input} 
						type={'file'}
						onChange={(e) => {
							setSelectedFiles(e.target.files);
						  }}/>
					<button className={styles.submit_button} type="submit" >
						Submit
					</button>
						{/* <p>*add aws s3.
							<br />
							*create a get route to get all uploaded files.
							<br />
							*work on responsive 
						</p> */}
					{error && <p style={{color:'red'}}>{error}</p>}
					{!error && progress && (
					<ProgressBar completed={progress} label={`${progress}%`} />
					)}
				</form>
				<h4>Uploaded files</h4>
				<ul>
					{allFiles.map((item, index) => {
						return <li key={index}><a href={process.env.REACT_APP_API_URL+'/getSingleFile/'+item.filename}>{item.originalname}</a> </li>
					})}
				</ul>	
				
				
			</div>
		</div>
	);
}

export default Home;
