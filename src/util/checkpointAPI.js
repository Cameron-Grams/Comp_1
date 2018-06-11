export async function securityCheckpointDelay( airports ){
    const newAirports = JSON.parse( JSON.stringify( airports ) );

    console.log( "In checkpoint delay" );

    const allAirports = Object.keys( airports );

    for ( let i = 0; i < airports.length; i++ ){
        let response = await fetch(`https://apps.tsa.dhs.gov/MyTSAWebService/GetConfirmedWaitTimes.ashx?ap=${ allAirports[ i ] }&output=json`,
            { headers: { 'Accept': 'application/json' } } );
        let results = await response.json();
        newAirports[ allAirports[ i ] ].checkInDelay = results.wait;
        newAirports[ allAirports[ i ] ].lengthDelay = howLongDelay( results.wait );
    }
}; 

function howLongDelay( lenghtWait ){ 
    let delaySignificance;
    if ( lenghtWait > 15 ){
        delaySignificance = securityDelay > 30 ? "css-longDelay": "css-middleDelay";
    } else {
        delaySignificance = "css-shortDelay"; 
    }
    return delaySignificance; 
};


