var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API_URL = "https://icanhazdadjoke.com/";
var API_URL2 = "https://api.chucknorris.io/jokes/random";
var header = { headers: { Accept: "application/json" } };
var responseApi1;
var responseApiChuckNorris;
function newJoke() {
    return __awaiter(this, void 0, void 0, function () {
        var responseApi1, responseApiChuckNorris;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getJoke()];
                case 1:
                    responseApi1 = _a.sent();
                    return [4 /*yield*/, getJokeChuckNorris()];
                case 2:
                    responseApiChuckNorris = _a.sent();
                    randomJokes(responseApi1, responseApiChuckNorris);
                    return [2 /*return*/];
            }
        });
    });
}
function randomJokes(responseApi1, responseApiChuckNorris) {
    var number = Math.floor(Math.random() * 12);
    if (number <= 5) {
        showJoke(responseApi1, null);
    }
    else {
        showJoke(null, responseApiChuckNorris);
    }
}
function getJoke() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(API_URL, header)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) { // si la respuesta es fallida lanza un nuevo error con el estado
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseApi1 = _a.sent();
                    return [4 /*yield*/, responseApi1.joke];
                case 3:
                    results = _a.sent();
                    return [2 /*return*/, responseApi1];
            }
        });
    });
}
function getJokeChuckNorris() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(API_URL2, header)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) { // si la respuesta es fallida lanza un nuevo error con el estado
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseApiChuckNorris = _a.sent();
                    return [4 /*yield*/, responseApiChuckNorris.value];
                case 3:
                    results = _a.sent();
                    return [2 /*return*/, responseApiChuckNorris];
            }
        });
    });
}
function showJoke(responseApi1, responseApiChuckNorris) {
    var showJokeElement = document.getElementById("showJoke");
    var showButtonsScore = document.getElementById("scoreButtons");
    if (responseApi1) {
        if (showButtonsScore) {
            showButtonsScore === null || showButtonsScore === void 0 ? void 0 : showButtonsScore.classList.remove("notShow");
        }
        if (showJokeElement) {
            showJokeElement.innerHTML = responseApi1.joke;
        }
    }
    if (responseApiChuckNorris) {
        if (showButtonsScore) {
            showButtonsScore === null || showButtonsScore === void 0 ? void 0 : showButtonsScore.classList.remove("notShow");
        }
        if (showJokeElement) {
            showJokeElement.innerHTML = responseApiChuckNorris.value;
        }
    }
}
var reportJokes = [];
var results;
function scoreJoke(score) {
    reportJokes.push({
        joke: results,
        score: score,
        date: new Date().toISOString(),
    });
    // console.log(reportJokes);
}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        //llamada a OpenWeatherMap API para obtener el tiempo
        fetch("http://api.openweathermap.org/data/2.5/weather?lat=".concat(latitude, "&lon=").concat(longitude, "&appid=665f830363c93f4634ee3058d048bc8f\n        "))
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var weather = data.weather;
            var temperature = Math.round(data.main.temp);
            var celsiusTemperature = (temperature - 273.15).toFixed(0);
            var icon = (weather[0]).icon;
            var iconWeather = document.getElementById('iconWeather');
            iconWeather.src = "./svg/imagesWeather/".concat(icon, "@2x.png");
            document.getElementById("showWeather").innerHTML = " ".concat(celsiusTemperature, "\u00BAC");
        });
    });
}
