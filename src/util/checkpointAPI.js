import Header from "antd/lib/calendar/Header";

export function securityCheckpointDelay( airport ){
    const delayObject =  getAirportDelayData( airport );
    return delayObject;
}; 

function getAirportDelayData( airport ){

    const proxyUrl = "https://ancient-basin-83521.herokuapp.com/";

    const endpoint = `https://apps.tsa.dhs.gov/MyTSAWebService/GetConfirmedWaitTimes.ashx?ap=${ airport }`;

    const header = new Header( { 
            'Access-Control-Allow-Origin':'GET',
            'Content-Type': 'text'
            } );
    
    const headerSpecs = {
        method: 'GET',
        mode: 'cors',
        header: header
    };
    
    const tryUrl = proxyUrl + endpoint; 


    return fetch( tryUrl, headerSpecs )
        .then( res => {
            return res.text() 
         } )
        .then( contents => console.log( contents ) )
        .catch( error => console.error('Error:', error ))
};


/*

function howLongDelay( lenghtWait ){ 
    let delaySignificance;
    if ( lenghtWait > 15 ){
        delaySignificance = lenghtWait > 30 ? "css-longDelay": "css-middleDelay";
    } else {
        delaySignificance = "css-shortDelay"; 
    }
    return delaySignificance; 
};
*/

        /*
        let response = await fetch(`https://apps.tsa.dhs.gov/MyTSAWebService/GetConfirmedWaitTimes.ashx?ap=${ allAirports[ i ] }&output=json`,
            { headers: { 'Accept': 'application/json' } } );
        let results = await response.json();
        */

//        Object.assign( newAirports[ allAirports[ i ] ], { "securityDelay": delayFromSecurityScreening, "lengthDelay": typeOfDelay })
