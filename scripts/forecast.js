const key = 'LfqaPSs1G9RVIZPL244PM1gy4LBRnHyB';

const cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';

//Weather Information
const getWeather = async id => {

    const base = weatherURL;
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data  = await response.json();

    return data[0];
}

//City Information
const getCity = async city => {

    const base = cityURL;
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};


