import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Map from 'pigeon-maps'
import Marker from './Marker'

const provider = (x, y, z) => {
    const s = String.fromCharCode(97 + (x + y + z) % 3);
    return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
};

/**
 * Component for encapsulating pigeon-maps
 * Uses openstreetmaps to plot current status
 * of supplied US airports
 */
class MapUS extends Component {
    static propTypes = {
        airports: PropTypes.shape({
            coords: PropTypes.arrayOf(PropTypes.number),
            delay: PropTypes.bool,
            delays: PropTypes.array,
        }),
        viewportConfigs: PropTypes.shape({
            zoom: PropTypes.number,
            height: PropTypes.number,
            width: PropTypes.number,
        })
    }.required;

    state = {
        center: [38.6186, -95.8918],
        zoom: 4.7,
        zoomOnMouseWheel: true,
        statuses: {},
    };

    render() {
        const {center} = this.state;
        const airports = this.props.airports;
        const {zoom, height, width} = this.props.viewportConfigs;

        return (
            <div style={{textAlign: 'center', marginTop: 10}}>
                <Map defaultCenter={center}
                     zoom={zoom}
                     provider={provider}
                     animate={false}
                     zoomOnMouseWheel={false}
                     width={width}
                     height={height}
                     attribution={false}
                     mouseWheelMetaText={null}>
                    {Object.keys(airports).map(key => (
                            <Marker
                            key={key}
                            anchor={airports[key].coords}
                            delay={airports[key].delay}
                            onClick={this.props.handleClick}
                            airportCode={key}
                            airport={airports[key]}/>
                    ))}
                </Map>
            </div>
        )
    }
}

export default MapUS;