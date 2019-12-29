/* eslint-disable camelcase */
import React, {Component} from 'react';
import Header from '../components/Header.js';
import './MainPage.scss';
import Footer from '../components/Footer.js';
import Dropdown from '../components/Dropdown.js';
import memoize from 'memoize-one';
import VehicleAvailibility from './VehicleAvailibility';
import TimeDisplay from './TimeDisplay';
import {connect} from 'react-redux';
import {setResults} from '../actions';
import PropTypes from 'prop-types';
import {findfalconeGetApi, findfalconePostApi} from '../api';
import {arrDiff} from '../constants/util';

const initialState = {
  planetMap: {},
  planets_names: ['', '', '', ''],
  vehicleMap: {},
  vehicles_names: ['', '', '', ''],
  time: 0
};

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onSelect = this.onSelect.bind(this);
    this.onVehicleSelect = this.onVehicleSelect.bind(this);
    this.handleFindFalcon = this.handleFindFalcon.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
    this.planetCallBack = this.planetCallBack.bind(this);
    this.vehicleCallback = this.vehicleCallback.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.saveResultToReduxStorage = this.saveResultToReduxStorage.bind(this);
  }

  handleReset() {
    this.setState({
      planets_names: ['', '', '', ''],
      vehicles_names: ['', '', '', ''],
      time: 0
    });
  }

  planetCallBack(data) {
    const planetMap = {};
    data.forEach(planet => {
      planetMap[planet.name] = planet;
    });
    this.setState({planetMap});
  }

  loadPlanets() {
    findfalconeGetApi('https://findfalcone.herokuapp.com/planets', this.planetCallBack);
  }

  vehicleCallback(data) {
    const vehicleMap = {};
    data.forEach(vehicle => {
      vehicleMap[vehicle.name] = vehicle;
    });
    this.setState({
      vehicleMap
    });
    this.calculateTime();
  }

  loadVehicles() {
    findfalconeGetApi('https://findfalcone.herokuapp.com/vehicles', this.vehicleCallback);
  }

  componentDidMount() {
    this.loadPlanets();
    this.loadVehicles();
  }

  componentWillMount() {
    if (Object.keys(this.state.planetMap).length === 0) {
      this.loadPlanets();
    }
    if (Object.keys(this.state.vehicleMap).length === 0) {
      this.loadVehicles();
    }
  }

  onSelect(id, name) {
    const planets_names = this.state.planets_names;
    planets_names[id - 1] = name;
    console.log(planets_names);
    this.setState({planets_names});
  }

  calculateTime() {
    const {vehicles_names, planets_names, planetMap, vehicleMap} = this.state;
    let time = 0;
    for (let i = 0; i < 4; i++) {
      const vehicle = vehicleMap[vehicles_names[i]];
      const planet = planetMap[planets_names[i]];
      if (vehicle && planet) {
        time += (planet.distance / vehicle.speed);
      }
    }
    this.setState({time});
  }

  onVehicleSelect(id, vehicleName) {
    const vehicles_names = this.state.vehicles_names;
    vehicles_names[id - 1] = vehicleName;
    this.setState({vehicles_names});
    this.calculateTime();
  }

  saveResultToReduxStorage({status, planet_name, error = ''}) {
    if (error) {
      if (error.includes('Token')) {
        findfalconePostApi('https://findfalcone.herokuapp.com/token', null, this.saveToken);
        this.handleFindFalcon();
      } else {
        // eslint-disable-next-line no-alert
        alert(error);
      }
    } else {
      this.props.setResults({
        time: this.state.time,
        planet: planet_name,
        status
      });
      this.props.router.push('/result');
    }
  }

  saveToken({token, url}) {
    localStorage.setItem(url, token);
  }

  handleFindFalcon() {
    const planet_names = this.state.planets_names;
    const vehicle_names = this.state.vehicles_names;
    const token = localStorage.getItem('https://findfalcone.herokuapp.com/token');
    if (token) {
      findfalconePostApi('https://findfalcone.herokuapp.com/find', {
        token,
        planet_names,
        vehicle_names
      }, this.saveResultToReduxStorage);
    } else {
      findfalconePostApi('https://findfalcone.herokuapp.com/token', null, this.saveToken);
      this.handleFindFalcon();
    }
  }

  getDropdowns(calculateArrayDifference, planets) {
    return [1, 2, 3, 4].map(i => (
      <div key={`dropdown${i}`} className="grid-item">
        <Dropdown
          id={i}
          data={calculateArrayDifference(planets, this.state.planets_names)}
          handleSelect={this.onSelect}
          name={this.state.planets_names[i - 1]}
          />
      </div>
    ));
  }

  getPlanetsAvailability() {
    return [1, 2, 3, 4].map(i => (
      <div key={`planetsAvailable${i}`} className="grid-item2">
        <VehicleAvailibility
          id={i}
          selectedVehicles={this.state.vehicles_names}
          vehicleMap={this.state.vehicleMap}
          handleVehicleSelect={this.onVehicleSelect}
          planetMap={this.state.planetMap}
          selectedPlanets={this.state.planets_names}
          />
      </div>
    ));
  }

  render() {
    const calculateArrayDifference = memoize(arrDiff);
    const planets = Object.keys(this.state.planetMap);
    return (
      <div>
        <Header onReset={this.handleReset}/>
        <div className="MainPage">
          <div>
            <h2>Select planet where you want to search in :</h2><br/>
            <div className="grid-container">
              {this.getDropdowns(calculateArrayDifference, planets)}
              {this.getPlanetsAvailability()}
            </div>
          </div>
          <div>
            <TimeDisplay
              time={this.state.time}
              />
          </div>
          <div>
            <button onClick={this.handleFindFalcon} className="find-button">Find Falcone!</button>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
MainPage.propTypes = {
  setResults: PropTypes.func,
  router: PropTypes.func
};
export default connect(null, {setResults})(MainPage);
