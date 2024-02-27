import React from 'react'
import "./userProfile.css";
import femaleImage from "./../images/girl1.jpg";
import maleImage from "./../images/blank-male.jfif";

const UserProfile = ({userData}) => {
  return (
    <div className='userprofile'>
      <p>{userData.userType == "Admin" && "Admin"}</p>
        <div className='userprofile_img'>

           {userData.gender == "female" ? (
            <img src={femaleImage} alt="Female Icon" />
           ) : (
            <img src={maleImage} alt="Male Icon" />
           )}
        </div>
        <div className='userprofile_info'>
            <h4>{userData.fname}{" "}{userData.lname}</h4>
            <p className='user_email'>{userData.email}</p>
            {/* <p>Gender: {userData.gender}</p> */}
            <button>
                Edit Profile
            </button>
            <div className='userprofile_line'>

            </div>
        </div>
    </div>
  )
}

export default UserProfile