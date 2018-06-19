import React from 'react'; 
import Aux from '../util/Aux'; 

const TSAEstimate = ( props ) => {
    let estimateDisplay = props.dataLoaded ? 
        <p className={ this.props.severityOfWait } >TSA Estimated Time for Screening: { this.props.durrationOfWait } </p>
      : <p>Still retrieving data...</p> ; 
    
    return(
        <Aux>{ estimateDisplay }</Aux>
    );
};

export default TSAEstimate;
