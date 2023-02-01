import React, {Fragment, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop"
import ProfileAbout from "./ProfileAbout"
import ProfileExperience from "./ProfileExperience"
import ProfileEducation from "./ProfileEducation"
import ProfileGithub from "./ProfileGithub"

const Profile = ({ getProfileById, profile: {profile, loading}, auth}) => {
    const { id } = useParams();

    useEffect(() => {
        getProfileById(id);
    }, [getProfileById, id]);

    return (
        <section className="container">
            {profile === null ? <Spinner/> :
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>
                        Back To Profiles
                    </Link>
                    {auth.isAuthenticated &&
                    auth.loading === false &&
                    auth.user._id === profile.user._id && (
                        <Link to="/edit-profile" className="btn btn-dark">
                            Edit Profile
                        </Link>)
                    }
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience.length > 0 ? (<>
                                {profile.experience.map(experience => (
                                    <ProfileExperience key={experience._id}
                                    experience={experience} />
                                ))}
                            </>):(<h4>No experience credentials</h4>)}
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.education.length > 0 ? (<>
                                {profile.education.map(education => (
                                    <ProfileEducation key={education._id} education={education} />
                                ))}
                            </>):(<h4>No education credentials</h4>)}
                        </div>
                        {profile.githubusername && <ProfileGithub />}
                    </div>
                </Fragment>}
        </section>
    )
}


Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile);