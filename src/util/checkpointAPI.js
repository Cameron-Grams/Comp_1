export async function securityCheckpointDelay( IATA ){
    const response = await fetch(`https://apps.tsa.dhs.gov/MyTSAWebService/GetConfirmedWaitTimes.ashx?ap=${ IATA }&output=json`,
        { headers: { 'Accept': 'application/json' } } );
    const results = await response.json();
    // this will depend on what values the TSA replies with for their delay estimates...
    // a notional value of 5 was set as a default to permit continued development of the function without a reply from the TSA
    if ( typeof results.wait === Number ){
        return results.wait;
    } else {
        return 5; 
    }
}; 

