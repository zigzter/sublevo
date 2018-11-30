import React from 'react';
import { Button, FormGroup, Input, FormText } from 'reactstrap';
import Comment from './Comment';

const Comments = (props) => {
    const { userPresent } = !!Object.keys(props.currentUser).length
    return (
        <div className="Comments">
            <h3>Comments</h3>
            {
                userPresent && <form onSubmit={props.addComment}>
                    <FormGroup>
                        <label htmlFor="body">Add Comment:</label> <br />
                        <Input type="textarea" name="body" />
                        <FormText>Be nice.</FormText>
                    </FormGroup>
                    <Button color='primary' outline>Add Comment</Button>
                </form>
            }
            {
                props.comments.map((comment) => <Comment deleteComment={props.deleteComment} key={comment.id} {...comment} />)
            }
        </div>
    )
};

export default Comments;
