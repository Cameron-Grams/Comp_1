import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Tabs} from 'antd'

const TabPane = Tabs.TabPane;

/**
 * Utility function for formatting delays
 * @param delay in the format of {delay:[delay], reason:[reason]
 * @param index
 */
function mapDelays(delay, index) {
    return (
        <Fragment key={index}>
            {delay.type && <p className={'delay'}>THIS Type: {delay.type}</p>}
            {delay.reason && <p className={'delay'}> THIS Reason: {delay.reason}</p>}
        </Fragment>
    )
}

/**
 * Component for displaying a quick "at-a-glance"
 * summary of current airports with delays
 */
export default class Summary extends Component {
    static propTypes = {
        summary: PropTypes.arrayOf(PropTypes.shape({
            IATA: PropTypes.string,
            name: PropTypes.string,
            delays: PropTypes.arrayOf(PropTypes.shape({
                reason: PropTypes.string,
                type: PropTypes.string,
            }))
        }))
    };

    render() {
        const {summary} = this.props;
        if (summary.length === 0) {
            return <p>There are no reported delays</p>
        }
        return (
            <Tabs defaultActiveKey={"1"}>
                {summary.map(({IATA, name, delays}, index) => (
                    <TabPane tab={IATA} key={index}>
                        {delays.map(mapDelays)}
                    </TabPane>
                    
                ))}
            </Tabs>
        )
    }
}