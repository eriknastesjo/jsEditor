import React, { useState, useEffect } from 'react';
import { defaultProps } from 'react-quill';
import docModel from '../models/docModel';

import { AiOutlinePlusCircle, AiOutlineMinusSquare } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

export default function Comments(props) {

    const [comments, setComments] = useState(null);
    const [commentsArray, setCommentsArray] = useState([]);
    // const [newComments, setNewComments] = useState(null);
    // console.log(props.currentDoc.comments);


    function addComment() {

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

        const newElement = [{
            "user": props.currentUser,
            "commentNum": "",
            "comment": ""
        }];

        setCommentsArray([...commentArr, ...newElement]);



        // const newComment = <div className='comment'>
        //     <div className='comments-user-container'>
        //         <TiDeleteOutline size={20}
        //             className="comments-delete"
        //             onClick={() => {
        //                 console.log("clicked")
        //             }}
        //         />
        //         <p className='comment-user'>{props.currentUser}</p>
        //     </div>
        //     <div className='comment-fields'>
        //         <input type="text" name="name" className='comments-comment-num' placeholder="Line number" size="7" />
        //         <textarea type="text" name="name" placeholder="Comment" className='comments-comment' />
        //     </div>
        // </div>

        // if (newComments == null) {
        //     setNewComments(newComment);
        //     console.log("ADDDDDDDDD");
        // } else {
        //     setNewComments(...newComments, newComment);
        // }

        // console.log(newComment);

        // let element = document.createElement("div");
        // element.innerHTML = `
        //     <div className='comment'>
        //         <div className='comments-user-container'>
        //             <{TiDeleteOutline} size={20}
        //                 className="comments-delete"
        //                 onClick={() => {
        //                     console.log("clicked")
        //                 }}
        //             />
        //             <p className='comment-user'>${props.currentUser}</p>
        //         </div>
        //         <div className='comment-fields'>
        //             <input type="text" name="name" className='comments-comment-num' placeholder="Line number" size="7" />
        //             <textarea type="text" name="name" placeholder="Comment" className='comments-comment' />
        //         </div>
        //     </div>
        // `;
        // document.getElementById('all-comments').appendChild(element);
    }


    // useEffect(() => {
    //     setNewComments(
    //         newCommentsArray.map((comment, index) =>
    //             <div className='comment' key={index}>
    //                 <div className='comments-user-container'>
    //                     <TiDeleteOutline size={20}
    //                         className="comments-delete"
    //                         onClick={() => {
    //                             console.log("clicked")
    //                         }}
    //                     />
    //                     <p className='comment-user'>{comment.user}</p>
    //                 </div>
    //                 <div className='comment-fields'>
    //                     <input type="text" name="name" className='comments-comment-num' value={comment.commentNum} placeholder="Line number" size="7" />
    //                     <textarea type="text" name="name" value={comment.comment} placeholder="Comment" className='comments-comment' />
    //                 </div>
    //             </div>
    //         )
    //     );
    // }, [newCommentsArray]);


    useEffect(() => {
        console.log("commentsArray: pleaase");
        console.log(commentsArray);
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
                    {commentsArray.map((comment, index) =>

                        <div className='comment' key={index}>
                            <div className='comments-user-container'>
                                <TiDeleteOutline size={20}
                                    className="comments-delete"
                                    onClick={() => {
                                        console.log("clicked")
                                    }}
                                />
                                <p className='comment-user'>{comment.user}</p>
                            </div>
                            <div className='comment-fields'>
                                <input type="text" name="name" className='comments-comment-num' value={comment.commentNum} placeholder="Line number" size="7" onChange={change}/>
                                <textarea type="text" name="name" value={comment.comment} placeholder="Comment" className='comments-comment' onChange={change}/>
                            </div>
                        </div>

                    )}
                </div>
            </div>
        );
    }, [commentsArray])

    function change() {
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

        setCommentsArray(commentArr);
    }


    useEffect(() => {
        if (props.currentDoc.comments != null) {
            setCommentsArray(...props.currentDoc.comments);
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
                        {props.currentDoc.comments.map((comment, index) =>

                            <div className='comment' key={index}>
                                <div className='comments-user-container'>
                                    <TiDeleteOutline size={20}
                                        className="comments-delete"
                                        onClick={() => {
                                            console.log("clicked")
                                        }}
                                    />
                                    <p className='comment-user'>{comment.user}</p>
                                </div>
                                <div className='comment-fields'>
                                    <input type="text" name="name" className='comments-comment-num' value={comment.commentNum} placeholder="Line number" size="7" onChange={change}/>
                                    <textarea type="text" name="name" value={comment.comment} placeholder="Comment" className='comments-comment' onChange={change}/>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            );
        } else {
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
                        {/* {newComments} */}
                    </div>
                </div>
            );
        }
    }, [props.currentDoc]);




    return (
        <div>
            {comments}
        </div>
    )
}