/* eslint-disable react/jsx-no-bind */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';

export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.generateDropdownItems = this.generateDropdownItems.bind(this);
    this.setItem = this.setItem.bind(this);
  }

  setItem(item) {
    const {id, handleSelect} = this.props;
    handleSelect(id, item);
  }
  generateDropdownItems() {
    if (this.props.data.length === 0) {
      return (<div> Loading.... please wait!</div>);
    }
    return this.props.data.map((item, i) => {
      return (
        <div onClick={() => this.setItem(item)} key={i}>{item}</div>
      );
    });
  }
  render() {
    return (
      <div className="dropdown">
        <button className="dropbtn">{this.props.name.length === 0 ? `Enter destination ${this.props.id}` : this.props.name}</button>
        <div className="dropdown-content">
          {this.generateDropdownItems()}
        </div>
      </div>
    );
  }
}

DropDown.propTypes = {
  data: PropTypes.array,
  id: PropTypes.number,
  handleSelect: PropTypes.func,
  name: PropTypes.string
};
