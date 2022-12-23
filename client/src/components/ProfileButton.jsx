// import styles from "./styles.module.css";

function ProfileButton(props) {
    // console.log(props);
    let user = props.user
    // console.log(user);
	return (
	    <div style={{...styles.main_div, ...props.style}}>
	    	<img
	    			src={user.picture}
	    			alt="profile"
	    			style={styles.profile_img}
	    		/>
	    	<div style={styles.user_info_div}>
	    		<h3 style={styles.user_info_test}>
	    			{user.name}
	    		</h3>
	    		<p  style={styles.user_info_test}>
                    {user.email}
                </p>
	    	</div>
	    </div>
	);
}

const styles = {
    main_div: {
        display:'flex',
        flexDirection: 'row' ,
        alignItems:'self-start'
    },
    user_info_div: {
        marginTop:'2%',
        flexDirection: 'column',
        marginLeft: '1vw'
    },
    user_info_test: {
        margin:'0',
        padding:'0',
        color:'grey'
    },
    profile_img: {
            width: '4vw',
            height: '9vh',
            borderRadius: '50%',
            marginBottom: '10px'
    }
}

export default ProfileButton;
