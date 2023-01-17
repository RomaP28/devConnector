// import React from 'react';
// import { Outlet, Navigate } from "react-router-dom";
// import PropTypes from 'prop-types';
// import { connect } from "react-redux";
//
// const PrivateRoute = ({ element: Component,
//                           auth: { isAuthenticated, loading },
//                           ...rest
// }) => (!isAuthenticated && !loading ?
//                 (<Navigate to={'/login'} />) :
//                 (<Outlet />) )
//
// PrivateRoute.propTypes = {
//     auth: PropTypes.object.isRequired,
// }
//
// const mapStateToProps = state => ({
//     auth: state.auth
// })
//
// export default connect(mapStateToProps)(PrivateRoute);



import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({
                          component: Component,
                          auth: { isAuthenticated, loading }
                      }) => {
    if (loading) return <Spinner />;
    if (isAuthenticated) return <Component />;

    return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
