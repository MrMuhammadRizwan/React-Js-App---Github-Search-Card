import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './pages/about';
import Home from './pages/home';
import registerServiceWorker from './registerServiceWorker';
// import {browserHistory} from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';



// ReactDOM.render((
//    <Router history = {browserHistory}>
//       <Route path = "/" component = {App}>
//          <IndexRoute component = {app} />
//          <Route path = "/about" component = {About} />
//       </Route>
//    </Router>
	
// ), document.getElementById('root'))


ReactDOM.render(
<BrowserRouter>
    <div>
        <Route path="/" component={App} />
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
    </div>
</BrowserRouter>, 
document.getElementById('root'));
registerServiceWorker();



