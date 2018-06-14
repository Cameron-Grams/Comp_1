import Header from "antd/lib/calendar/Header";
const xml = require( 'xml-parse' );


export  async function securityCheckpointDelay( airport ){
    const delayXML =  await getAirportDelayData( airport );
    const parsedAirport = xml.parse( delayXML ); 
    const waitTime = parsedAirport[ 1 ][ "childNodes" ][ 0 ][ "childNodes" ][ 1 ][ "innerXML" ];   
    const reportedWait = waitTime === "0" ? "No delays reported": `Approximately ${ waitTime } minute delay`;
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