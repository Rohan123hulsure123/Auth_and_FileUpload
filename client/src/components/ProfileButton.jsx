// import styles from "./styles.module.css";

function ProfileButton(props) {
    // console.log(props);
    let user = props.user
    // console.log(user);
	return (
	    <div style={{...styles.main_div}}>
	    	<img
	    			src={user.picture}
	    			alt="profile"
	    			style={styles.profile_img}
	    		/>
	    	<div style={styles.user_info_div}>
	    		<h6 style={styles.user_info_text}>
	    			{user.name}
	    		</h6>
	    		<p  style={styles.user_info_text}>
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
        alignItems:'self-start',
    },
    user_info_div: {
        flexDirection: 'column',
        marginLeft: '1vw'
    },
    user_info_text: {
        margin:'0',
        padding:'0',
        color:'grey'
    },
    profile_img: {
            width: '3vw',
            height: '6vh',
            borderRadius: '50%',
            marginBottom: '10px'
    }
}

export default ProfileButton;
