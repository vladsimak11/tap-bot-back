// index.js
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { API_TOKEN, PORT } = process.env;

const bot = new TelegramBot(API_TOKEN, { polling: true });
const app = express();

app.use(cors());

// Обробка команди /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const webAppUrl = 'http://localhost:1111/'; // Замініть на URL вашого веб-додатку

    bot.sendMessage(chatId, `${msg.chat.username}! Ласкаво просимо до Tap Bucket! Натисніть на кнопку нижче, щоб запустити гру.`, {
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
