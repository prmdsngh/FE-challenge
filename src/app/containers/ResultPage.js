import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ResultPage extends Component {

  getResultText() {
    const {status, time, planet} = this.props;
    const successMessage = 'Success! Congratulations on finding Falcone. King Shan is mighty Pleased.';
    const failureMessage = 'Failure! Queen Falcone couldn\'t find be found and will come back.';
    const timeTakenMessage = `Time taken: ${time}`;
    const planetFound = planet ? `Planet found: ${planet}` : 'Planet Not Found';
    const message = status === 'success' ? successMessage : failureMessage;
    return (
      <div>
        <h1>{message}</h1>
        <br/>
        <h1>{timeTakenMessage}</h1>
        <h1>{planetFound}</h1>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Header/>
        <div className="MainPage">
          {this.getResultText()}
        </div>
        <Footer/>
      </div>
    );
  }
}
const mapStateToProps = ({Falcon: {status, time, planet}}) => ({
  status, time, planet
});

ResultPage.propTypes = {
  status: PropTypes.string,
  time: PropTypes.number,
  planet: PropTypes.string
};
export default connect(mapStateToProps, null)(ResultPage);
