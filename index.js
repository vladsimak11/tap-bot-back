// index.js
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { API_TOKEN } = process.env;

const bot = new TelegramBot(API_TOKEN, { polling: true });
const app = express();
const PORT = 1111;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Маршрут для веб-додатку
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Обробка команди /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const webAppUrl = 'https://tap-bucket-bot.vercel.app/'; // Замініть на URL вашого веб-додатку

    bot.sendMessage(chatId, 'Ласкаво просимо до Tap Bucket! Натисніть на кнопку нижче, щоб запустити гру.', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Запустити гру', web_app: { url: webAppUrl } }]
            ]
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
