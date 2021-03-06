import React, { Component } from "react";
import { Link } from "react-router-dom";
// import {GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
// import CurrentLocation from './CurrentLocation'
import Location from "./Location";
import axios from "axios";
import "./home.scss";


class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            location_zipcode: '',
            locations: [],
            // showingInfoWindow: false,
            // activeMarker: {},
            // selectedPlace: {}
        }
    }

    handleInput = e => {
        this.setState({
            location_zipcode: e.target.value
        })
    }

    onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  })

  onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};

    getAllLocations = () => {
        axios.get(`/api/locations?location_zipcode=${this.state.location_zipcode}`)
        .then(res => {
            this.setState({
                locations: res.data
            })
        }).catch(err => console.log(err))
    }

render() {
  return (
    <div className="home">
    
      <div className="home-search">
        <label className="home-label">
          Find A Safe Bathroom:
          <input
            placeholder="Enter Your Zip Code"
            maxLength="5"
            value={this.state.location_zipcode}
            onChange={this.handleInput}
          />
         
        </label>
        <button className="search-button" onClick={this.getAllLocations}>Search</button>

        <label className="home-label">
          Add Your Own Safe Bathroom:{"  "}
          <Link to="/form">
            <button
              className="form-link"
            ></button>
          </Link>
        </label>
      </div>
      
      <div className='display'>
      {this.state.locations.map((locations, i) => {
        return <Location key={i} locations={locations} />;
      })}
      </div>
    </div>
  );
};
}

export default Home;
