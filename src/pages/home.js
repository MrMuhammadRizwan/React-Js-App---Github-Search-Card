import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user:'',
      image: '',
      location: '',
      repos: '',
      followers: '',
      url: '',
      notFound: ''
    }
  };
  findUser=(user)=> {
    let url = `https://api.github.com/users/${user}`
    this.connectApi(url)
  };
  connectApi=(url)=> { 
    fetch(url)
      .then((response) => response.json() )
      .then((data) => {
        this.setState({
          user: data.login,
          image: data.avatar_url,
          location: data.location,
          repos: data.public_repos,
          followers: data.followers,
          url: data.html_url,
          notFound: data.message,
        })
      })
  };
  
  // if we need to load remote end point data than componentDiMount mthod is good
  componentDidMount=()=> {
    let url = `https://api.github.com/users/${this.state.user}`
    this.connectApi(url)
  };
  render() {
    return (
      <div className="container">
        <div className="serach-box"><Searchvalue findUser={this.findUser.bind(this)} /></div>
        <div className="display-data"><Showbox data={this.state} /></div>
      </div>
    )
  }
};

class Searchvalue extends Component {
  render() {
    return (
      <div className="container2">
        <form 
        className="searchbox" 
        onChange={this.handleClick.bind(this)}
        >
            <input
            ref="search"
            type="text" 
            className="input-search"
            placeholder="user..."/>
            
            <input
            type="submit"
            className="input-submit"
            value="Search User" />
        </form>
      </div>
    )
  };
  
  handleClick=(e)=>{
    e.preventDefault()
    //get form input value using refs
    let user = this.refs.search.value
    // and than call findUser mthod for serach user
    this.props.findUser(user)
  };
}


//show data or output component
class Showbox extends Component {
  render() {
    let data = this.props.data
    if (data.notFound === 'Not Found') {
      return (<h3>User Not Found.....</h3>)
    } else {
      return (
          <div className="user-image">
            <div className="left-c">
                <a href={data.url}>
                     <img src={data.image} />             
                </a>
            </div>
            <div className="right-c">
                <span className="user-name">User Name: </span>
                <h1 className="user-tittle">{data.user}</h1>
                <div className="user-info">
                    <p>Location: {data.location}</p>
                    <p>Number of public repos: {data.repos}</p>
                    <p>Number of followers: {data.followers}</p>
                </div>
            </div>
          <div className="raw-data"><h2>Raw Data</h2>
              {JSON.stringify(data)}</div>
        </div>
      )
    }
  }
}



export default Home;