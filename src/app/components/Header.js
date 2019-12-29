import React, {Component} from 'react';
import './Header.scss';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <ul className="rightNav rightNavList">
            <li onClick={this.props.onReset} className="reset">Reset</li>
            <li><Link to="/">GeekTrust Home</Link></li>
          </ul>
        </header>
        <h1>FINDING FALCON!</h1>
      </div>
    );
  }
}
Header.propTypes = {
  onReset: PropTypes.func
};
export default Header;
