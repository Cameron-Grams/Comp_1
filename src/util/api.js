export async function getDelays() {
    const response = await fetch(`https://services.faa.gov/airport/delays`,
        {headers: {'Accept': 'application/json'}});
    return await response.json();
}

export const airports = {
    BOS: {name: 'Boston-Logan International', coords: [42.3656, -71.0096], delay: false, delays: []},
    LGA: {name: 'New York Laguardia International', coords: [40.7769, -73.8740], delay: false, delays: []},
    TEB: {name: 'Teterboro International', coords: [40.8583, -74.0615], delay: false, delays: []},
    EWR: {name: 'Newark International', coords: [42.3656, -74.1745], delay: false, delays: []},
    JFK: {name: 'New York John F Kennedy International', coords: [40.6413, -73.7781], delay: false, delays: []},
    PHL: {name: 'Philadelphia International', coords: [39.8744, -75.2424], delay: false, delays: []},
    PIT: {name: 'Pittsburgh International', coords: [40.4958, -80.2413], delay: false, delays: []},
    IAD: {name: 'Washington Dulles International', coords: [38.9531, -77.4565], delay: false, delays: []},
    BWI: {name: 'Baltimore-Washington International', coords: [39.1774, -76.6684], delay: false, delays: []},
    DCA: {name: 'Washington National Reagan International', coords: [38.8512, -77.0402], delay: false, delays: []},
    RDU: {name: 'Raliegh-Durham International', coords: [35.8801, -78.7880], delay: false, delays: []},
    CLT: {name: 'Charlotte/Douglas International', coords: [35.2144, -80.9473], delay: false, delays: []},
    ATL: {name: 'Hartsfield-Jackson International', coords: [33.6407, -84.4277], delay: false, delays: []},
    TPA: {name: 'Tampa International', coords: [27.9835, -82.5371], delay: false, delays: []},
    MCO: {name: 'Orlando International', coords: [28.4312, -81.3081], delay: false, delays: []},
    FLL: {name: 'Fort Lauderdale/Hollywood International', coords: [26.0742, -80.1506], delay: false, delays: []},
    MIA: {name: 'Miami International', coords: [25.7959, -80.2870], delay: false, delays: []},
    DTW: {name: 'Detroit Metropolitan Wayne County', coords: [42.2162, -83.3554], delay: false, delays: []},
    CLE: {name: 'Cleveland-Hopkins International', coords: [41.4058, -81.8539], delay: false, delays: []},
    MDW: {name: 'Chicago Midway', coords: [41.7868, -87.7522], delay: false, delays: []},
    ORD: {name: 'Chicago O\'Hare International', coords: [41.9742, -87.9073], delay: false, delays: []},
    IND: {name: 'Indianapolis International', coords: [39.7169, -86.2956], delay: false, delays: []},
    CVG: {name: 'Cincinnati/Northern Kentucky International', coords: [39.0533, -84.6630], delay: false, delays: []},
    BNA: {name: 'Nashville International', coords: [36.1263, -86.6774], delay: false, delays: []},
    MEM: {name: 'Memphis International', coords: [35.0421, -89.9792], delay: false, delays: []},
    STL: {name: 'St Louis Lambert-International', coords: [38.7503, -90.3755], delay: false, delays: []},
    MCI: {name: 'Kansas City International', coords: [39.2991, -94.7108], delay: false, delays: []},
    MSP: {name: 'Minneapolis-St. Paul International', coords: [44.8848, -93.2223], delay: false, delays: []},
    DFW: {name: 'Dallas/Fort Worth International', coords: [32.8998, -97.0403], delay: false, delays: []},
    IAH: {name: 'Houston George Bush Intercontinental', coords: [29.9902, -95.3368], delay: false, delays: []},
    DEN: {name: 'Denver International', coords: [39.8561, -104.6737], delay: false, delays: []},
    SLC: {name: 'Salt Lake City International', coords: [40.7899, -111.9791], delay: false, delays: []},
    PHX: {name: 'Phoenix Sky Harbor International', coords: [33.4373, -112.0078], delay: false, delays: []},
    LAS: {name: 'Las Vegas McCarran International', coords: [36.0840, -115.1537], delay: false, delays: []},
    SAN: {name: 'San Diego International Lindbergh Field', coords: [32.7338, -117.1933], delay: false, delays: []},
    LAX: {name: 'Los Angeles International', coords: [33.9416, -118.4085], delay: false, delays: []},
    SFO: {name: 'San Francisco International', coords: [37.6213, -122.3790], delay: false, delays: []},
    SJC: {name: 'San Jose International', coords: [37.3639, -121.9289], delay: false, delays: []},
    PDX: {name: 'Portland International', coords: [45.5898, -122.5951], delay: false, delays: []},
    SEA: {name: 'Seattle Tacoma International', coords: [47.4502, -122.3088], delay: false, delays: []},
};