import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TimeDisplay extends Component {
  render() {
    return (
      <h1>
        Time Taken : {this.props.time}
      </h1>
    );
  }
}

TimeDisplay.propTypes = {
  time: PropTypes.number
};
