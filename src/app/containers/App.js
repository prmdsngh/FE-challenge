import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';
import MainPage from './MainPage';
import ResultPage from './ResultPage';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <Route path="/" component={MainPage}/>
          <Route path="/result" component={ResultPage}/>
        </Router>
      </div>
    );
  }
}
