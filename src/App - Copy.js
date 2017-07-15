import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      username: '',
      realName: '',
      avatar: '',
      location: '',
      repos: '',
      followers: '',
      url: '',
      notFound: ''
    }
  }
  render() {
    return (
      <div>
        <SearchBox fetchUser={this.fetchUser.bind(this)}/>
        <Card data={this.state} />
      </div>
    )
  }
  
  // the api request function
  fetchApi(url) { 
    
    fetch(url)
      .then((res) => res.json() )
      .then((data) => {
        
        // update state with API data
        this.setState({
          username: data.login,
          realName: data.full_name,
          avatar: data.avatar_url,
          location: data.location,
          repos: data.public_repos,
          followers: data.followers,
          url: data.html_url,
          notFound: data.message
        })
      })
      .catch((error) => console.log('what wrong?', error) )
  }
  
  fetchUser(username) {
    let url = `https://api.github.com/users/${username}`
    this.fetchApi(url)
  }
  
  componentDidMount() {
    let url = `https://api.github.com/users/${this.state.username}`
    this.fetchApi(url)
  }
}

class SearchBox extends Component {
  render() {
    return (
      <form 
        className="searchbox" 
        onSubmit={this.handleClick.bind(this)}>
        <input
          ref="search"
          type="text" 
          placeholder="type username..."/>
        
        <input
          type="submit"
          value="Search GitHub User" />
      </form>
    )
  }
  
  handleClick(e) {
    e.preventDefault()
    let username = this.refs.search.value
    // sending the username value to parent component to fetch new data from API
    this.props.fetchUser(username)
    this.refs.search.value = ''
  }
}

class Card extends Component {
  render() {
    let data = this.props.data
    
    if (data.notFound === 'Not Found') {
      // when username is not found...
      return <h3>User not found</h3>
    } else {
      // if username found, then...
      return (
        <div>
          <a href={data.url}>
            <img src={data.avatar} />             
          </a>
          <h2>
            <a href={data.url}>{data.username}</a></h2>
          <dl>
            <dt>Real name</dt>
            <dd>{data.full_name}</dd>

            <dt>Location</dt>
            <dd>{data.location}</dd>

            <dt>Number of public repos</dt>
            <dd><a href={data.url}>{data.repos}</a></dd>

            <dt>Number of followers</dt>
            <dd>{data.followers}</dd>
          </dl>
        </div>
      )
    }
  }
}



export default App;
