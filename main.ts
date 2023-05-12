const API_URL = "https://icanhazdadjoke.com/"
let responseApi: Joke;

interface Joke {
    id: string;
    joke: string;
    status: number;
}

function newJoke() {
    getJoke();
}

async function getJoke(): Promise<Joke> { //para coger los datos de una API
    const response = await fetch(API_URL, { // fetch conecta con la API (pasamos la url y headers para que me traiga la info en formato json)
        headers: {
            Accept: 'application/json',
        },
    });

    if (!response.ok) { // si la respuesta es fallida lanza un nuevo error con el estado
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    responseApi = await response.json()
    showJoke(); //llamada a la funcion que muestra el chiste
    return responseApi;
}

function showJoke() {

    if (responseApi) {
        const showJokeElement = document.getElementById("showJoke");

        if (showJokeElement) {
            showJokeElement.innerHTML = responseApi.joke;
        }
    }
}

