import React, { Component } from "react";
import { GoogleMap, Marker } from "react-google-maps";


//props: devices (list of all of user's devices) and currentDevice (user's currently selected device)
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log(this.props.devices);
        return (
            <GoogleMap
                defaultZoom={10}
                center={{ lat: this.props.currentDevice.coordinates[1], lng: this.props.currentDevice.coordinates[0] }}
            >
                {this.props.devices.map(device => (
                    <Marker
                        key={device.id}
                        position={{
                            lat: device.coordinates[1],
                            lng: device.coordinates[0]
                        }}
                        icon={{
                            scaledSize: new window.google.maps.Size(25, 25)
                        }}
                    />
                ))}
            </GoogleMap>
        );
    }
}


    export default Map;