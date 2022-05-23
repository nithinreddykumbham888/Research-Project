import React, { useEffect, useState } from "react";
import { getComments, addCommentToDatabase } from "./firebase"
import "./Comment.css"
class CommentBox extends React.Component {
    constructor() {
        super();

        this.state = {
            showComments: false,
            comments: []
        };
    }
    componentDidMount() {
        this._getCommentsServer().then((data) => {
            this.setState({ comments: data });

        })
    }

    render() {
        // const url = this.props.url;
        const comments = this._getComments();

        console.log("outside " + comments)

        let commentNodes;
        let buttonText = 'Show Comments';

        if (this.state.showComments) {
            buttonText = 'Hide Comments';
            commentNodes = <div className="comment-list">{comments}</div>;
        }

        return (
            <div className="comment-box">
                <h3>Comment Section for file</h3>
                <CommentForm addComment={this._addComment.bind(this)} />
                <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
                    {buttonText}
                </button>
                <h3>Comments</h3>
                <h4 className="comment-count">
                    {this._getCommentsTitle(comments.length)}
                </h4>
                {commentNodes}
            </div>
        );
    } // end render



    _addComment(date, body) {
        addCommentToDatabase(this.props.url, date, body)
        this._getCommentsServer().then((data) => {
            this.setState({ comments: data });

        })
    }

    _handleClick() {
        this.setState({
            showComments: !this.state.showComments
        });
    }

    async _getCommentsServer() {
        let comm = []
        await getComments(this.props.url).then((data) => {
            // console.log("in get in com" + data)
            comm = data;
        })
        // console.log("in get" + comm)
        // console.log("in get" + comm.length)
        return comm
    }
    _getComments() {
        return this.state.comments.map((comment) => {
            return (
                <Comment
                    date={comment.date}
                    body={comment.body}
                    key={comment.id} />
            );
        });
    }

    _getCommentsTitle(commentCount) {
        console.log(commentCount)
        if (commentCount === 0) {
            return 'No comments yet';
        } else if (commentCount === 1) {
            return "1 comment";
        } else {
            return `${commentCount} comments`;
        }
    }
} // end CommentBox component

class CommentForm extends React.Component {
    render() {
        return (
            <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
                <div className="comment-form-fields">
                    {/* <input placeholder="Date" required ref={(input) => this._author = input}></input><br /> */}
                    <textarea placeholder="Comment" rows="4" required ref={(textarea) => this._body = textarea}></textarea>
                </div>
                <div className="comment-form-actions">
                    <button type="submit">Post Comment</button>
                </div>
            </form>
        );
    } // end render

    _handleSubmit(event) {
        event.preventDefault();   // prevents page from reloading on submit
        // let author = ;
        let body = this._body;
        this.props.addComment(this.getCurrentDate(), body.value);
    }

    getCurrentDate(separator = '/') {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }
} // end CommentForm component

class Comment extends React.Component {
    render() {
        return (
            <div className="comment">
                <p className="comment-header">{this.props.date}</p>
                <p className="comment-body">- {this.props.body}</p>
            </div>
        );
    }
}

export default CommentBox;
