import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class VehicleAvailibility extends Component {
  getVehicleData() {
    const {handleVehicleSelect, vehicleMap, id, selectedVehicles, planetMap, selectedPlanets} = this.props;
    console.log(selectedVehicles);
    return Object.values(vehicleMap).map((vehicle, i) => {
      const {available, count} = this.checkVehicleAvailabilityInfo(vehicle, selectedVehicles);
      const planet = planetMap[selectedPlanets[id - 1]];
      return (
        <div key={`vehicle${id}${i}`} style={{display: selectedPlanets[id - 1].length === 0 ? 'none' : 'block'}}>
          <input
            type="radio"
            name={`vehicle${id}`} value={vehicle.name}
            disabled={!available || (planet && vehicle.max_distance < planet.distance)}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => handleVehicleSelect(id, vehicle.name)}
            checked={vehicle.name === selectedVehicles[id - 1]}
            />
          &nbsp;{vehicle.name} ({vehicle.total_no - count})
        </div>
      );
    });
  }

  checkVehicleAvailabilityInfo(vehicle, selectedVehicles = []) {
    let count = 0;
    selectedVehicles.forEach(name => name === vehicle.name ? count++ : null);
    return {
      available: count < vehicle.total_no,
      count
    };
  }

  render() {
    return (
      <div>
        {this.getVehicleData()}
      </div>

    );
  }
}

VehicleAvailibility.propTypes = {
  vehicleMap: PropTypes.object,
  selectedVehicles: PropTypes.array,
  selectedPlanets: PropTypes.array,
  id: PropTypes.number,
  handleVehicleSelect: PropTypes.func,
  planetMap: PropTypes.object
};
