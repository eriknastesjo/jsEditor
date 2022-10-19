import React, { useState, useEffect } from 'react';
import { defaultProps } from 'react-quill';
import docModel from '../models/docModel';

import { AiOutlinePlusCircle, AiOutlineMinusSquare } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

export default function Comments(props) {

    const [comments, setComments] = useState(null);

    console.log("COMMENTS");
    // console.log(props.currentDoc.comments);

    console.log(props.currentUser);

    function addComment() {
        const newComment = <div className='comment'>
            <div className='comments-user-container'>
                <TiDeleteOutline size={20}
                    className="comments-delete"
                    onClick={() => {
                        console.log("clicked")
                    }}
                />
                <p className='comment-user'>{props.currentUser}</p>
            </div>
            <div className='comment-fields'>
                <input type="text" name="name" className='comments-comment-num' placeholder="Line number" size="7" />
                <textarea type="text" name="name" placeholder="Comment" className='comments-comment' />
            </div>
        </div>

        console.log(newComment);

        let element = document.createElement("div");
        element.innerHTML = `
            ${newComment}
        `;
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
        document.getElementById('all-comments').appendChild(element);
    }


    useEffect(() => {
        if (props.currentDoc.comments != null) {
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

                            // {
                            //     props.currentUser == comment.user ?

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
                                    <input type="text" name="name" className='comments-comment-num' value={comment.commentNum} placeholder="Line number" size="7" />
                                    <textarea type="text" name="name" value={comment.comment} placeholder="Comment" className='comments-comment' />
                                </div>
                            </div>

                            // :

                            //     <div className='comment' key={index}>
                            //         <div className='comments-user-container'>
                            //             <TiDeleteOutline size={20}
                            //                 className="comments-delete"
                            //                 onClick={() => {
                            //                     console.log("clicked")
                            //                 }}
                            //             />
                            //             <p className='comment-user'>{comment.user}</p>
                            //         </div>
                            //         <div className='comment-fields'>
                            //             <input type="text" name="name" className='comments-comment-num' value={comment.commentNum} placeholder="Line number" size="7" />
                            //             <textarea type="text" name="name" value={comment.comment} placeholder="Comment" className='comments-comment' />
                            //         </div>
                            //     </div>

                            // }
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
                        {/* Här läggs nya kommentarer till */}
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