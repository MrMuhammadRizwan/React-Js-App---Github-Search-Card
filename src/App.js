import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';





class App extends React.Component {
   render() {
      return (
         <div className="container">
           <h1>GitHub User Search API</h1>
            <p className="top-menu-container">
               <Link to="/home" className="top-menu">Home</Link>
               <Link to="/about" className="top-menu">About</Link>
            </p>

            <div>

            </div>

            {this.props.children}
         </div>
      )
   }
}



export default App;


