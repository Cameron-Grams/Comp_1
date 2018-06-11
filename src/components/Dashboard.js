import React, {Component} from 'react'
import {Modal} from 'antd'
import { securityCheckpointDelay } from '../util/checkpointAPI'; 
import {airports, getDelays} from "../util/api"
import {getViewport} from "../util/getViewport"
import MapUS from "./MapUS"
import Search from './Search'
import Summary from "./Summary"

const DEFAULT_AIRPORTS = airports;

/**
 * Primary container component.
 * Interacts with the external API and passes props
 * down to be displayed
 */
class Dashboard extends Component {

    state = {
        showModal: false,
        details: null,
        summary: null,
        airports: airports,
        viewportConfigs: null,
        dataSource: []
    };

    async componentDidMount() {
        const airports = DEFAULT_AIRPORTS;
        const delays = await getDelays();
        delays.forEach(({IATA, delays}) => {
            if (airports[IATA]) {
                airports[IATA].delays = delays;
                airports[IATA].delay = true;
            }
        });

        const checkInStatusAirports = await securityCheckpointDelay( airports );


        const viewport = getViewport();
        const width = Math.min(viewport.width * .9, 1200);
        const height = Math.min(viewport.height * .8, 600);
        const zoom = viewport.width >= 600 ? 4.7 : (viewport.width / 600) * 4.7;
        const viewportConfigs = {height, width, zoom};
        this.setState({airports, viewportConfigs, summary: delays})
    }

    handleClick = (airportCode) => {
        this.setState({showModal: true, details: airportCode})
    };

    closeModal = () => {
        this.setState({showModal: false})
    };

    respond = () => {
        console.log( "In dash with summary: ", this.state.summary ); 
    }

    render() {
        const {airports, viewportConfigs, summary} = this.state;
        return (
            <div className={'App'}>
                <button onClick={ this.respond }>Respond</button> 
                <Search
                    dataSource={Object.keys(airports)}
                    handleSelect={this.handleClick}
                    enterButton
                />
                {summary !== null &&
                <Summary summary={summary}/>}

                {viewportConfigs !== null && <MapUS
                    airports={airports}
                    viewportConfigs={viewportConfigs}
                    handleClick={this.handleClick}
                />}


                {this.state.showModal
                    ? <Modal
                        visible={this.state.showModal}
                        title={`${airports[this.state.details].name}`}
                        onOk={this.closeModal}
                        onCancel={this.closeModal}
                    >
                        {airports[this.state.details].delay
                            ? airports[this.state.details].delays.map(({type, reason}, index) => {
                                return (
                                    <div key={index}>
                                        {type && <p>Type: {type}</p>}
                                        {reason && <p>Reason: {reason}</p>}
                                    </div>
                                )
                            })
                            : <p>No reported delays.</p>}
                    </Modal>
                    : null
                }
            </div>
        )
    }
}

export default Dashboard;