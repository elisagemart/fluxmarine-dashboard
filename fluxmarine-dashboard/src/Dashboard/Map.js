import React, { Component } from "react";
import { GoogleMap } from "react-google-maps";


//props: devices (list of all of user's devices) and currentDevice (user's currently selected device)
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
            />
        );
    }
}


export default Map;