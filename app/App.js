import fetch from 'node-fetch';
import { Chatbot } from "./lib/helpers.js";

const App = {};

const res = await fetch('http://localhost:3000/common');
let common = {}

if (res.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа
    common = await JSON.stringify(res.json());
} else {
    alert("Ошибка HTTP: " + res.status);
}

const reader = new Chatbot(common);

reader.reader();

// App.init = {

// }
