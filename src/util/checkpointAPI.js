import Header from "antd/lib/calendar/Header";
const xml = require( 'xml-parse' );

export async function produceAllScreeningDelays( airportsObject ){
    let allAirportsObject = JSON.parse( JSON.stringify( airportsObject ) );
    let airportInitials = Object.keys( airportsObject );

    //  https://scotch.io/tutorials/getting-started-with-asynchronous-iterators-and-generators

    // http://2ality.com/2016/10/asynchronous-iteration.html#for-await-of
// create the async iterable...

    const airportInitialsIterator = {
        [Symbol.asyncIterator]: () => {
        return {
            next: () => Promise.resolve( {
            done: airportInitials.length === 0,
            value: airportInitials.shift()
            } )
        }
        }
    };

    for await ( const i of airportInitialsIterator ){
        console.log( 'in checkpoint, with i as: ', i ); 
        let screeningData = securityCheckpointDelay( [ i ].value );
        let airportDetails = allAirportsObject[ i ];
        let updatedAirportInfomation = { ...airportDetails, ...screeningData };
        allAirportsObject[ i ] = updatedAirportInfomation;
        console.log( 'in checkpoint, with aiports object: ', allAirportsObject[ i ] );
    }
    console.log( 'in checkpoint, here is the total updated aiport collection: ', allAirportsObject ); 
    return allAirportsObject;
}


async function securityCheckpointDelay( airport ){
    const delayXML =  await getAirportDelayData( airport );
    const parsedAirport = xml.parse( delayXML ); 
    const waitTime = parsedAirport[ 1 ][ "childNodes" ][ 0 ][ "childNodes" ][ 1 ][ "innerXML" ];   
    const reportedWait = waitTime === "0" ? "No reported delays": `Approximately ${ waitTime } minute delay`;
    const lengthOfWait =   howLongDelay( waitTime );
    const checkPointImpact = {
        reportedWait: reportedWait,
        lengthOfWait: lengthOfWait
    };
    return checkPointImpact;
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
        .then( contents => contents )
        .catch( error => console.error('Error:', error ))
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