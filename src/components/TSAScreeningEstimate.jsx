import React from 'react'; 
import Aux from '../util/Aux'; 
import { securityCheckpointDelay } from '../util/checkpointAPI'; 
// import Waiting from './Loader/Loader'; 


class TSAEstimate extends React.Component{

    state = {
        isLoading: true,
        lengthOfWait: null,
        reportedWait: null
    };

    async componentDidMount(){
        // call the details for the airport
        let airportDetails = await securityCheckpointDelay( this.props.airportInitials );
        this.setState( {
            isLoading: false,
            lengthOfWait: airportDetails.lengthOfWait,
            reportedWait: airportDetails.reportedWait
        })
    }   

    componentWillUnmount(){
        this.setState( {
            isLoading: true,
            lengthOfWait: null,
            reportedWait: null
        })
    }

    render(){
       let estimateDisplay = <p className={ this.state.lengthOfWait } >TSA Estimated Time for Screening: { this.state.reportedWait } </p>;

        return(
            <Aux>{ estimateDisplay }</Aux>
        );
    };
};

export default TSAEstimate;


/*
         let estimateDisplay =  <Aux>{ this.state.isLoading && <Waiting /> }</Aux> || 
            <p className={ this.state.lengthOfWait } >TSA Estimated Time for Screening: { this.state.timeRequired } </p>;
       
 
*/