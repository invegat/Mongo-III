import React, { Component } from 'react';
import axios from 'axios';
import './Comment.css';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    console.log('Comment props.comment', props.comment)
    // console.log('Comment authorUserName', props.authorUserName) 
    this.state = {
      authorUserName: ''
    }   
  }
  componentDidMount() {
    this.getAuthorUserName()
  }
  getAuthorUserName = () => {
      // console.log('getAuthorUserName props.comment', this.props.comment.author)
      const id = this.props.comment.author
      // console.log('getAuthorUserName id', id);
      axios.get(`http://localhost:3030/user/${id}`)
        .then((data) => {
          console.log('getUser data.data', data.data.username)
          this.setState({authorUserName: data.data.username});
        })
        .catch((err) => {
          console.log('getUser failed', err );
        });
      
  }
  render() {
    const { text } = this.props.comment
    return (
      <div className='comment_contianer'>
        <span className="Author">{this.state.authorUserName}</span>      
        <textarea className="Comment">{text}</textarea>
      </div>
    )
  }
};