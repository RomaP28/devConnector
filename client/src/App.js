import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import './App.css';





if(localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(()=> {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Landing />} />
                </Routes>
                <section className="container">
                     <Alert />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route element={<PrivateRoute />} >
                            <Route path="/dashboard" element={<Dashboard />} exact/>
                        </Route>
                        <Route element={<PrivateRoute />} >
                            <Route path="/create-profile" element={<CreateProfile />} exact/>
                        </Route>
                        <Route element={<PrivateRoute />} >
                            <Route path="/edit-profile" element={<EditProfile />} exact/>
                        </Route>
                        <Route element={<PrivateRoute />} >
                            <Route path="/add-experience" element={<AddExperience />} exact/>
                        </Route>
                        <Route element={<PrivateRoute />} >
                            <Route path="/add-education" element={<AddEducation />} exact/>
                        </Route>
                    </Routes>
                </section>
            </Router>
        </Provider>
    )
};

export default App;
