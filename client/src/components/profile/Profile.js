import React, {Fragment, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";

const Profile = ({ getProfileById, profile: {profile, loading}, auth}) => {
    const {id} = useParams();



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
                    auth.user._id === profile[0].user._id && (  //TODO profile [0] review
                        <Link to="/edit-profile" className="btn btn-dark">
                            Edit Profile
                        </Link>)
                    }
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

// export default Profile;
