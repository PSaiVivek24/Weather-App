const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = data => {

    const { cityDetails, weather } = data;

    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    if (card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

    // const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    // icon.setAttribute('src', iconSrc);

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    

    let timeSrc = null;
    if(weather.IsDayTime)
        timeSrc = 'img/day.svg';
    else
        timeSrc = 'img/night.svg';

    time.setAttribute('src', timeSrc);
};



const updateCity = async city => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return { cityDetails, weather };
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(Data => updateUI(Data))
        .catch(err => console.log(err));

    localStorage.setItem('city', city);

});

if(localStorage.getItem('city', city)){
    let city = localStorage.getItem('city', city);
    updateCity(city)
        .then(Data => updateUI(Data))
        .catch(err => console.log(err));
}