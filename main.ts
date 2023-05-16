const API_URL = "https://icanhazdadjoke.com/"
const API_URL2 = "https://api.chucknorris.io/jokes/random";
const header = { headers: { Accept: "application/json" } };
let responseApi1: Joke;
let responseApiChuckNorris: JokeChuckNorris;

interface Joke {
    id: string;
    joke: string;
    status: number;
}
interface JokeChuckNorris {
    icon_url: string;
    id: string;
    url: string;
    value: string;
}

async function newJoke() {
    const responseApi1 = await getJoke();
    const responseApiChuckNorris = await getJokeChuckNorris();
    randomJokes(responseApi1, responseApiChuckNorris);
}

function randomJokes(responseApi1: Joke, responseApiChuckNorris: JokeChuckNorris) {

    let number = Math.floor(Math.random() * 12);
    if (number <= 5) {
        showJoke(responseApi1, null);
    }
    else {
        showJoke(null, responseApiChuckNorris);
    }
}

async function getJoke(): Promise<Joke> { //para coger los datos de una API
    const response = await fetch(API_URL, header);  // fetch conecta con la API (pasamos la url y headers para que me traiga la info en formato json)

    if (!response.ok) { // si la respuesta es fallida lanza un nuevo error con el estado
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    responseApi1 = await response.json();
    results = await responseApi1.joke;
    return responseApi1;
}

async function getJokeChuckNorris(): Promise<JokeChuckNorris> { //para coger los datos de la segunda API
    const response = await fetch(API_URL2, header);  // fetch conecta con la API (pasamos la url y headers para que me traiga la info en formato json)

    if (!response.ok) { // si la respuesta es fallida lanza un nuevo error con el estado
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    responseApiChuckNorris = await response.json();
    results = await responseApiChuckNorris.value;
    return responseApiChuckNorris;
}

function showJoke(responseApi1: Joke | null, responseApiChuckNorris: JokeChuckNorris | null) {
    const showJokeElement = document.getElementById("showJoke");
    const showButtonsScore = document.getElementById("scoreButtons");
    if (responseApi1) {
        if (showButtonsScore) {
            showButtonsScore?.classList.remove("notShow");
        }
        if (showJokeElement) {
            showJokeElement.innerHTML = responseApi1.joke;
        }
    }
    if (responseApiChuckNorris) {
        if (showButtonsScore) {
            showButtonsScore?.classList.remove("notShow");
        }
        if (showJokeElement) {
            showJokeElement.innerHTML = responseApiChuckNorris.value;
        }
    }
}

let reportJokes: Score[] = []
interface Score {
    joke: string,
    score: number,
    date: string,
}

let results: string;

function scoreJoke(score: number) {

    reportJokes.push({
        joke: results,
        score: score,
        date: new Date().toISOString(),
    });

    console.log(reportJokes);
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const latitude: number = position.coords.latitude;
        const longitude: number = position.coords.longitude;

        // Haciendo una solicitud a OpenWeatherMap API para obtener el tiempo
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=665f830363c93f4634ee3058d048bc8f
        `)
            .then((response) => response.json())
            .then((data) => {
                const weather = data.weather;
                const weatherDescription = weather[0].description;
                const temperature = Math.round(data.main.temp);
                const celsiusTemperature = (temperature - 273.15).toFixed(0);
                //   console.log(data);
                //   console.log(weatherDescription);
                //   console.log(temperature);

                document.getElementById("showWeather")!.innerHTML = `Today: ${weatherDescription} and ${celsiusTemperature}ºC`;
            });
    });
}
