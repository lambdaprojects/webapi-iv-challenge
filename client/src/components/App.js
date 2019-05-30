import React from "react";

import "./App.css";
import { connect } from "react-redux";
import { getPosts } from "../actions";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(":: COMPONENT DID MOUNT ::");
    this.props.getPosts();
  }

  render() {
    return (
      <div className="App">
        <h1> List of blog posts!</h1>
        <div className="appList">
          {this.props.posts.map(post => (
            <div className="appCard" key={post.id}>
              <span className="title">Title:</span> {post.title}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(":: MAP STATE TO PROPS ::" + state.posts);
  return {
    posts: state.posts,
    error: state.error,
    fetchingPosts: state.fetchingPosts
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(App);
