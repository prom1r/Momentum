const greeting = document.querySelector('.greeting');
const currentHour = new Date().getHours();
const ru = document.querySelector('#ru');
const en = document.querySelector('#en');


/* DATA */
const time = document.querySelector('.time');
const date = document.querySelector('.date');



function getCurrentTime() {
    return new Date().toTimeString().replace(/ .*/, '');
}
const options = { month: 'long', day: 'numeric' };

let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

let daysRu = [
    'Воскресение',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
];


ru.addEventListener('click', () => {
    getQuotes();
    date.innerHTML = getCurrentDayRu(daysRu);
    greeting.innerHTML = getTimeOfDayRu(currentHour) + ',';
    nameUser.placeholder = "[Введите имя]";
    getWeather("Минск", "ru");
    num = 1
})
en.addEventListener('click', () => {
    getQuotes();
    date.innerHTML = getCurrentDay(days);
    greeting.innerHTML = 'Good ' + getTimeOfDay(currentHour) + ',';
    nameUser.placeholder = "[Enter name]";
    getWeather("Minsk", "en");
    num = 0
})


function getCurrentDay(arr) {
    const numberDay = new Date().getDay();
    return (arr[numberDay]) + ' , ' + new Date().toLocaleDateString('en-En', options);


};

function getCurrentDayRu(arr) {
    const numberDay = new Date().getDay();
    return (arr[numberDay]) + ' , ' + new Date().toLocaleDateString('ru-Ru', options);

};



setInterval(
    () => time.innerHTML = getCurrentTime(),
    date.innerHTML = getCurrentDay(days),
    greeting.innerHTML = 'Good ' + getTimeOfDay(currentHour) + ',',
    changeСity,
    1000
);

/* GREETINGS */

function getTimeOfDay(hour) {
    return (hour < 6) ? 'night' :
        (hour >= 6 && hour < 12) ? 'morning' :
        (hour >= 12 && hour < 18) ? 'afternoon' : 'evening';
}

function getTimeOfDayRu(hour) {
    return (hour < 6) ? 'Доброй ночи' :
        (hour >= 6 && hour < 12) ? 'Доброе утро' :
        (hour >= 12 && hour < 18) ? 'Добрый день' : 'Добрый вечер';
}

/* GREETINGS GETNAME */

const nameUser = document.querySelector('.name');

function saveName() {
    localStorage.setItem('name', nameUser.value);
}

function loadName() {
    if (localStorage.getItem('name')) {
        nameUser.value = localStorage.getItem('name');
    }
}
window.addEventListener('beforeunload', saveName);
window.addEventListener('load', loadName);

/* IMAGE BACKGROUND */

const body = document.body;

function getRandomNum() {
    return Math.floor((Math.random() * 20) + 1);
}

let randomNum = getRandomNum();

function setBg() {
    const img = new Image();
    let timeOfDay = getTimeOfDay(currentHour);
    let bgNum = randomNum.toString().padStart(2, 0);
    img.src = `https://raw.githubusercontent.com/prom1r/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    }

}

setBg();

/* SLIDER */
const prevSlideBtn = document.querySelector('.slide-prev');
const nextSlideBtn = document.querySelector('.slide-next');

function getSlideNext() {
    ++randomNum;
    setBg();
    if (randomNum == 20) {
        randomNum = 1
    }

}

function getSlidePrev() {
    --randomNum;
    setBg();
    if (randomNum == 1) {
        randomNum = 20
    }

}

nextSlideBtn.addEventListener('click', getSlideNext);
prevSlideBtn.addEventListener('click', getSlidePrev);

/* WEATHER */
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity')
let num = 0

let windSpeedText = () => {
    if (num == 0) {
        return 'Wind speed: '
    } else if (num == 1) {
        return 'Скорость ветра: '
    }
}


let humidityText = () => {
    if (num == 0) {
        return 'Humidity: '
    } else if (num == 1) {
        return 'Влажность: '
    }
}




async function getWeather(city, en) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${en}&APPID=c47f6132053e55705c81d6f9e9db6a7e&units=metric`;
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        windSpeed.textContent = windSpeedText() + Math.round(data.wind.speed) + ' m/s';
        humidity.textContent = humidityText() + data.main.humidity + '%';
        weatherError.textContent = '';
    } else {
        weatherError.textContent = 'Error HTTP: ' + res.status;
        temperature.textContent = 'City not found';
        weatherDescription.textContent = '';
        windSpeed.textContent = '';
        humidity.textContent = '';

    }

}

getWeather('Minsk');

const city = document.querySelector('.city');

function changeСity() {
    getWeather(city.value);
}

city.addEventListener('blur', changeСity);
city.addEventListener('change', changeСity);


function saveCity() {
    localStorage.setItem('namecity', city.value);
}

function loadCity() {
    if (localStorage.getItem('namecity')) {
        city.value = localStorage.getItem('namecity');
    }
}
window.addEventListener('beforeunload', saveCity);
window.addEventListener('load', loadCity);


/*  QUOTE OF THE DAY */
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');


function getRandomQuoteNum() {
    return Math.floor(Math.random() * 16);
}
let randomQuote = getRandomQuoteNum();



async function getQuotes() {
    if (en.checked) {
        const quotes = 'data.json';
        const res = await fetch(quotes);
        const data = await res.json();
        quote.innerHTML = data[randomQuote].text;
        author.innerHTML = data[randomQuote].author;

    } else if ((ru.checked)) {
        const quotes = 'data.json';
        const res = await fetch(quotes);
        const data = await res.json();
        quote.innerHTML = data[randomQuote].textru;
        author.innerHTML = data[randomQuote].authorru;

    }
}
getQuotes();


const changeQuote = document.querySelector('.change-quote')
changeQuote.addEventListener('click', function() {
    randomQuote = getRandomQuoteNum();
    getQuotes();
    changeQuote.classList.toggle('reverse')

})