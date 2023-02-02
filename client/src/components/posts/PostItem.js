import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem =({
    addLike, removeLike, deletePost, auth, showActions,
    post: { _id, text, name, user, likes, comments, date}}) =>
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    {/*<img*/}
                    {/*    className="round-img"*/}
                    {/*    src={avatar}*/}
                    {/*    alt=""*/}
                    {/*/>*/}
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></p>

                {showActions && <>
                    <button onClick={e => addLike(_id)} type="button" className="btn btn-light">
                        <img src='./img/thumbs-up-solid.svg' alt='user icon'/>{' '}
                        <span>{likes.length > 0 && (
                            <span>{likes.length}</span>
                        )}</span>
                    </button>
                    <button onClick={e => removeLike(_id)} type="button" className="btn btn-light">
                        <img src='./img/thumbs-down-solid.svg' alt='user icon'/>
                    </button>
                    <Link to={`/posts/${_id}`} className="btn btn-primary">
                        Discussion {' '} {comments.length > 0 && (
                        <span className='comment-count'>{comments.length}</span>
                    )}
                    </Link>
                    {!auth.loading && user === auth.user._id &&  (
                        <button onClick={e => deletePost(_id)} type="button" className="btn btn-danger">
                            <img src='./img/times-solid.svg' alt='delete icon'/>
                        </button>
                    )}
                </>}
            </div>
        </div>


PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)
