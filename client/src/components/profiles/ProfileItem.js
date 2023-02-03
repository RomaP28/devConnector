import React from 'react';
import { Link } from "react-router-dom";

const ProfileItem = ({ profile: {
    user: { _id, name },
    status,
    company,
    location,
    skills
} }) => {
    return (<div className="profile bg-light">
                <div>
                    <h2>{name}</h2>
                    <p>{status} {company && <span> at {company}</span>}</p>
                    <p className="my-1">{location && <span>{location}</span>}</p>
                    <Link to={`/profile/${_id}`} className='btn btn-primary'>
                        View Profile
                    </Link>
                </div>
                <ul>
                    {skills.slice(0, 4).map((skill, index)=> (
                        <li key={index} className='text-primary'>
                            <img src="/img/check-solid-blue.svg" alt="check" /> {skill}
                        </li>
                    ))}
                </ul>
           </div>);
}

export default ProfileItem;
