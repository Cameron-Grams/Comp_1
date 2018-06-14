import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Aux from '../util/Aux'; 
import pin from '../img/pin.png'
import pinRetina from '../img/pin@2x.png'
import pinHover from '../img/pin-hover.png'
import pinHoverRetina from '../img/pin-hover@2x.png'
import delaysPin from '../img/delaysPin.png'
import delaysPinRetina from '../img/delaysPin@2x.png'
import delaysPinHover from '../img/delaysPin-hover.png'
import delaysPinHoverRetina from '../img/delaysPin-hover@2x.png'
import {Popover} from "antd";
import TSAScreeingEstimate from './TSAScreeningEstimate'; 


const imageOffset = {
    left: 15,
    top: 31
};

/**
 * Modified pigeon-maps Marker plugin from
 * https://github.com/mariusandra/pigeon-marker
 */
export default class Marker extends Component {
    static propTypes = {
        anchor: PropTypes.array,
        onClick: PropTypes.func,
        airportCode: PropTypes.string,
        airport: PropTypes.object,
        delay: PropTypes.bool,
        hover: PropTypes.bool,
    }.isRequired;

    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            images: {}
        }
    }

    // controls
    static isRetina() {
        return typeof window !== 'undefined' && window.devicePixelRatio >= 2
    }

    // modifiers
    isHover() {
        return typeof this.props.hover === 'boolean' ? this.props.hover : this.state.hover
    }

    image() {
        const {images} = this.state;
        return this.isHover()
            ? this.props.delay
                ? images['delayHover']
                : images['hover']
            : this.props.delay
                ? images['delay']
                : images['noHover']
    }

    componentDidMount() {
        let images = Marker.isRetina()
            ? [pinRetina, pinHoverRetina, delaysPinRetina, delaysPinHoverRetina]
            : [pin, pinHover, delaysPin, delaysPinHover];

        images.forEach(image => {
            let img = new window.Image();
            img.src = image
        });

        const imageChoices = Marker.isRetina()
            ? {
                noHover: pinRetina,
                hover: pinHoverRetina,
                delay: delaysPinRetina,
                delayHover: delaysPinHoverRetina
            }
            : {
                noHover: pin,
                hover: pinHover,
                delay: delaysPin,
                delayHover: delaysPinHover
            };
        this.setState({images: imageChoices})
    }

    handleClick = () => {
        this.props.onClick(this.props.airportCode)
    };

    handleMouseOver = () => {
        this.setState({hover: true})
    };

    handleMouseOut = () => {
        this.setState({hover: false})
    };

    render() {
        const {left, top, onClick, airport, airportCode} = this.props;
        const {name, delays, delay} = airport;

        const style = {
            position: 'absolute',
            transform: `translate(${left - imageOffset.left}px, ${top - imageOffset.top}px)`,
            cursor: onClick ? 'pointer' : 'default'
        };
        const content = !delay
            ? <Aux>
                <p>No reported delays</p>
                <TSAScreeingEstimate airportInitials={ airportCode } />
            </Aux>
            : (<div>
                {delays.map(({type, reason, avgDelay}, index) => {
                    return (
                        <div key={index} className={'popover-body'}>
                            {type && <p>{`Type: ${type}`}</p>}
                            {reason && <p>{`Reason: ${reason}`}</p>}
                            {avgDelay && <p>{`Average Delay: ${avgDelay}`}</p>}
                            <TSAScreeingEstimate airportInitials={ airportCode } />
                        </div>
                    )
                })}
            </div>);

        return (
            <div style={style}
                 className='pigeon-click-block'
                 onClick={this.handleClick}
                 onMouseOver={this.handleMouseOver}
                 onMouseOut={this.handleMouseOut}>
                <img src={this.image()} width={29} height={34} alt=''/>
                <Popover
                    key={airportCode + Math.random().toString()}
                    title={name}
                    visible={this.state.hover}
                    content={content}/>
            </div>
        )
    }
}
