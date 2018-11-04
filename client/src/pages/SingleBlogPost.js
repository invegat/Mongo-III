import React, { Component } from 'react';
import axios from 'axios';
import "./Login.css";
import Comment from './Comment';

export default class SingleBlogPost extends Component {
  constructor() {
    super();
    this.state = {
      // post: {
      //   title: 'This is a FAKE blog post title', 
      //   _id: '234lj23kjh', 
      //   author: 'Patrick Saves the Day',
      //   content: 'This is some FAKE content', 
      //   comments: [
      //     {text:'This is a FAKE comment', author: 'Stanley Yelnats'},
      //   ]},
      // comment: '',
    };
    this.handleCommentText = this.handleCommentText.bind(this);
    this.addComment = this.addComment.bind(this);
  }
  
  componentDidMount() {
    this.getBlogPost()
  }

  getBlogPost(){
    const { id } = this.props.match.params
    console.log(id);
    axios.get(`http://localhost:3030/posts/${id}`)
      .then((data) => {
        console.log('getBlockPost data.data', data.data)
        this.setState({post: data.data});
        axios.get(`http://localhost:3030/user/${data.data.author}`)
        .then((adata) => {
          console.log('getUser data.data', adata.data.username)
          this.setState({authorUserName: adata.data.username});
        })
        .catch((err) => {
          console.log('getUser failed', err );
        });
      })
      .catch((err) => {
        console.log('You are seeing this error because you have yet to implement the `post` to get single post', err );
      });
  }
  
  addComment(e) {
    e.preventDefault();
    const { comment } = this.state;
    const { id } = this.props.match.params    
    const newComment = {
      text: comment,
      author: localStorage.getItem('uuID'),
    };
    this.setState({comment: ''});
    axios.put(`http://localhost:3030/posts/${id}`, newComment)
      .then((data) => {
        setTimeout(() => {
          this.getBlogPost();
        }, 200);
      })
      .catch((err) => {
        console.log('Something went wront with your "UPDATE" method on `posts/:id`')
      })
  }
  
  handleCommentText(e) {
    this.setState({comment: e.target.value});
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {         
      this.addComment(e)
    }
  }
  render() {
    if (!this.state.post)
      return (<div></div>)
    const { title, comments, content } = this.state.post;
    return (
      <div>
        <span className='BigAuthor'>{this.state.authorUserName}</span>
        <span className='Title'>{title}</span>
        <br />
        <textarea>{content}</textarea>
        {comments.map((comment, ind) => {
          return <Comment comment={comment} key={ind}  />
        })}
        <p className='title'>
          Add comments
           <br/>Shift Enter to submit
        </p>
        <form onSubmit={this.addComment}>
          <textarea 
            onChange={this.handleCommentText}
            value={this.state.comment}
            placeholder="add comment"
            onKeyUp={this.handleKeyPress}
          />
          <br/>
          <button className="btn btn-default btn-sm" type="submit" onClick={this.addComment}>Submit Comment</button>
        </form>
      </div>
    );
  }
}

