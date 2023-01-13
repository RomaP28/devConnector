import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";


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
                            <Route path="/dashboard" element={<Dashboard  />} exact/>
                        </Route>
                    </Routes>
                </section>
            </Router>
        </Provider>
    )
};

export default App;
