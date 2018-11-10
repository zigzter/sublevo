import React, { Component } from 'react';

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }
    componentDidMount () {
        // Get comments
    }
    render () {
        return (
            <div className="Comments">
                <h3>Comments</h3>
                <form>
                    <div>
                        <label htmlFor="body">Add Comment:</label> <br />
                        <textarea name="body" id="body" cols="50" rows="5"></textarea>
                    </div>
                    <input type="submit" value="Add Comment" />
                </form>
            </div>
        )
    }
};
