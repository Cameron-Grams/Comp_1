export function securityCheckpointDelay( airports ){
    const newAirports = JSON.parse( JSON.stringify( airports ) );
    let results = {};
    const allAirports = Object.keys( airports );
    

    for ( let i = 0; i < allAirports.length; i++ ){
        results.wait = 5;
        let delayFromSecurityScreening = tsaSecurityCheckinDelay( allAirports[ i ] ); 
        let typeOfDelay = howLongDelay( delayFromSecurityScreening ); 

        Object.assign( newAirports[ allAirports[ i ] ], { "securityDelay": delayFromSecurityScreening, "lengthDelay": typeOfDelay })

    };

    return newAirports;
}; 


function tsaSecurityCheckinDelay( location ){


    return 10;
};





function howLongDelay( lenghtWait ){ 
    let delaySignificance;
    if ( lenghtWait > 15 ){
        delaySignificance = lenghtWait > 30 ? "css-longDelay": "css-middleDelay";
    } else {
        delaySignificance = "css-shortDelay"; 
    }
    return delaySignificance; 
};


        /*
        let response = await fetch(`https://apps.tsa.dhs.gov/MyTSAWebService/GetConfirmedWaitTimes.ashx?ap=${ allAirports[ i ] }&output=json`,
            { headers: { 'Accept': 'application/json' } } );
        let results = await response.json();
        */

