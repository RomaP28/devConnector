import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";
import { connect } from "react-redux";

const Education = ({ education }) => {
    const educations = education.map(el => (
        <tr key={el._id}>
            <td>{el.school}</td>
            <td className="hide-sm">{el.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{el.from}</Moment> - {
                el.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{el.to}</Moment>)
            }
            </td>
            <td>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>School</th>
                    <th className="hide-sm">Degree</th>
                    <th className="hide-sm">Years</th>
                    <th />
                </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
}

export default Education;
