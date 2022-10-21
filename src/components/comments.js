import React, { useState, useEffect } from 'react';
import { defaultProps } from 'react-quill';
import docModel from '../models/docModel';

import { AiOutlinePlusCircle, AiOutlineMinusSquare } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

export default function Comments(props) {

    const [comments, setComments] = useState(null);
    // const [commentsArray, setCommentsArray] = useState([]);


    function addComment() {
        const commentArr = scanPageForComments();
        const newElement = [{
            "user": props.currentUser,
            "commentNum": "",
            "comment": ""
        }];

        props.setCommentsArray([...commentArr, ...newElement]);
    }

    function deleteComment(index) {
        let arr = [...props.commentsArray];
        arr.splice(index, 1);
        props.setCommentsArray(arr);
    }


    function editedComment() {  // annars låter inte react en skriva i input
        const commentArr = scanPageForComments();
        props.setCommentsArray(commentArr);
    }

    function scanPageForComments() {

        const commentUsers = document.getElementsByClassName('comment-user');
        const commentNums = document.getElementsByClassName('comments-comment-num');
        const comment = document.getElementsByClassName('comments-comment');

        let commentArr = [];
        for (let i = 0; i < comment.length; i++) {
            commentArr[i] = {
                "user": commentUsers[i].innerHTML,
                "commentNum": commentNums[i].value,
                "comment": comment[i].value
            }
        }

        return commentArr;
    }


    useEffect(() => {
        setComments(
            <div>
                <h1 className='comments-title'>Comments</h1>
                <div className='comments-add-button'>
                    <p>Add</p>
                    <AiOutlinePlusCircle size={30}
                        className="comments-add"
                        onClick={addComment}
                    />
                </div>
                <div id='all-comments'>
                    {props.commentsArray.map((comment, index) =>

                        <div className='comment' key={index}>
                            <div className='comments-user-container'>
                                <TiDeleteOutline size={20}
                                    className="comments-delete"
                                    onClick={() => { deleteComment(index); }}
                                />
                                <p className='comment-user'>{comment.user}</p>
                            </div>
                            <div className='comment-fields'>
                                <input type="text" name="comment-num" className='comments-comment-num' value={comment.commentNum} placeholder="Line number" size="7" onChange={editedComment}/>
                                <textarea type="text" name="comment" value={comment.comment} placeholder="Comment" className='comments-comment' onChange={editedComment}/>
                            </div>
                        </div>

                    )}
                </div>
            </div>
        );
    }, [props.commentsArray])



    return (
        <div>
            {comments}
        </div>
    )
}