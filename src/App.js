import logo from './logo.svg';
import './App.css';
import Landing from './landing.js';
import Deck from './deck.js';

import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
	  <Switch>
	  <Route path='/deck/:id' component={Deck}/>
	  <Route path='/' component={Landing}/>
	  </Switch>
    </Router>
  );
}

export default App;

/*
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
*/

