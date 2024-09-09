// index.js
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const { API_TOKEN} = process.env;

const bot = new TelegramBot(API_TOKEN, { polling: true });

app.use(cors());

// Додаємо маршрут для кореневого шляху
app.get('/', (req, res) => {
    res.send('Bot is running successfully!');
});

// Обробка команди /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const webAppUrl = 'https://tap-bot-front.vercel.app/'; // Замініть на URL вашого веб-додатку

    bot.sendMessage(chatId, `${msg.chat.username}! Ласкаво просимо до Tap Bucket! Натисніть на кнопку нижче, щоб запустити гру.`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Запустити гру', web_app: { url: webAppUrl } }]
            ]
        }
    });
});

app.listen(() => {
    console.log('Server is running');
});
